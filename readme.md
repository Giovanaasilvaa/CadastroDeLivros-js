
<h1 align="center">📚 CADASTRODELIVROS-JS</h1>

<p align="center"><em>Capacite sua biblioteca, simplifique o gerenciamento de livros sem esforço</em></p>

<p align="center">
  <img src="https://img.shields.io/badge/last%20commit-june-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/javascript-38.9%25-yellow?style=flat-square" />
  <img src="https://img.shields.io/badge/languages-3-blue?style=flat-square" />
</p>

<h3 align="center">Construído com as ferramentas e tecnologias:</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" />
  <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/EJS-8C8C8C?style=for-the-badge&logo=ejs&logoColor=white" />
  <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" />
</p>

<hr>

<h2>📂 Sobre o Projeto</h2>
<p>
  O <strong>Cadastro de Livros - JS</strong> é um sistema desktop construído com <strong>Node.js</strong> e empacotado com <strong>Electron</strong>, permitindo o gerenciamento de uma biblioteca com funcionalidades como:
</p>
<ul>
  <li>Cadastro de livros com título, autor, gênero e ano.</li>
  <li>Listagem e visualização dos livros cadastrados.</li>
  <li>Atualização e exclusão dos registros.</li>
  <li>Interface interativa usando EJS e estilização com CSS.</li>
</ul>

<h2>💻 Como executar o projeto</h2>
<pre><code># Instale as dependências
npm install </pre></code>

<h2>💻 Importe o banco de dados:</h2>
<p>O arquivo <code>banco/livros.sql</code> contém a estrutura e dados iniciais do banco.</p>

<h2>💻 Configuração do envio de e-mail:</h2>
<p>Para que o sistema de recuperação de senha funcione, é importante que você configure suas próprias credenciais de e-mail no código.</p>

<p>No arquivo responsável pelo envio de e-mails (no controller de senha), há um trecho como este:</p>

<pre><code>const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
</code></pre>

<p><strong>Importante:</strong> Você deve definir as variáveis de ambiente <code>EMAIL_USER</code> e <code>EMAIL_PASS</code> no seu ambiente local, ou alterar esse código para usar seus dados reais de e-mail e senha (de app), garantindo que o envio dos e-mails funcione corretamente.</p>

<p><strong style="color: red;">Nunca compartilhe publicamente suas credenciais reais.</strong></p>


# Rode o servidor
<pre><code>npm run dev
</code></pre>

<p>Para rodar como aplicativo desktop:</p>
<pre><code>npm run make</code></pre>

<h2>🗂 Estrutura de Diretórios</h2>
<pre><code>livros-node/
├── app.js
├── package.json
├── views/
├── public/
├── controllers/
├── models/
├── routes/
├── livros.sql
</code></pre>

<h2>⚠️ Nota Importante</h2>
<p><strong>Este projeto é destinado apenas para fins de testes e aprendizado.</strong> Não deve ser utilizado em produção sem as devidas adaptações e validações de segurança.</p>

<h2>📦 Versão</h2>
<p>1.0.0</p>

<h2>📄 Licença</h2>
<p>Esse projeto está sob a licença MIT.</p>

## Contato ##
Giovana Marques Silva <br>
giovanamarquessilva24@gmail.com
