const express = require('express');
const router = express.Router();

const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const {
    validarTokenCSRF
} = require('../middlewares/csrfMiddleware');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/dashboard', authMiddleware, async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (!user) {
        return res.redirect('/login');
    }

    res.render('dashboard', { user });
});

router.get('/admin', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role']
    });

    res.render('admin', { users });
});

router.post('/logout', validarTokenCSRF, (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });

    res.redirect('/login');
});

module.exports = router;