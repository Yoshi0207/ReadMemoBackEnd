import express from 'express';
import axios from 'axios';
import { rejects } from 'assert';
import { access } from 'fs';

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
    public getBookInformationByIsbn() {
        // isbnの情報がクエリに含まれなかったらエラーメッセージを出力してreturn
        if (!("isbn" in this.request.query)) {
            this.sendMessageOfInvalidArguments();
            return;
        }

        // ISBNをクエリに追加
        this.endPoint += `&isbn=${this.request.query.isbn}`;

        this.accessToApiAndSendResponse();
    }

    /*
        タイトルを用いた検索を行う場合の処理
    */
    public getBookInformationByTitle() {
        // タイトルの情報がクエリに含まれなかったらエラーメッセージを出力してreturn
        if (!("title" in this.request.query) || !("page" in this.request.query)) {
            this.sendMessageOfInvalidArguments();
            return;
        }

        // 文字コードをUTF-8に変換
        const title = unescape(encodeURIComponent(`${this.request.query.title}`));

        // タイトルをクエリに追加
        this.endPoint += `&title=${title}&page=${this.request.query.page}&sort=sales`;

        this.accessToApiAndSendResponse();
    }

    /*
        著者名を用いた検索を行う場合の処理
    */
    public getBookInformationByAuthor() {
        // 著者の情報及び表示ページの情報がクエリに含まれなかったらエラーメッセージを出力してreturn
        if (!("author" in this.request.query) || !("page" in this.request.query)) {
            this.sendMessageOfInvalidArguments();
            return;
        }

        // 文字コードをUTF-8に変換
        const author = unescape(encodeURIComponent(`${this.request.query.author}`));

        // 著者の情報及び表示ページの情報をクエリに追加
        this.endPoint += `&author=${author}&page=${this.request.query.page}&sort=sales`;

        this.accessToApiAndSendResponse();
    }

    /*
        出版社名を用いた検索を行う場合の処理
    */
    public getBookInformationByPublisher() {
        // 出版社の情報及び表示ページの情報がクエリに含まれなかったらエラーメッセージを出力してreturn
        if (!("publisher" in this.request.query) || !("page" in this.request.query)) {
            this.sendMessageOfInvalidArguments();
            return;
        }

        // 文字コードをUTF-8に変換
        const publisher = unescape(encodeURIComponent(`${this.request.query.publisher}`));

        // 出版社の情報及び表示ページの情報をクエリに追加
        this.endPoint += `&publisherName=${publisher}&page=${this.request.query.page}&sort=sales`;

        this.accessToApiAndSendResponse();
    }

    /*
        ジャンルを用いた検索を行う場合の処理
    */
    public getBookInformationByGenre() {
        // ジャンルの情報及び表示ページの情報がクエリに含まれなかったらエラーメッセージを出力してreturn
        if (!("genre" in this.request.query) || !("page" in this.request.query)) {
            this.sendMessageOfInvalidArguments();
            return;
        }

        // ジャンル・ページ数をクエリに追加
        this.endPoint += `&booksGenreId=001${this.request.query.genre}&page=${this.request.query.page}&sort=sales`;

        this.accessToApiAndSendResponse();
    }

    // 作成したURLを用いて楽天ブックスAPIにアクセスし、取得した値をクライアント側に返す
    private async accessToApiAndSendResponse(): Promise<void> {
        try {
            const info = await BookInformationGetter.accessToRakutenApi(this.endPoint);
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

    private static accessToRakutenApi(endPointUrl: string): Promise<ResponseOfRakutenApi | any> {
        return new Promise(resolve => {
            axios({
                method: 'GET',
                url: endPointUrl,
            }).then(response => {
                resolve(response.data);
            }).catch(err => {
                rejects(new Promise(() => { }), err);
            });
        });
    }

    // パラメータエラーを出力するメソッド
    private sendMessageOfInvalidArguments() {
        this.response.send({
            error: {
                status: 412,
                message: 'Precondition failed'
            }
        })
        console.log(this.date.toLocaleString() + " Parameters were invalid.");
    }
}