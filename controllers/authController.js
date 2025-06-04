const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('login', { erro: null });
};

exports.postLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await db.execute("SELECT id, senha FROM usuarios WHERE email = ?", [email]);

    if (rows.length > 0) {
      const user = rows[0];
      const senhaCorreta = await bcrypt.compare(senha, user.senha);

      if (senhaCorreta) {
        req.session.id_usuario = user.id;
        return res.redirect('/cadastrar'); // depois criamos essa rota
      }
    }

    res.render('login', { erro: "E-mail ou senha inválidos." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getRegister = (req, res) => {
  res.render('cadastrarUsuario', { erro: null });
};

exports.postRegister = async (req, res) => {
  const { nome, email, senha, confirma_senha } = req.body;

  if (senha !== confirma_senha) {
    return res.render('cadastrarUsuario', { erro: 'As senhas não coincidem.' });
  }

  try {
    const [rows] = await db.execute("SELECT id FROM usuarios WHERE email = ?", [email.toLowerCase()]);

    if (rows.length > 0) {
      return res.render('cadastrarUsuario', { erro: 'Este e-mail já está cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await db.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email.toLowerCase(), senhaHash]
    );

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao cadastrar.");
  }
};
