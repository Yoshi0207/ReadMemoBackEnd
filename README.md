# ReadMemoBackEndApplication
[ReadMemoAndroidApplication](https://github.com/Yoshi0207/ReadMemoAndroidApplication)からのリクエストを受け取るサーバサイドアプリケーションです。

## 環境設定
### 1. 環境変数を指定する
本アプリケーションは楽天ブックスAPIを使用します。従って、楽天プックスAPIの利用に必要となるアプリケーションIDを環境変数として定義します。
1. プロジェクトルートディレクトリに`.env`ファイルを作成する
```
touch .env
```

2. `.env`ファイルに以下を追加する(アフィリエイトIDは記述しなくても動作します)
```
READMEMO_RAKUTEN_BOOKS_APPLICATION_ID=<楽天から取得したアプリケーションID>
READMEMO_RAKUTEN_BOOKS_AFFILIATE_ID=<楽天から取得したアフィリエイトID(オプション)>
```

### 2. Dockerコンテナを起動する
1. Dockerfileからイメージを作成する
```
docker build -t <image-name> .
```

2. コンテナを起動する(マッピングするコンテナ側のポートは`8080`番を指定する)
```
docker run -it -d --name <container-name> -p <hosts-port-number>:8080 <image-name>
``` 

## 使い方
### ISBNで検索する
指定したISBNに対応する本の情報が返されます。

1. 本アプリケーションが動作しているサーバに下記リクエストを送信する
```
<サーバアドレス:hosts-port-number>/book-info-getter/isbn?isbn=<isbn>
```

### タイトルで検索する
指定したタイトルに一致する本の情報が最大30件返されます。

1. 本アプリケーションが動作しているサーバに下記リクエストを送信する
```
<サーバアドレス:hosts-port-number>/book-info-getter/title?title=<title-name(UTF-8)>&page=<楽天ブックスAPIが表示するページ番号(最大100)>
```

### 著者名で検索する
指定した著者名に一致する本の情報が最大30件返されます。

1. 本アプリケーションが動作しているサーバに下記リクエストを送信する
```
<サーバアドレス:hosts-port-number>/book-info-getter/author?author=<author-name(UTF-8)>&page=<楽天ブックスAPIが表示するページ番号(最大100)>
```

### 出版社名で検索する
指定した出版社名に一致する本の情報が最大30件返されます。

1. 本アプリケーションが動作しているサーバに下記リクエストを送信する
```
<サーバアドレス:hosts-port-number>/book-info-getter/publisher?publisher=<publisher-name(UTF-8)>&page=<楽天ブックスAPIが表示するページ番号(最大100)>
```

### ジャンルで検索する
指定したジャンルに一致する本の情報が最大30件返されます。

1. 本アプリケーションが動作しているサーバに下記リクエストを送信する
```
<サーバアドレス:hosts-port-number>/book-info-getter/genre?genre=<genre(楽天ブックスAPIの仕様に準拠する)>&page=<楽天ブックスAPIが表示するページ番号(最大100)>
```