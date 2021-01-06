// envファイルを読み込む
require('dotenv').config();

import express from 'express';

import router from './routes';

const app: express.Express = express();

// ローカル環境以外からAPIを実行する場合に必要な処理
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// 受け取ったリクエストをパース
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルーティング処理
app.use(router);

// マッチしなかった場合の処理
app.use((reqest, response) => {
  response.send({
    error: {
      status: 404,
      message: 'not found'
    },
  });
});

// コンテナを使用しない場合の設定
// const hostname = process.env.READMEMO_HOST_NAME;
// const port = process.env.READMEMO_PORT ?? "8080";

// コンテナ使用を使用する場合の設定
const hostname = '0.0.0.0';
const port = '8080';

// APIサーバ起動
if (hostname == undefined) {
  app.listen(parseInt(port), () => { console.log(`listen on port ${port}.`) });
} else {
  app.listen(parseInt(port), hostname, () => { console.log(`listen on port ${port}.`) });
}
