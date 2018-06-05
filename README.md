# 测试安装

```sh
npm i -g https://github.com/shynome/alpine-drone-ci.git#dev
```

# Useage Case

### git 差异部署

```yaml
pipeline:
  build:
    image: shynome/alpine-drone-ci
    volume:
      - ssh:/root/.ssh
    environment:
      host: deploy_host
      deploy_dir: /deploy_dir 
    commands:
      - deploy build git|node
```

### deploy
```yaml
pipeline:
  deploy_to_host1:
    image: shynome/alpine-drone-ci
    volume:
      - ssh:/root/.ssh
    commands:
      - echo 'deploy_dir=/deploy'>>.env
      - deploy to host
```