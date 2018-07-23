
## 介绍

drone 的部署脚本写的太多, 想简化下就有了这个.

支持的部署目前有下面这几个:

- [git sample .drone.yml](./docs/drone-deploy-sample/git.yml)    
  git 差异文件部署, 适用语言: 不需要编译的语言 (比如: `php`)

- [docker sample .drone.yml](./docs/drone-deploy-sample/docker.yml)    
  docker 部署, 需要编译打包的都可以用这个, 缺点是慢

- [node sample .drone.yml](./docs/drone-deploy-sample/node.yml)    
  node 前台开发的部署示例, <del>这个没试过但理论上是可以的</del>
  
欢迎吐槽

## 更多帮助查看

```sh
npm i -g @shynome/alpine-drone-ci
deploy -h
```

因为依赖的 `shelljs` 在 windows 下不支持中文输出, 所以在 windows 下中文会乱码

## 反馈

