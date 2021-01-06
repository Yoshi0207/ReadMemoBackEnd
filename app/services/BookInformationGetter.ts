import express from 'express';
import axios from 'axios';
import { rejects } from 'assert';

type ResponseOfRakutenApi = Object;

export default class BookInformationGetter {
    private request: express.Request;
    private response: express.Response;
    private endPoint = "";
    private date = new Date();
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
            console.log(this.date.toLocaleString() +" Parameters were invalid.");
            return new Promise(() => { });
        }

        // ISBNをクエリに追加
        this.endPoint += `&isbn=${this.request.query.isbn}`;

        try {
            const info = await this.accessToRakutenApi(this.endPoint);
            this.response.send(info);
            console.log(this.date.toLocaleString() + " The connection is successful.");
        } catch {
            this.response.send({
                error: {
                    status: 418,
                    message: 'I\'m a teapot'
                }
            })
            console.log(this.date.toLocaleString() +" An error occurred.");
        }
    }

    /*
        タイトルを用いた検索を行う場合の処理
    */
    public async getBookInformationByTitle() {
        // タイトルの情報がクエリに含まれなかったらエラーメッセージを出力してreturn
        if (!("title" in this.request.query)) {
            this.response.send({
                error: {
                    status: 412,
                    message: 'Precondition failed'
                }
            })
            console.log(this.date.toLocaleString() +" Parameters were invalid.")
            return new Promise(() => { });
        }

        // タイトルをクエリに追加
        this.endPoint += `&title=${this.request.query.title}`;

        try {
            const info = await this.accessToRakutenApi(this.endPoint);
            this.response.send(info);
            console.log(this.date.toLocaleString() + " The connection is successful.");
        } catch {
            this.response.send({
                error: {
                    status: 418,
                    message: 'I\'m a teapot'
                }
            })
            console.log(this.date.toLocaleString() + " An error occurred.");
        }
    }

    /*
        ジャンルを用いた検索を行う場合の処理
    */
    public async getBookInformationByGenre() {
        // ジャンルの情報及び表示ページの情報がクエリに含まれなかったらエラーメッセージを出力してreturn
        if (!("genre" in this.request.query) || !("page" in this.request.query)) {
            this.response.send({
                error: {
                    status: 412,
                    message: 'Precondition failed'
                }
            })
            console.log(this.date.toLocaleString() +" Parameters were invalid.")
            return new Promise(() => { });
        }

        // ジャンル・ページ数をクエリに追加
        this.endPoint += `&booksGenreId=001${this.request.query.genre}&page=${this.request.query.page}&sort=sales`;

        try {
            const info = await this.accessToRakutenApi(this.endPoint);
            this.response.send(info);
            console.log(this.date.toLocaleString() + " The connection is successful.");
        } catch {
            this.response.send({
                error: {
                    status: 418,
                    message: 'I\'m a teapot'
                }
            })
            console.log(this.date.toLocaleString() +" An error occurred.");
        }
    }

    private accessToRakutenApi(endPointUrl: string): Promise<ResponseOfRakutenApi> {
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