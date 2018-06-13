# 测试安装

```sh
npm i -g https://github.com/shynome/alpine-drone-ci.git#dev
```

# Useage Case

### git 差异部署

#### build
```yaml
pipeline:
  build:
    image: shynome/alpine-drone-ci:dev
    volume:
      - ssh:/root/.ssh
    environment:
      host: deploy_host
    commands:
      - deploy set deploy_dir /deploy_dir 
      - deploy build git
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