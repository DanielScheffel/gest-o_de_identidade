const express = require('express');
const router = express.Router();

const {
    validarTokenCSRF
} = require('../middlewares/csrfMiddleware');

const authController = require('../controllers/authController');

router.post('/register', validarTokenCSRF, authController.register);
router.post('/login', validarTokenCSRF, authController.login);

module.exports = router;