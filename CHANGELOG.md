# CHANGELOG

## 1.6.0

### ADD

- `aliyun cdn RefreshObjectCaches [origin] -f [files]`
  - `aliyun cdn RefreshObjectCaches [origin] -f [files]` 刷新指定文件的 cdn 缓存
  - `aliyun cdn RefreshObjectCaches [origin]` 刷新指定网址目录的 cdn 缓存

## 1.5.0

### CHANGE

- `deploy report` 去除了 `-a` 选项, 这个选项应该在 `when` 里控制.
  ```yaml
  when: { status: [ success, failure ] }
  ``` 

## 1.4.3

### FIX

- `deploy build node` 打包的时候会带上被打包目录的前缀    
  错误的打包命令: `tar -czvf ${env.get('build_pack_file')} ${argv.dist}`    
  修复使用的命令: `tar -czvf ${env.get('build_pack_file')} -C ${argv.dist} .`    
  使用 `-C` 选项临时切换工作目录打包即可

## 1.4.0

### ADD

- `docker ssh set` 将环境变量中的 `ssh_conf` 设置到 `~/.ssh/config` , `ssh_key` 设置到 `~/.ssh/id_rsa` 中

### CHANGE

- `dokcer plugin` 执行这个命令时如果有 `ssh_conf` 变量时会自动执行 `docker ssh set`

----

## 1.3.0

### ADD

- `dokcer plugin` 支持 `drone-plugin` 模式, 命令放在 `deploy` 中

