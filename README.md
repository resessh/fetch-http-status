# fetch-http-status
URLリスト爆速curl案件

## Install

```sh
$ yarn global add "github:gulpjs/gulp#4.0"
$ yarn global add typescript
$ yarn install
```

## Build

```sh
$ gulp
```

## Exec

- URL一覧を用意

```
http://hoge.com/foo1
http://hoge.com/foo2
http://hoge.com/foo3
```

```sh
$ cd ${REPOSITORY_ROOT}
$ node ./dist/index.js ./url-list/hoge.txt
```