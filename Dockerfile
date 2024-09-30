FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
RUN npm prune --production
EXPOSE 3000
CMD npm run start