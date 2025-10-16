# 🚀 Projeto YDUQS - Portal de Inscrição de Cursos

Este é um projeto fullstack que consiste em um portal para inscrição em cursos, desenvolvido com tecnologias modernas tanto no frontend quanto no backend.

## 💻 Tecnologias Utilizadas

### Frontend
- **Next.js 13** - Framework React com Server-Side Rendering
- **Material UI** - Biblioteca de componentes para design system
- **React Query** - Gerenciamento de estado e cache de dados
- **Formik + Yup** - Gerenciamento de formulários e validação
- **TypeScript** - Tipagem estática
- **Context API** - Gerenciamento de estado global
- **Jest + React Testing Library** - Testes unitários

### Backend
- **NestJS** - Framework Node.js para backend
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Jest** - Testes unitários
- **Swagger** - Documentação da API

## ▶️ Como Executar

1. Clone o repositório para a sua máquina local:
   ```bash
   git clone https://github.com/Brunotorresdev/yduqs-portais-desafio-fullstack.git
   ```

2. Acesse a pasta do projeto e configure o ambiente:
   ```bash
   cd yduqs-portais-desafio-fullstack
   ```

   ### Backend Setup:
   ```bash
   # Entre no diretório backend
   cd backend
   
   # Copie o arquivo de exemplo de variáveis de ambiente
   cp .env.example .env
   
   # Inicie o banco de dados PostgreSQL usando Docker
   docker-compose up -d
   
   # Instale as dependências
   yarn install
   ```
   
   ### Frontend Setup:
   ```bash
   # Entre no diretório frontend
   cd ../frontend
   
   # Copie o arquivo de exemplo de variáveis de ambiente
   cp .env.example .env
   
   # Instale as dependências
   yarn install
   ```

   > **Nota**: Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina antes de executar os comandos acima.

3. Inicie o banco de dados e verifique seu status:
   ```bash
   # A partir da pasta /backend
   docker-compose up -d     # Inicia o PostgreSQL em background
   docker-compose ps        # Verifica se o container está rodando
   ```

4. Rode o **backend** e o **frontend**:
   
   **Backend (NestJS)**
   ```bash
   # A partir da pasta /backend
   yarn start
   ```
   
   **Frontend (Next.js)**
   ```bash
   # A partir da pasta /frontend
   yarn dev
   ```

   > **Importante**: Certifique-se de que o container do PostgreSQL está rodando (status "Up") antes de iniciar o backend. Você pode verificar os logs do banco com `docker-compose logs db`.

---

## � Funcionalidades Principais

- Listagem de cursos disponíveis
- Visualização detalhada de opções de pagamento
- Formulário de inscrição com validações completas
- Feedback em tempo real para o usuário
- Design responsivo para todas as telas

## 🔒 Validações do Formulário

- Nome completo obrigatório
- CPF válido com máscara
- Data de nascimento com validação de idade mínima (16 anos)
- Email válido
- Telefone com máscara
- Ano de conclusão do ensino médio entre 1950 e ano atual
- Termos de uso obrigatórios

## 🌐 API

A documentação completa da API pode ser acessada em `http://localhost:3333/api` após iniciar o backend.

## 🧪 Testes

### Backend
```bash
cd backend
yarn test        # Roda os testes unitários
yarn test:e2e    # Roda os testes e2e
```

### Frontend
```bash
cd frontend
yarn test        # Roda os testes unitários
yarn test:watch  # Roda os testes em modo watch
```
## �📓 Acompanhamento do Projeto

O andamento detalhado do desenvolvimento, decisões de arquitetura e outras anotações podem ser encontradas no Notion:

🔗 **[https://www.notion.so/Teste-YDUQS-2876385c282c802a85a8c3c7b177bc0f?source=copy_link]**

---
Obrigado por visitar! 🚀
