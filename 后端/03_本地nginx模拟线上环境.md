<h1 align="center" id="本地nginx模拟线上环境">本地nginx模拟线上环境</h1>

**概要：**在这篇记录中，我们将探讨如何在本地运行编译后的项目，模拟线上环境。



## 本地服务器

打包后的前端代码（通常在 dist、build 或类似名称的文件夹里，包含 index.html、CSS 文件、JavaScript 文件等）可以在本地启动一个 Web 服务器来托管这些静态文件，从而模拟线上环境（至少是文件服务和基本的路由部分）。

这里我们使用 **Node.js 的** **serve** **包** ，这是目前比较流行且功能相对完善的静态文件服务器，特别适合单页应用（SPA）。

```
// 安装
npm install -g serve
```

进入你的打包输出目录（比如 dist 文件夹），然后运行：

```
cd dist
serve .
```

**模拟 SPA 路由:** 对于使用了 History API 的单页应用（如 React Router, Vue Router 的 history 模式），直接访问子路径（如 http://localhost:3000/about）刷新页面会 404。serve 可以轻松处理：

```
serve -s dist
// or
serve . -s
```



## Nginx代理

上面那个有个大的问题，那就是不能配置反向代理，接下来我们使用本地Nginx来更真实的模拟线上环境（反向代理、静态资源、单页面应用）。

### 下载 Nginx

