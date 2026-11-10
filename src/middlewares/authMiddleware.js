
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Acesso não autorizado. Faça login.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Sua sessão expirou. Faça login novamente.');
        }

        return res.status(401).send('Token inválido. Faça login novamente.');
    }
}

module.exports = authMiddleware;
