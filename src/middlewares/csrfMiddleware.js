
const crypto = require('crypto');

function gerarTokenCSRF(req, res, next) {
    let csrfToken = req.cookies.csrfToken;

    if (!csrfToken) {
        csrfToken = crypto.randomBytes(32).toString('hex');

        res.cookie('csrfToken', csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
    }

    res.locals.csrfToken = csrfToken;

    next();
}

function validarTokenCSRF(req, res, next) {
    const cookieToken = req.cookies.csrfToken;
    const formToken = req.body._csrf;

    if (!cookieToken || !formToken || cookieToken !== formToken) {
        return res.status(403).send('Requisição inválida: token CSRF incorreto.');
    }

    next();
}

module.exports = {
    gerarTokenCSRF,
    validarTokenCSRF
};
