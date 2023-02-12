
## structure
```
├─public << 出力ファイルを格納※直接修正しないこと。
└─src << ソースファイルを格納
    ├─img
    ├─js
    ├─pug
    └─sass
```

## cmd

ローカルディレクトリ（場所は任意）に当プロジェクトをcloneしてください。

### cloneしたディレクトリ(プロジェクトルート)に移動
```
cd {project}
```

### パッケージ(node_modules)をインストール（初回のみ）
```
npm i
```

### srcディレクトリ内を監視
```
npm run start
または
yarn start
```
- 通常作業はこちらになります。gulpが起動します。


