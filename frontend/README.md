# Frontend - Yduqs Portais Desafio Fullstack

## Descrição

Interface web desenvolvida em React/Next.js para o desafio fullstack, integrando com o backend NestJS.

---

## Instruções Básicas

### 1. Instalação das dependências

```bash
yarn install
```

### 2. Executando o projeto

Para rodar o projeto em modo de desenvolvimento, utilize o comando:

```bash
yarn dev
```

Isso irá iniciar o servidor de desenvolvimento e você poderá acessar o projeto em [http://localhost:3000](http://localhost:3000).

### 3. Estrutura de Pastas

A estrutura de pastas do projeto é a seguinte:

```
.
├── app
│   ├── api
│   │   └── hello
│   │       └── route.ts
│   ├── components
│   │   └── Button.tsx
│   ├── page.tsx
│   └── globals.css
├── public
│   └── vercel.svg
├── styles
│   └── Home.module.css
├── tsconfig.json
└── package.json
```

### 4. Principais Dependências

As principais dependências utilizadas no projeto são:

- `next`: Framework React para desenvolvimento de aplicações web.
- `react`: Biblioteca JavaScript para construção de interfaces de usuário.
- `typescript`: Superset do JavaScript que adiciona tipagem estática.

### 5. Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts disponíveis:

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Cria uma versão otimizada para produção.
- `start`: Inicia o servidor em modo produção.

## Tecnologias Utilizadas

- **Frontend:** React, Next.js, TypeScript, CSS Modules.
- **Backend:** NestJS (para a API integrada).
