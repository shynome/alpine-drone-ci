# CHANGELOG

## 1.4.0

### ADD

- `docker ssh set` 将环境变量中的 `ssh_conf` 设置到 '~/.ssh/config` , `ssh_key` 设置到 `~/.ssh/id_rsa` 中

### CHANGE

- `dokcer plugin` 执行这个命令时如果有 `ssh_conf` 变量时会自动执行 `docker ssh set`

----

## 1.3.0

### ADD

- `dokcer plugin` 支持 `drone-plugin` 模式, 命令放在 `deploy` 中

