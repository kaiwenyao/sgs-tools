#!/bin/bash

# ================= 配置区域 =================
# 1. 服务器 IP 地址
# SERVER_IP="51.195.117.87"

# # 2. 服务器用户名 (通常是 root)
# SERVER_USER="root"
SERVER_ALIAS="ovh"

# 3. 服务器上项目的绝对路径 (docker-compose.yaml 所在的目录)
# 确保这个目录下有一个空的 dist 文件夹或者用来存放代码的文件夹
SERVER_PATH="/root/data/docker_data/sgs"

# 4. 本地构建输出目录 (通常是 dist 或 build)
LOCAL_DIST_DIR="dist/"
# ===========================================

echo "🚀 [1/3] 开始本地构建..."
# 运行 build 命令
npm run build

# 检查构建是否成功，失败则停止脚本
if [ $? -ne 0 ]; then
  echo "❌ 构建失败，终止部署"
  exit 1
fi
echo "✅ 构建完成"

echo "📡 [2/3] 同步文件到服务器..."
# 使用 rsync 替代 scp
# -a: 归档模式 (保留所有属性)
# -v: 显示详细过程
# -z: 压缩传输 (节省带宽)
# --delete: 删除服务器上 dist 中存在但本地不存在的文件 (保持完全一致)
# 注意：$LOCAL_DIST_DIR 后面加斜杠，表示同步文件夹内的内容
rsync -avz --delete $LOCAL_DIST_DIR $SERVER_ALIAS:$SERVER_PATH/dist/

echo "🐳 [3/3] 服务器远程操作 (停止容器 -> 删除镜像 -> 重建启动)..."
ssh $SERVER_ALIAS << EOF
  cd $SERVER_PATH

  # 1. 停止并移除容器、网络
  # --rmi local 会删除此 compose 文件构建出的所有镜像 (满足你的删除镜像需求)
  echo "🛑 正在停止容器并清理旧镜像..."
  docker compose down --rmi local

  # 2. 重新构建并启动
  # --build 确保基于刚才上传的新 dist 文件重新打镜像
  echo "🏗️  正在重新构建并启动..."
  docker compose up -d --build

  # 3. 清理虚悬镜像 (可选：清理构建过程中产生的无名中间层镜像，保持服务器干净)
  docker image prune -f
EOF

echo "🎉 部署成功！"