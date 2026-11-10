# 🔐 SecureAccess — Sistema de Gestão de Identidade

## 📌 Sobre o projeto

O **SecureAccess** é uma aplicação web desenvolvida com Node.js e Express, com o objetivo de demonstrar conceitos de Gestão de Identidade, Autenticação e Autorização.

O sistema permite o cadastro e login de usuários, gerenciamento de permissões e acesso a diferentes áreas conforme o perfil de cada usuário.

## 🎯 Objetivos

- Implementar autenticação de usuários.
- Armazenar senhas de forma segura utilizando hash.
- Utilizar JWT para gerenciamento da autenticação.
- Implementar controle de acesso baseado em funções (RBAC).
- Proteger rotas utilizando middlewares.
- Demonstrar mecanismos básicos de proteção contra ataques CSRF.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Node.js | Ambiente de execução |
| Express | Framework para aplicação web |
| EJS | Renderização das páginas |
| Bootstrap | Estilização e responsividade |
| CSS | Identidade visual |
| MySQL | Banco de dados |
| Sequelize | ORM para comunicação com o banco |
| bcrypt | Hash de senhas |
| JSON Web Token | Autenticação |
| Cookie-parser | Gerenciamento de cookies |
| dotenv | Gerenciamento de variáveis de ambiente |

## 🔒 Funcionalidades

### Autenticação
- Cadastro de usuários.
- Login com e-mail e senha.
- Criptografia de senhas com bcrypt.
- Geração e validação de tokens JWT.
- Logout com remoção do cookie de autenticação.

### Autorização
O sistema possui dois níveis de acesso:

- **User:** acesso ao painel do usuário.
- **Admin:** acesso ao painel administrativo e à listagem de usuários.

O controle de permissões é realizado por middlewares.

### Segurança
- Senhas armazenadas em formato hash.
- Cookies de autenticação com configuração HttpOnly.
- Validação de tokens JWT.
- Controle de acesso às rotas.
- Validação de dados no cadastro.
- Proteção CSRF básica por Double Submit Cookie.

## 📂 Estrutura do projeto

```text
gestao_identidade/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── csrfMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── pageRoutes.js
│   ├── views/
│   │   ├── partials/
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   ├── dashboard.ejs
│   │   └── admin.ejs
│   └── server.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── images/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Como executar o projeto

### 1. Pré-requisitos

- Node.js instalado.
- MySQL instalado.
- MySQL Workbench (opcional).

### 2. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd gestao_identidade
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Criar o banco de dados

No MySQL, execute:

```sql
CREATE DATABASE secureaccess;
```

### 5. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_NAME=secureaccess
DB_USER=root
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=3306

JWT_SECRET=sua_chave_secreta
```

Substitua `sua_senha` pela senha do seu MySQL e configure uma chave JWT forte e aleatória.

**Importante:** o arquivo `.env` não deve ser enviado ao GitHub.

### 6. Executar a aplicação

Para iniciar em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

## 🧪 Testes realizados

- Cadastro de usuários.
- Verificação do hash de senhas no banco de dados.
- Autenticação com credenciais válidas e inválidas.
- Acesso ao dashboard.
- Bloqueio de usuários comuns no painel administrativo.
- Acesso administrativo com perfil autorizado.
- Encerramento da autenticação por logout.
- Bloqueio de requisições com token CSRF inválido.

## 📚 Conceitos demonstrados

- Autenticação e autorização.
- JSON Web Token (JWT).
- Hash de senhas.
- Controle de acesso baseado em funções (RBAC).
- Middlewares no Express.
- Segurança de cookies.
- Proteção contra CSRF.

## 👨‍💻 Projeto acadêmico

Projeto desenvolvido para fins educacionais, com foco no estudo e na aplicação prática dos conceitos de Gestão de Identidade, Autenticação e Autorização.

**SecureAccess — Segurança e controle de acesso em aplicações web.**