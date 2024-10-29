# Etapa 1: Usar uma imagem oficial do Node.js
FROM node:18.12-alpine AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app/focus-elevador

# Copiar os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install --force

# Copiar o código da aplicação NestJS para dentro do container
COPY . .

# Rodar o build do projeto NestJS
RUN npm run build


# Comando para rodar a aplicação NestJS
CMD ["npm", "run", "start:prod"]