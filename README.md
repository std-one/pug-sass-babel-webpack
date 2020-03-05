
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
npm install
```

### srcディレクトリ内を監視
```
yarn start
```
- 通常作業はこちらになります。gulpが起動します。


