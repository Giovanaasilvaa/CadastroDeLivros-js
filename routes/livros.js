const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/img/');
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

router.get('/cadastrar', livrosController.listarLivros);
router.get('/criar', livrosController.formCriarLivro);
router.post('/criar', upload.single('capa'), livrosController.salvarLivro);

router.get('/editar/:id', livrosController.formEditarLivro);
router.post('/editar/:id', upload.single('capa'), livrosController.atualizarLivro);

router.get('/deletar/:id', livrosController.formDeletarLivro);
router.post('/deletar/:id', livrosController.deletarLivro);

router.post('/atualizar-rating', livrosController.atualizarRating);

module.exports = router;
