import express from 'express';

import BookInformationGetter from '../services/BookInformationGetter';

const router: express.Router = express.Router()

/* 
楽天ブックスAPIと通信し、取得した本の情報を返却する

参考：
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

router.post('/api/postTest', (req: express.Request, res: express.Response) => {
    res.send(req.body);
})

export default router;