const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');
const multer = require('multer');

// Configurar destino e nome do arquivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/img'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `perfil_${req.session.id_usuario}.${ext}`);
  }
});

const upload = multer({ storage });

// Rotas
router.get('/perfil', perfilController.getPerfil);
router.post('/perfil/atualizar-foto', upload.single('nova_foto'), perfilController.atualizarFoto);

module.exports = router;
