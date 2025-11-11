sudo apt purge nodejs
sudo rm -r /etc/apt/sources.list.d/nodesource.list
# nodeをバージョンアップ
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update
sudo apt install -y nodejs