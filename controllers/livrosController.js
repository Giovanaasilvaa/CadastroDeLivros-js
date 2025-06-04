const db = require('../models/db');
const path = require('path');
const fs = require('fs');

// Listar livros
exports.listarLivros = async (req, res) => {
  if (!req.session.id_usuario) return res.redirect('/login');

  const id_usuario = req.session.id_usuario;

  const [livros] = await db.execute(`
    SELECT id, titulo, autor, descricao, status, capa, rating 
    FROM cadastrodelivros 
    WHERE id_usuario = ?`, [id_usuario]);

  // Apenas garante que capaPath será usado na view (assume que capa já tem o caminho certo)
  const livrosComCapa = livros.map(livro => ({
    ...livro,
    capaPath: livro.capa // ex: "img/arquivo.jpg"
  }));

  res.render('cadastrar', { livros: livrosComCapa });
};

// Form criar livro
exports.formCriarLivro = (req, res) => {
  if (!req.session.id_usuario) return res.redirect('/login');
  res.render('criarLivro');
};

// Salvar livro novo
exports.salvarLivro = async (req, res) => {
  const { titulo, autor, descricao, status } = req.body;
  const id_usuario = req.session.id_usuario;

  // Se enviar arquivo, cria o caminho para salvar
  const capa = req.file ? 'img/' + req.file.filename : null;

  await db.execute(`
    INSERT INTO cadastrodelivros 
    (id_usuario, titulo, autor, descricao, status, capa) 
    VALUES (?, ?, ?, ?, ?, ?)`, [
    id_usuario, titulo, autor, descricao, status || 'pendente', capa
  ]);

  res.redirect('/cadastrar');
};

// Atualizar livro
exports.atualizarLivro = async (req, res) => {
  if (!req.session.id_usuario) return res.redirect('/login');

  const id_livro = req.params.id;
  const id_usuario = req.session.id_usuario;
  const { titulo, autor, descricao } = req.body;

  const [rows] = await db.execute(
    'SELECT * FROM cadastrodelivros WHERE id = ? AND id_usuario = ?',
    [id_livro, id_usuario]
  );

  if (rows.length === 0) {
    return res.send('<p>Livro não encontrado.</p>');
  }

  let capa = rows[0].capa;

  if (req.file) {
    // Deletar capa antiga
    if (capa) {
      const caminhoAntigo = path.join(__dirname, '..', 'public', capa);
      fs.unlink(caminhoAntigo, err => {
        if (err) console.log('Erro ao deletar capa antiga:', err);
      });
    }
    capa = 'img/' + req.file.filename;
  }

  await db.execute(
    'UPDATE cadastrodelivros SET titulo = ?, autor = ?, descricao = ?, capa = ? WHERE id = ? AND id_usuario = ?',
    [titulo, autor, descricao, capa, id_livro, id_usuario]
  );

  res.redirect('/cadastrar');
};

// Atualizar rating do livro
exports.atualizarRating = async (req, res) => {
  if (!req.session.id_usuario) return res.redirect('/login');

  const { id_livro, rating } = req.body;
  const id_usuario = req.session.id_usuario;

  if (!id_livro || !rating) return res.redirect('/cadastrar');

  await db.execute(
    `UPDATE cadastrodelivros 
     SET rating = ? 
     WHERE id = ? AND id_usuario = ?`,
    [rating, id_livro, id_usuario]
  );

  res.redirect('/cadastrar');
};

// Deletar livro
exports.deletarLivro = async (req, res) => {
  if (!req.session.id_usuario) return res.redirect('/login');

  const id_livro = req.params.id;
  const id_usuario = req.session.id_usuario;

  const [rows] = await db.execute(
    'SELECT * FROM cadastrodelivros WHERE id = ? AND id_usuario = ?',
    [id_livro, id_usuario]
  );

  if (rows.length === 0) {
    return res.redirect('/cadastrar');
  }

  const capa = rows[0].capa;

  await db.execute(
    'DELETE FROM cadastrodelivros WHERE id = ? AND id_usuario = ?',
    [id_livro, id_usuario]
  );

  if (capa) {
    const caminhoCapa = path.join(__dirname, '..', 'public', capa);
    fs.unlink(caminhoCapa, err => {
      if (err) console.log('Erro ao deletar capa:', err);
    });
  }

  res.redirect('/cadastrar');
};

// Form Editar Livro
exports.formEditarLivro = async (req, res) => {
  if (!req.session.id_usuario) return res.redirect('/login');

  const id_livro = req.params.id;
  const id_usuario = req.session.id_usuario;

  const [rows] = await db.execute(
    'SELECT * FROM cadastrodelivros WHERE id = ? AND id_usuario = ?',
    [id_livro, id_usuario]
  );

  if (rows.length === 0) {
    return res.send('<p>Livro não encontrado.</p>');
  }

  const livro = rows[0];
  res.render('editarLivro', { livro });
};

// Form Deletar Livro
exports.formDeletarLivro = async (req, res) => {
  if (!req.session.id_usuario) return res.redirect('/login');

  const id_livro = req.params.id;
  const id_usuario = req.session.id_usuario;

  const [rows] = await db.execute(
    'SELECT * FROM cadastrodelivros WHERE id = ? AND id_usuario = ?',
    [id_livro, id_usuario]
  );

  if (rows.length === 0) {
    return res.redirect('/cadastrar');
  }

  const livro = rows[0];
  res.render('deletarLivro', { livro });
};