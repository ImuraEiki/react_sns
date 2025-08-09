# 古いyarnを削除
$ sudo apt remove yarn
$ sudo apt remove cmdtest
$ sudo apt autoremove
# yarnをインストール
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn
# installを実行
yarn