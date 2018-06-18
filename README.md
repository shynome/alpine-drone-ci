
# Useage Case

### git 差异部署

#### build
```yaml
pipeline:
  build_git:
    image: shynome/alpine-drone-ci
    volume:
      - ssh:/root/.ssh
    environment:
      host: core_host
    commands:
      - deploy set deploy_dir /deploy_dir 
      - deploy build git
  build_ssh_git:
    image: shynome/alpine-drone-ci:dev
    volume:
      - ssh:/root/.ssh
    environment:
      host: core_host
      git_host: fever-git
      git_basedir: /data/git/gogs-repositories
    commands:
      - deploy set deploy_dir /deploy_dir 
      - deploy build ssh-git
pipeline:
  deploy_to_host1:
    image: shynome/alpine-drone-ci
    volume:
      - ssh:/root/.ssh
    commands:
      - deploy to $host
```

# Api

## `deploy report` 报告构建结果 

支持的 `web_hook`
- 钉钉聊天机器人

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