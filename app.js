require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const livrosRoutes = require('./routes/livros');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const perfilRoutes = require('./routes/perfilRoutes');



const app = express(); 

// Middleware para receber dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pasta pública para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Sessão
app.use(session({
  secret: 'segredo-seguro',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

// Variável global para views
app.use((req, res, next) => {
  res.locals.user = req.session.id_usuario || null;
  next();
});

// Configuração EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.use('/', authRoutes);
app.use('/', perfilRoutes);
app.use('/', livrosRoutes);
app.use('/', passwordResetRoutes); 

// 404
app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

