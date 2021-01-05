import express from 'express';
import axios from 'axios';
import { rejects } from 'assert';

type JsonOfRakutenApiResponse = Object;

export default class BookInformationGetter {
    private request: express.Request;
    private response: express.Response;
    private endPoint = ""
    constructor(request: express.Request, response: express.Response) {
        this.request = request;
        this.response = response;

        // エンドポイントの指定
        this.endPoint += process.env.READMEMO_RAKUTEN_BOOKS_ENDPOINT;
        // リクエストに必要なクエリを追加(パスワードなど)
        this.endPoint += `?format=json&applicationId=${process.env.READMEMO_RAKUTEN_BOOKS_APPLICATION_ID}&affiliateId=${process.env.READMEMO_RAKUTEN_BOOKS_AFFILIATE_ID}`;
    }

    /*
        ISBNを用いた検索を行う場合の処理
    */
    public async getBookInformationByIsbn(): Promise<void> {
        // isbnの情報がクエリに含まれなかったらエラーメッセージを出力してreturn
        if (!("isbn" in this.request.query)) {
            this.response.send({
                error: {
                    status: 412,
                    message: 'Precondition failed'
                }
            })
            return new Promise(()=>{});
        }

        // ISBNをクエリに追加
        this.endPoint += `&isbn=${this.request.query.isbn}`;

        try {
            const info = await this.accessToRakutenApi(this.endPoint);
            this.response.send(info);
        } catch {
            console.log("An error occurred.")
        }
    }

    private accessToRakutenApi(endPointUrl: string): Promise<JsonOfRakutenApiResponse> {
        return new Promise(resolve => {
            axios({
                method: 'GET',
                url: endPointUrl,
            }).then(response => {
                resolve(response.data);
            }).catch(err => {
                rejects(err);
            });
        });
    }
}