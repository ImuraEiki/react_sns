# react_sns

### 概要
- Reactの学習用にSNSを開発しました。
### 使用技術
- フロントエンド：React / Next.js / TypeScript / Tailwind CSS
- バックエンド: 
- インフラ：
  - AWS ECS Fargate / ECR / ALB / Route53
  - Docker
- 認証: Auth0
### 主な機能
- ユーザー新規作成/ログイン(Auth0)
- 投稿機能
- フォロー機能
- コメント・いいね機能
- ログイン状態で閲覧/機能制限
- ユーザープロフィール編集
- 無限スクロール(react-virtualizedで画面に表示する部分のみ都度読み込む)
- ダークモード切り替え

### デプロイ環境
- フロントエンド: ECS Fargate
- URL: http://eiki-imura-app.com

### テスト
- フロントエンド：Jest + React Testing Library

### 工夫した点
- Redux Toolkit を使った状態管理
- 認証情報をセッションに保持
- フロント単体テスト
- AWS環境構築、Fargateにデプロイ
- 5000件の投稿テストデータでパフォーマンス確認

### Getting Started

実行環境:
WSL: Ubuntu-24.04
Docker version 27.5.1

任意の作業用ディレクトリで下記コマンドを実行
```
git clone https://github.com/ImuraEiki/react_sns.git
cd react_sns/
docker-compose up
```
すると、http://localhost:3000 にアクセスしてアプリケーションを操作できます。




# ECRプッシュ手順

## aws cliでログイン
### ECRプッシュ手順
#### aws cliでログイン
`aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${USER_ID}.dkr.ecr.${REGION}.amazonaws.com`
#### docker build
`docker build -f dockerfile.prod -t ${IMAGE} .`
#### タグつけ
`docker tag ${IMAGE}:latest ${USER_ID}.dkr.ecr.${REGION}.amazonaws.com/${IMAGE}:latest`
#### プッシュ
`docker push ${USER_ID}.dkr.ecr.${REGION}.amazonaws.com/${IMAGE}:latest`

### ALBの作成
```
aws elbv2 create-load-balancer \
  --name react-app-alb \
  --subnets subnet-a subnet-b \
  --security-groups sg-a \
  --type application \
  --scheme internet-facing \
  --ip-address-type ipv4 \
  --region ${REGION}

```
### リスナー作成（ALB → ターゲットグループへルーティング）
```
aws elbv2 create-listener \
  --load-balancer-arn ${LOAD_BALANCER} \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=${TARGET_GROUP_ARN} \
  --region ${REGION}

```

### ECSのサービスにALBを紐付け
```
aws ecs update-service \
  --cluster ${CLUSTER} \
  --service ${SERVICE} \
  --load-balancers targetGroupArn=${TARGET_GROUP_ARN},containerName=${CONTAINER_NAME},containerPort=3000
```

### ECSタスクの停止
```
aws ecs update-service \
  --cluster ${CLUSTER} \
  --service ${SERVICE} \
  --desired-count 0 \
  --region ${REGION}
```
### ECSタスクの再起動
```
aws ecs update-service \
  --cluster ${CLUSTER} \
  --service ${SERVICE} \
  --desired-count 1 \
  --region ${REGION}
```