# Meus Livros App

## Sobre o Projeto

Meus Livros App é um sistema desenvolvido em JS para gerenciar seu acervo pessoal de livros.  
Ele permite que você crie um perfil, acompanhe quantos livros já leu, e gerencie seus livros de forma prática e visual.

### Funcionalidades principais

- Cadastro de usuários e perfis personalizados.
- Controle de livros lidos, com contagem automática.
- Cadastro de livros com título, autor, capa (imagem) e avaliação (rating) de 1 a 5 estrelas.
- Edição e exclusão dos livros cadastrados.
- Interface intuitiva para facilitar a navegação e a gestão da sua coleção.

---

## Como Funciona no Computador

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 16+ recomendada)
- Banco de dados MySQL configurado

### Configuração

1. Clone o repositório;
2. Instale as dependências:

`npm install`

3. Importe o banco de dados:

O arquivo banco/livros.sql contém a estrutura e dados iniciais do banco. 

4. Configuração do envio de e-mail:

Para que o sistema de recuperação de senha funcione, é importante que você configure suas próprias credenciais de e-mail no código.

No arquivo responsável pelo envio de e-mails (por exemplo, no controller de senha), há um trecho como este:

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

**Importante:** Você deve definir as variáveis de ambiente EMAIL_USER e EMAIL_PASS no seu ambiente local, ou alterar esse código para usar seus dados reais de e-mail e senha (de app), garantindo que o envio dos e-mails funcione corretamente.

**Nunca compartilhe publicamente suas credenciais reais.**

5. Rode o servidor:
`npm run dev`

6. Acesse no navegador

# Versão Executável com Electron.js # 
Este projeto também pode ser executado como um aplicativo desktop graças ao Electron.js.

O arquivo main.js é responsável por abrir o app como um programa independente, embutindo o servidor Express.

O executável gerado pode ser distribuído para rodar em máquinas Windows, Linux ou Mac sem precisar instalar o Node.js.

**Nota:** Por questões de organização, o arquivo main.js e a pasta com o executável (dist/) não estão no repositório principal, mas você pode gerar o executável localmente com o Electron seguindo as instruções na documentação do Electron.

## Contato ##
Giovana Marques Silva
giovanamarquessilva24@gmail.com
