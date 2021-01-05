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
app.use((_reqest, response) => {
    response.status(404);
    response.render('error', {
      param: {
        status: 404,
        message: 'not found'
      },
    });
});

// 3000番ポートでAPIサーバ起動
app.listen(3000, () => { console.log('listen on port 3000.') });