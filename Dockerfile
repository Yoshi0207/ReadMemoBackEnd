FROM node:12

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/

# アプリケーションの依存関係をインストールする
COPY package*.json ./
RUN npm install

# アプリケーションのソースをバンドルする
COPY . .

EXPOSE 8080
CMD npm run start