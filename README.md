# sync_play_client

一个同步播放软件.

![效果图](./doc/20220205150940.gif)

## 用途

使多人远程同时看一个视频.
当任意一人暂停, 播放, 拖动进度时, 操作会广播给所有客户端, 保证所有人的时间一致.

## 用法

### 前置条件

- 需要有服务器
- 所有人都需要将视频提前下载到自己的电脑上

### 操作步骤

1. 在服务器上部署[sync_play_service](https://github.com/lsby/sync_play_service)
2. 下载[发行包](https://github.com/lsby/sync_play_client/releases)
3. 修改`run.bat`里的参数, 其中`vlcPort`任意, `wsAddr`是服务器的 ip, `wsPort`是服务器开启 ws 服务的端口.
4. 运行`run.bat`, 会弹出 VLC, 使用它播放视频即可.

### 注意事项

- 不可以放在中文路径下
