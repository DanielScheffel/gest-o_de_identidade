
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const sequelize = require('./config/database');
const User = require('./models/User');

const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');

const {
    gerarTokenCSRF
} = require('./middlewares/csrfMiddleware');

const app = express();

const PORT = process.env.PORT || 3000;

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares gerais
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

// Proteção CSRF
app.use(gerarTokenCSRF);

// Rotas
app.use(authRoutes);
app.use(pageRoutes);

// Inicialização do servidor
async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log('MySQL conectado com sucesso!');

        await sequelize.sync();

        console.log('Tabela de usuários sincronizada!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    }
}

iniciarServidor();
