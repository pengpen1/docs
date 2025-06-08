<h1 align="center" id="代理和vpn杂谈">代理和VPN杂谈</h1>

<p align="center"><i>理解原理，加速开发</i></p>

[TOC]

**概要：** 在日常开发中，我们经常因网络原因，在下载依赖、克隆仓库、安装工具时遇到速度缓慢或无法访问的问题。本次将从代理 (Proxy) 和 VPN 的区别开始，剖析其工作原理，最后结合实际场景，介绍如何利用它们或镜像源来加速 `git` 以及 `playwright install` 等开发操作。

## 代理 (Proxy) 和 VPN 的核心区别

理解两者的区别，是正确选择和配置工具的关键。它们都能改变你的出口 IP、访问受限资源，但工作方式和目的侧重点大不相同。

### 1. 代理 (Proxy)

- **比喻**：一个中转站 / 传话筒 / 助理。你告诉助理（代理服务器）你要访问网站 A，助代替你去访问 A，然后把结果拿回来给你。
- **工作原理**：
  - 主要工作在**应用层** (Application Layer)。
  - 它拦截并转发**特定应用程序或特定协议**的流量请求。
  - 你需要单独配置每个需要使用代理的应用程序（例如：浏览器、Git、终端环境变量）。
- **常见类型**：
  - `HTTP/HTTPS 代理`: 仅处理 HTTP 和 HTTPS 协议的请求。
  - `SOCKS5 代理`: 工作在更底层（会话层），更通用，不关心应用层协议，理论上可以转发任何基于 TCP/UDP 的流量 (如 HTTP, FTP, SMTP, SSH, 游戏等)。
- **加密**：代理服务器本身**不一定**加密你到代理服务器之间的数据（HTTPS 请求内容本身是端到端加密的，但代理服务器可以看到你要访问哪个域名；HTTP 请求内容对代理服务器是可见的）。
- **主要目的**： 缓存、内容过滤、匿名化（针对特定应用）、访问控制、负载均衡、加速访问。

### 2. VPN (Virtual Private Network - 虚拟专用网络)

- **比喻**：在公共互联网上，为你和目标服务器之间，挖一条专属、加密的**地下隧道**。你所有的交通工具（所有应用的数据）都从这个隧道通过。
- **工作原理**：
  - 主要工作在更底层的**网络层/传输层** (Network/Transport Layer)。
  - 它通常在操作系统层面创建一个虚拟网卡。
  - 一旦连接，它会路由你计算机上**所有应用程序**的网络流量，通过加密隧道发送到 VPN 服务器，再由 VPN 服务器访问目标。
- **常见协议**: OpenVPN, WireGuard, L2TP/IPSec, IKEv2。
- **加密**：**加密**是 VPN 的核心功能。它加密从你设备到 VPN 服务器之间的**所有**网络数据，防止 ISP（互联网服务提供商）或公共 WiFi 中的第三方监听。
- **主要目的**：安全（加密所有流量）、隐私保护、远程安全接入（如连接公司内网）、全局改变网络环境。

### 3. 关键区别对比表

| 特性         | 代理 (Proxy)                                    | VPN (Virtual Private Network)              |
| :----------- | :---------------------------------------------- | :----------------------------------------- |
| **工作层面** | 应用层 / 会话层 (SOCKS)                         | 网络层 / 操作系统级                        |
| **作用范围** | 需配置的**单个/部分**应用或协议                 | 系统**全局**，所有应用                     |
| **加密**     | 不保证本机到代理服务器间的加密；可看到明文 HTTP | **加密**本机到 VPN 服务器间的**所有**流量  |
| **隐私安全** | 较低，隐藏特定应用 IP，ISP 仍可能知道你在用代理 | 较高，加密隧道，对 ISP 隐藏访问内容        |
| **配置方式** | 需在每个应用或环境变量中单独配置                | 通常安装客户端，一次连接，全局生效         |
| **速度影响** | 通常开销较小，但取决于代理服务器质量            | 加密解密有一定开销，取决于服务器和协议     |
| **典型应用** | 抓包分析(Fiddler)、下载加速、应用级访问控制     | 远程办公、公共 WiFi 安全、全局网络环境切换 |
| **形象比喻** | 传话筒 / 中转站                                 | 加密隧道                                   |

> **关于 "机场" 客户端 (Clash, V2RayN 等):**
> 它们连接的服务器通常基于 Shadowsocks, VMess, Trojan 等协议，本质上属于（加密）代理技术。但这些客户端软件功能强大，它们连接服务器后：
>
> 1.  可在本地 `127.0.0.1` 开放 `HTTP/SOCKS5` 代理端口，供其他应用按【代理】方式配置使用。
> 2.  可开启 "系统代理" 或 "TUN 模式"，劫持/路由系统流量，达到类似【VPN】的全局效果。
>     所以，我们常说的 "开 VPN"，很多时候是指使用这类客户端的全局模式。

