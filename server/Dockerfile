FROM node:20-slim

WORKDIR /app

COPY src/package*.json ./
RUN npm install --production

COPY src .

EXPOSE 3000
CMD ["npm", "start"]
