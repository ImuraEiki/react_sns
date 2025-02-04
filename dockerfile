# 使用するベースイメージ
FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /app

# yarn.lock と package.json をコピー
COPY package.json yarn.lock ./

# 依存関係のインストール
RUN yarn install

# 残りのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN yarn build

# コンテナ起動時にアプリケーションを起動
CMD ["yarn", "dev"]

# コンテナのポートを公開
EXPOSE 3000
