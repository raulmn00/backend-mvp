FROM node:18
WORKDIR /backendmvp

COPY package.json .
RUN npm install
COPY . .
EXPOSE 3002
CMD ["npm", "run", "dev"]