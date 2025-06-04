const db = require('../models/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.getEsqueciSenha = (req, res) => {
  res.render('esqueciSenha', { erro: null, sucesso: null });
};

exports.postEsqueciSenha = async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.render('esqueciSenha', { erro: 'E-mail não encontrado.', sucesso: null });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const validade = Date.now() + 3600000; // 1 hora em ms

    // Inserir token na tabela redefinicao_senhas
    await db.execute(
      "INSERT INTO redefinicao_senhas (email, token, expira_em) VALUES (?, ?, ?)",
      [email, token, validade]
    );

    const link = `http://localhost:3000/redefinir-senha/${token}`;

 const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

    await transporter.sendMail({
      to: email,
      subject: 'Redefinição de senha',
      html: `
        <p>Você solicitou a redefinição de senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${link}">${link}</a>
        <p>Esse link expira em 1 hora.</p>
      `
    });

    res.render('esqueciSenha', { erro: null, sucesso: "E-mail enviado com instruções para redefinição de senha." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao enviar e-mail.");
  }
};

exports.getRedefinirSenha = async (req, res) => {
  const { token } = req.params;

  const [rows] = await db.execute(
    "SELECT * FROM redefinicao_senhas WHERE token = ? AND expira_em > ?",
    [token, Date.now()]
  );

  if (rows.length === 0) {
    return res.send("Token inválido ou expirado.");
  }

  res.render('redefinirSenha', { token, erro: null });
};

exports.postRedefinirSenha = async (req, res) => {
  const { token, senha, confirma_senha } = req.body;

  if (senha !== confirma_senha) {
    return res.render('redefinirSenha', { token, erro: 'As senhas não coincidem.' });
  }

  try {
    const [rows] = await db.execute(
      "SELECT * FROM redefinicao_senhas WHERE token = ? AND expira_em > ?",
      [token, Date.now()]
    );

    if (rows.length === 0) {
      return res.send("Token inválido ou expirado.");
    }

    const email = rows[0].email;
    const senhaHash = await bcrypt.hash(senha, 10);

    await db.execute(
      "UPDATE usuarios SET senha = ? WHERE email = ?",
      [senhaHash, email]
    );

    // Remove o token após uso
    await db.execute(
      "DELETE FROM redefinicao_senhas WHERE token = ?",
      [token]
    );

    res.send("Senha redefinida com sucesso. Você já pode fazer login.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao redefinir a senha.");
  }
};
