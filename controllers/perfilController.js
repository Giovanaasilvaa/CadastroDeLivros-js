const db = require('../models/db');
const path = require('path');

exports.getPerfil = async (req, res) => {
  const id_usuario = req.session.id_usuario;

  if (!id_usuario) return res.redirect('/login');

  try {
    const [[usuario]] = await db.execute(
      "SELECT nome, email, foto FROM usuarios WHERE id = ?", 
      [id_usuario]
    );

    if (!usuario) return res.send("Usuário não encontrado.");

    const [[{ lidos }]] = await db.execute(
      "SELECT COUNT(*) AS lidos FROM cadastrodelivros WHERE id_usuario = ? AND status = 'lido'",
      [id_usuario]
    );

    res.render('perfil', {
      usuario,
      livros_lidos: lidos,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar perfil.");
  }
};

exports.atualizarFoto = async (req, res) => {
  const id_usuario = req.session.id_usuario;

  if (!req.file) return res.send("Nenhuma imagem enviada.");

  const caminho = `/img/${req.file.filename}`;

  try {
    await db.execute("UPDATE usuarios SET foto = ? WHERE id = ?", [caminho, id_usuario]);
    res.redirect('/perfil');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao salvar foto.");
  }
};