- 访问 Nginx 官网下载页面：[Nginx 官网](http://nginx.org/)。
- 根据操作系统选择下载版本：
  - **Windows**：下载稳定版本（Stable version），如 `nginx/Windows-1.26.3`1。
  - **MacOS**：使用 Homebrew 安装，执行命令 `brew install nginx`12。
  - **Linux（如 Ubuntu/Debian）**：执行命令 `sudo apt install nginx`23。

### 安装 Nginx

- **Windows**：将下载的压缩包解压到指定目录，如 `D:\nginx`14。
- **MacOS**：Homebrew 会自动安装到 `/opt/homebrew` 目录。
- **Linux**：安装过程中会自动配置相关依赖。

### 启动 Nginx

- **Windows**：进入 Nginx 目录，运行 `start nginx` 命令，或在浏览器访问 `http://localhost` 检查是否启动成功14。
- **MacOS**：执行命令 `nginx` 启动 Nginx1。
- **Linux**：执行命令 `sudo systemctl start nginx` 启动 Nginx24。

### 配置 Nginx

- 配置文件通常位于：
  - **Windows**：`D:\nginx\conf\nginx.conf`
  - **MacOS**：`/opt/homebrew/etc/nginx/nginx.conf`
  - **Linux**：`/etc/nginx/nginx.conf` 或 `/etc/nginx/sites-available/default`
- 修改配置，如监听端口、网站根目录等1345。
- 修改配置后，需要重新加载 Nginx 配置：
  - **Windows**：执行 `nginx -s reload`
  - **MacOS/Linux**：执行 `sudo systemctl reload nginx`



### 扩展

**方法一：重启nginx 服务**

1. **d 命令进入 Nginx 安装目录:**

   ```
   # 示例路径 (请替换为你真实的 Nginx 安装路径)
   cd /e/nginx-1.24.0/
   # 或者
   # cd "E:/nginx-1.24.0/"
   ```

   content_copydownload

   Use code [with caution](https://support.google.com/legal/answer/13505487).Bash

2. **执行命令:** 在 Bash 环境下，即使在当前目录，也最好使用 ./ 来指定执行当前目录下的文件：

   ```
   ./nginx.exe -s reload
   ```

   (在 Windows 原生 cmd/PowerShell 中，通常直接 nginx -s reload 即可)。

**方法二：将 Nginx 目录添加到系统 PATH (一劳永逸)**

这是最方便的长远方法，这样你就可以在任何目录下直接运行 nginx 命令了。

1. **找到 Nginx 安装目录** (例如 E:\nginx-1.24.0)。
2. **添加到 Windows 环境变量:**
   - 在 Windows 搜索栏搜索 "环境变量" 或 "Edit the system environment variables"。
   - 点击 "环境变量..." 按钮。
   - 在 "系统变量" (或 "用户变量"，如果你只想对当前用户生效) 列表中找到名为 Path 的变量，选中它，然后点击 "编辑..."。
   - 点击 "新建"，然后输入你的 Nginx 安装目录的完整路径 (例如 E:\nginx-1.24.0)。
   - 一路点击 "确定" 保存。
3. **重启命令行工具:** **非常重要！** 已经打开的命令行窗口不会加载新的环境变量。你需要**关闭所有**命令行窗口，然后**重新打开一个新的**。
4. **在新窗口中尝试:** 现在你应该可以在任何目录下直接运行 nginx -s reload 了



### 完整配置

```nginx

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


# ... (可能已有的一些全局配置，如 worker_processes, events) ...

http {
    include       mime.types;  
    default_type  application/octet-stream;
    # ... (可能已有的一些 http 级配置，如 include mime.types, default_type, log_format, sendfile, tcp_nopush, keepalive_timeout) ...

    # `gzip` Settings
    gzip  on;                 # 开启gzip功能
    gzip_min_length  1k;      # 响应页数据上限
    gzip_buffers     4 16k;   # 缓存空间大小
    gzip_comp_level 6;        # 设置压缩级别为6
    gzip_types       text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json; # 压缩文件类型
    gzip_disable "MSIE [1-6]\."; # IE 1-6关闭gzip压缩
    gzip_vary on;             # 启用压缩标识

    # 定义一个 server 块来处理你的本地前端应用
    server {
        # 监听端口，80是默认HTTP端口，如果被占用或需要权限，可以换成 8080 或其他
        listen 7283;
        # 监听的域名，本地通常用 localhost
        server_name localhost;

        # 网站根目录，指向你打包后的前端代码目录 (!!!务必修改为你的实际路径!!!)
        root E:/projects/temp/webroot/webroot;

        # 默认首页文件
        index index.html index.htm;

        # === 核心配置：处理前端路由和静态文件 ===
        # 对于所有请求，优先查找精确匹配的文件($uri)，然后是目录($uri/)
        # 如果都找不到，则回退到 /index.html，交给前端路由处理 (SPA关键配置)
        location / {
            root E:/projects/temp/webroot/webroot; # 再次确认这个路径！
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        # === 核心配置：处理 API 代理 ===
        # 匹配所有以 /fontGateway/ 开头的请求
        location /fontGateway/ {
            # 设置代理目标服务器地址 (来自你的 vue.config.js)
            # 注意：这里的目标地址不需要包含 /fontGateway，因为 Nginx location 匹配了这部分
            # Nginx 会将 location 路径 /fontGateway/ 之后的部分追加到 proxy_pass 的地址后面
            # 这正好实现了 pathRewrite: {"^/fontGateway": ""} 的效果
            rewrite '^/fontGateway/(.*)' '/fontGateway/$1' break;
            proxy_pass http://192.168.10.144:9500/; # 注意末尾的 / 很重要

            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            # 其他可选的代理优化配置
            # proxy_connect_timeout 60s;
            # proxy_read_timeout 60s;
            # proxy_send_timeout 60s;
            # proxy_buffering on; # 可以根据需要开启或关闭缓冲
            # proxy_buffer_size 128k;
            # proxy_buffers 4 256k;
            # proxy_busy_buffers_size 256k;
        }

        # 可选：配置错误页面
        # error_page 404 /404.html;
        # location = /40x.html {
        # }
        # error_page 500 502 503 504 /50x.html;
        # location = /50x.html {
        # }
    }

    # 你可以添加其他的 server 块来配置其他本地站点...
    # server {
    #    listen 81;
    #    server_name another.local;
    #    root /path/to/another/project;
    #    ...
    # }

    # ... (可能已有的一些其他 http 级配置) ...
}

# ... (可能已有的一些其他全局配置) ...

```



### 停止代理

**使用完整路径:** (将 E:/nginx-1.24.0/ 替换为你 Nginx 的实际安装路径)

```
# 快速停止
E:/nginx-1.24.0/nginx.exe -s stop
# 或者 (优雅停止)
# E:/nginx-1.24.0/nginx.exe -s quit
```

**相当路径：**

```
./nginx.exe -s quit
```



## 问题：

#### 1.静态资源代理问题

接口成功被代理了，静态文件也成功获取，可就是没有样式。

破案了，是我没配置默认的请求数据流，上面的配置中是已经修复过的版本。

```
    include       mime.types;  
    default_type  application/octet-stream;
```

