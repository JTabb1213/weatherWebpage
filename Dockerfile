FROM node:20-alpine3.18
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./
EXPOSE 4000
CMD [ "npm", "start"]