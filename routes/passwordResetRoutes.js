const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

router.get('/esqueci-senha', passwordResetController.getEsqueciSenha);
router.post('/esqueci-senha', passwordResetController.postEsqueciSenha);

router.get('/redefinir-senha/:token', passwordResetController.getRedefinirSenha);
router.post('/redefinir-senha', passwordResetController.postRedefinirSenha);

module.exports = router;
