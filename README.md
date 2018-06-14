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

# Api

## `deploy report` 报告构建结果 

```shell
deploy report --keep-result https://oapi.dingtalk.com/robot/send?access_token=05b51c6d9c772e1170cf2bbd57bf1fe7833bb5816a7b2fb2ea45a1864c74d084
```