## 开发者场景：加速实战

前提：你已经有一个可用的 VPN 服务，或代理服务（及其客户端），并且客户端已运行：

- 要么开启了**全局模式/系统代理/TUN 模式**。
- 要么在本地开放了代理端口，例如：
  - HTTP 代理: `http://127.0.0.1:7890`
  - SOCKS5 代理: `socks5://127.0.0.1:1080`
  - _(请务必替换为你客户端实际的协议和端口！)_

以下是几种配置方式：

### 方式一：全局模式 (VPN / 客户端 TUN 模式)

- **原理**: 利用 VPN 或客户端的全局/TUN 模式，在系统层面接管所有流量。
- **操作**: 启动你的 VPN 客户端，连接服务器，并设置为全局模式。
- **效果**:
  - ✅ `git clone/push/pull` (HTTPS 和 SSH 协议均可) 自动加速。
  - ✅ `playwright install` 自动加速。
  - ✅ `npm install`, `pip install`, `poetry add`, `curl`, 浏览器等所有网络请求自动加速。
- **优点**: 一次配置，全部生效，最简单。
- **缺点**: 所有流量都走代理，访问国内网站可能变慢或受限；有时你只想让特定工具走代理。

主包选择的就是使用TUN模式，有些小伙伴使用TUN模式会发现网络无法连接，延迟那一直是-1，这种情况，可以试试更新sing_box模块即可解决，或者试试在设置中将stack更改为system。

> stack用于指定网络协议栈的实现方式 
>
> system 默认值，使用操作系统自身的 TCP/IP 协议栈（即普通 socket）
>
> gvisor 使用 [gVisor](https://gvisor.dev/) 虚拟化的用户态协议栈（由 Google 开发，提供隔离和沙箱特性）

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250608222941.png)



### 方式二：配置终端环境变量 (代理模式)

- **原理**: 设置 `HTTP_PROXY` 和 `HTTPS_PROXY` 环境变量，支持这些变量的命令行工具 (curl, wget, pip, npm, playwright, git 等) 会自动使用代理。
- **操作**: (以本地 HTTP 代理 `http://127.0.0.1:7890` 为例, SOCKS5 同理 `socks5://127.0.0.1:1080`)
  - **Linux / macOS / Git Bash (临时，当前窗口有效):**
  ```bash
   export HTTP_PROXY=http://127.0.0.1:7890
   export HTTPS_PROXY=http://127.0.0.1:7890
   # 可选：排除本地和内网地址
   export NO_PROXY="localhost,127.0.0.1,.internal.net"
  
   # 验证
   curl ipinfo.io
   # 执行命令
   git clone https://...
   poetry run python -m playwright install chromium
  
   # 取消
   unset HTTP_PROXY
   unset HTTPS_PROXY
   unset NO_PROXY
  ```
  - **Windows CMD (临时):**


      ```cmd
       set HTTP_PROXY=http://127.0.0.1:7890
       set HTTPS_PROXY=http://127.0.0.1:7890
       set NO_PROXY="localhost,127.0.0.1"
       :: 验证 & 执行 & 取消(set VAR=)
      ```
  - **Windows PowerShell (临时):**
    ```powershell
     $env:HTTP_PROXY="http://127.0.0.1:7890"
     $env:HTTPS_PROXY="http://127.0.0.1:7890"
     $env:NO_PROXY="localhost,127.0.0.1"
     # 验证 & 执行 & 取消($env:VAR="")
    ```
- **效果**:
  - ✅ `git clone/push/pull` ( **仅限 HTTPS** 协议 `https://github.com/...`) 加速。
  - ✅ `playwright install` 加速。
  - ✅ `npm install`, `pip install`, `curl` 等加速。
  - ❌ `git` 的 **SSH 协议** (`git@github.com:...`) **无效**！
- **优点**: 仅对当前终端会话生效，控制粒度细。
- **缺点**: 每次开新窗口需重设（除非写入 `.bashrc`/系统环境变量）；对 Git SSH 无效。

### 方式三：Git 专项加速配置 (代理模式)

- **原理**: 直接修改 Git 配置文件，比环境变量更可靠。
- **操作**: (以本地 HTTP 代理 `http://127.0.0.1:7890` 为例)
- **配置全局代理 (HTTPS):**
  ```bash
  # 使用 HTTP 代理
  git config --global http.proxy http://127.0.0.1:7890
  git config --global https.proxy http://127.0.0.1:7890
  # 或使用 SOCKS5 代理
  # git config --global http.proxy socks5://127.0.0.1:1080
  # git config --global https.proxy socks5://127.0.0.1:1080
  ```
