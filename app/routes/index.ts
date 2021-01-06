import express from 'express';

import BookInformationGetter from '../services/BookInformationGetter';

const router: express.Router = express.Router()

/* 
楽天ブックスAPIと通信し、取得した本の情報を返却する
*/
/*
参考：ISBNによる検索
受け取る値
{
    isbn: number (10 or 13桁の自然数)
}
返却する値
{
    楽天ブックスAPIに準拠
}
*/
router.get('/book-info-getter/isbn', (request: express.Request, response: express.Response) => {
    const bookInformationGetter = new BookInformationGetter(request, response);
    bookInformationGetter.getBookInformationByIsbn();
});

/*
参考：タイトルによる検索
受け取る値
{
    title: string (本のタイトルの情報)
    page: number (楽天ブックスAPIで表示するページ番号(最大100))
}
返却する値
{
    楽天ブックスAPIに準拠
}
*/
router.get('/book-info-getter/title', (request: express.Request, response: express.Response) => {
    const bookInformationGetter = new BookInformationGetter(request, response);
    bookInformationGetter.getBookInformationByTitle();
});

/*
参考：著者名による検索
受け取る値
{
    author: string (本のタイトルの情報)
    page: number (楽天ブックスAPIで表示するページ番号(最大100))
}
返却する値
{
    楽天ブックスAPIに準拠
}
*/
router.get('/book-info-getter/author', (request: express.Request, response: express.Response) => {
    const bookInformationGetter = new BookInformationGetter(request, response);
    bookInformationGetter.getBookInformationByAuthor();
});

/*
参考：出版社名による検索
受け取る値
{
    publisher: string (本のタイトルの情報)
    page: number (楽天ブックスAPIで表示するページ番号(最大100))
}
返却する値
{
    楽天ブックスAPIに準拠
}
*/
router.get('/book-info-getter/publisher', (request: express.Request, response: express.Response) => {
    const bookInformationGetter = new BookInformationGetter(request, response);
    bookInformationGetter.getBookInformationByPublisher();
});

/*
参考：ジャンルによる検索
受け取る値
{
    genre: number (楽天ブックスAPIによって定められているジャンルID)
    page: number (楽天ブックスAPIで表示するページ番号(最大100))
}
返却する値
{
    楽天ブックスAPIに準拠
}
*/
router.get('/book-info-getter/genre', (request: express.Request, response: express.Response) => {
    const bookInformationGetter = new BookInformationGetter(request, response);
    bookInformationGetter.getBookInformationByGenre();
});

router.post('/api/postTest', (req: express.Request, res: express.Response) => {
    res.send(req.body);
})

export default router;