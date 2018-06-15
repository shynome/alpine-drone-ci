
# Useage Case

### git 差异部署

#### build
```yaml
pipeline:
  build:
    image: shynome/alpine-drone-ci
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

支持的 `web_hook`
- `dingtalk robot`

### usage in drone

at first add `report_hook` secret
```yml
pipeline:
  report:
    image: shynome/alpine-drone-ci
    secrets: [ report_hook ]
    commands:
    - deploy report -a
```

### command useage

```sh
# deploy report --always [report_hook_url]
deploy report -a https://oapi.dingtalk.com/robot/send?access_token=${your_token}
```