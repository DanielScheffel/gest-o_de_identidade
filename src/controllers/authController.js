const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Verifica se os campos foram preenchidos
        if (!name || !email || !password) {
            return res.status(400).send('Preencha todos os campos!');
        }

        // Remove espaços desnecessários
        name = name.trim();
        email = email.trim().toLowerCase();

        // Valida o tamanho do nome
        if (name.length < 3) {
            return res.status(400).send('O nome deve ter pelo menos 3 caracteres.');
        }

        // Valida o tamanho da senha
        if (password.length < 6) {
            return res.status(400).send('A senha deve ter pelo menos 6 caracteres.');
        }

        // Verifica se o e-mail já está cadastrado
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).send('E-mail já cadastrado!');
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário sem permitir escolher o próprio perfil
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.redirect('/login');

    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send('E-mail já cadastrado!');
        }

        res.status(500).send('Erro ao cadastrar usuário.');
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).send('E-mail ou senha incorretos!');
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log('E-mail encontrado:', !!user);  
        console.log('Senha corresponde:', passwordMatch);

        if (!passwordMatch) {
            return res.status(401).send('E-mail ou senha incorretos!');
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });

        res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao realizar login.');
    }
};