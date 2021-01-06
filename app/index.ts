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

const hostname = process.env.READMEMO_HOST_NAME ?? "127.0.0.1";
const port = process.env.READMEMO_PORT ?? "3000";

// APIサーバ起動
app.listen(parseInt(port), hostname, () => { console.log(`listen on port ${port}.`) });