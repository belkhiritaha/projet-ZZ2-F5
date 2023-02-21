FROM node

WORKDIR /backend

COPY */package*.json ./

RUN npm install

RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

RUN mkdir -p /data/db

EXPOSE 8001

COPY . .

CMD ["cd", "azzure"]

CMD ["npm", "run", "back"]