- **查看配置:**
  ```bash
  git config --global --get http.proxy
  git config --global --list
  ```
- **取消配置:**
  ```bash
   git config --global --unset http.proxy
   git config --global --unset https.proxy
  ```
- **❗ 处理 Git SSH 协议 (`git@github.com:...`)**:
  上述配置对 SSH 协议**无效**。最简单的办法是将仓库地址切换为 HTTPS:
  ```bash
   # 进入仓库目录
   # 查看当前地址
   git remote -v
   # 切换为 HTTPS 地址
   git remote set-url origin https://github.com/你的用户名/你的仓库名.git
  ```
  切换后，上面的 `http.proxy` 配置即可生效。 (配置 SSH 的`ProxyCommand` 较复杂，不赘述)。
- **效果**:
  - ✅ `git clone/push/pull` (配置后，仅限 **HTTPS** 协议) 稳定加速。
  - ❌ `playwright install`, `npm`, `pip` 等不受此配置影响。
  - ❌ `git` 的 **SSH 协议** 无效（除非切换 URL 或配置 SSH ProxyCommand）。
- **优点**: 仅针对 Git，配置持久化，不影响其他工具。
- **缺点**: 仅限 Git，且需注意协议。

### 方式四：Playwright Install 专项加速 (镜像源 - 强烈推荐)

- **背景**:
  - `playwright install` 会下载与其版本匹配的特定浏览器内核 (Chromium, Firefox, WebKit) 和 FFMPEG，以保证环境一致性。
  - 默认下载源 `https://playwright.azureedge.net/` 在某些地区访问很慢。
- **原理**: 代理是让请求绕路；而**镜像源 (Mirror)** 是将文件直接放在离你网络更近的服务器上。对于纯下载场景，镜像源通常比代理更快、更直接。
- **操作**: 设置环境变量 `PLAYWRIGHT_DOWNLOAD_HOST` 指向国内镜像源 (例如淘宝镜像)。

  ```bash
   # Linux / macOS / Git Bash 示例
   export PLAYWRIGHT_DOWNLOAD_HOST=https://npm.taobao.org/mirrors/playwright/
   # 确保清理之前失败的缓存（如 ~/.cache/ms-playwright 或 AppData\Local\ms-playwright）
   poetry run python -m playwright install chromium

   # 或者单行执行
   # PLAYWRIGHT_DOWNLOAD_HOST=https://npm.taobao.org/mirrors/playwright/ poetry run python -m playwright install chromium

   # Windows CMD / PowerShell 设置环境变量方法参考方式二
  ```

- **效果**:
  - ✅ 仅 `playwright install` 的下载过程从镜像源获取，速度通常有数量级提升。
  - ❌ 不影响 `git`, `npm`, `pip` 等。
- **优点**: 针对性强，对于下载浏览器内核，这往往是**最快、最有效**的方法，甚至无需开启代理客户端。
- **缺点**: 仅作用于 Playwright 下载。

## ⚠️ 注意事项

1.  **安全性**: 切勿使用来路不明的免费代理或 VPN，你的所有流量都经过它，存在数据泄露和中间人攻击风险。
2.  **NO_PROXY**: 使用环境变量代理时，建议设置 `NO_PROXY` 环境变量，排除 `localhost`, `127.0.0.1` 以及公司内网域名等，避免访问本地/内部服务时也走代理。
3.  **代理客户端必须运行**: 使用方式二、三时，提供本地端口的代理客户端（如 Clash, V2RayN）必须处于运行状态。
4.  **镜像源 vs 代理**: 对于 `npm`, `pip`, `playwright` 等包/资源下载，优先考虑配置国内镜像源 (`npm config set registry`, `pip config set global.index-url`, `PLAYWRIGHT_DOWNLOAD_HOST`)，它们通常比走代理更快。代理主要用于解决「无法访问」的问题，镜像源主要解决「下载慢」的问题。
5.  **Git 协议**: 牢记 HTTP(S) 代理配置对 Git SSH 协议无效。

## 总结

- **VPN** 提供系统级的、加密的、全局的网络通道，重在安全和全局性。
- **代理** 提供应用级的、特定协议的流量转发，重在灵活性和针对性。
- 开发加速：
  - 图省事：开全局 VPN / 客户端 TUN 模式。
  - 只加速 Git (HTTPS)：用 `git config --global http.proxy`。
  - 只加速 Playwright 下载： 用 `PLAYWRIGHT_DOWNLOAD_HOST` 设置镜像源 (首选)。
  - 通用命令行工具加速：临时设置 `HTTP_PROXY`/`HTTPS_PROXY` 环境变量。

理解原理，根据实际需求（全局 vs 局部，安全 vs 速度，访问 vs 下载），选择最合适的工具和配置方法，能极大地提升开发效率。
