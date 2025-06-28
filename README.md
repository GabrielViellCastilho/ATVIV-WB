# ATVIV-WB

Este projeto é composto por um front-end em React com TypeScript e um back-end em Spring Boot. Abaixo estão os passos para clonar, instalar e executar ambos os lados da aplicação.

## Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão recomendada: 18.x ou superior)
- [Git](https://git-scm.com/)
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (versão 17 ou superior)

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/GabrielViellCastilho/ATVIV-WB.git
```

### 2. Inicie o back-end (Spring Boot)

```bash
cd ATVIV-WB/executavel
java -jar wbbackend.jar
```

### 3. Em outro terminal, inicie o front-end (React + TypeScript)

```bash
cd ATVIV-WB
npm install
npm start
```

A aplicação front-end será iniciada e estará disponível no navegador, geralmente em `http://localhost:3000`. Certifique-se de que o back-end esteja rodando corretamente para que as funcionalidades funcionem como esperado.
