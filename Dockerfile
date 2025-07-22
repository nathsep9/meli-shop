FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run build:server
RUN npm run build:client
EXPOSE 3000
CMD ["npm", "start"]