<h1 align="center" id="electron集成">electron集成</h1>

**概要：** 本章节将介绍主啵如何集成 electron 以及增加些外部库让 electron 开发更便捷。



## 快速开始

依然是朴实无华的新建项目，安装依赖，当然我们也可以用脚手架

```shell
mkdir my-electron-app && cd my-electron-app
npm init
npm install electron --save-dev

# 脚手架
npx create-electron-app@latest my-app --template=webpack
```



## 增加 nodemon

```shell
pnpm instll nodemon --save-dev
```

增加配置文件 nodemon.json

```json
{
  "ignore": ["node_modules", "dist"],
  "restartable": "r",
  "watch": ["*.*"],
  "ext": "html,js,css"
}
```

修改命令行

```json
"scripts": {
    "start": "electron .",
    "dev": "nodemon --exec \"electron .\" --watch . --ext js,html,css",
    "build": "electron-builder"
},
```

我们在`pnpm run dev`，以后修改`html,js,css`，electron 就会自动重启啦，也不用在页面上`ctrl + r`手动刷新页面啦



## 解决 cmd 乱码

### 快速方案

有时候我们会发现 cmd 出现中文乱码的情况

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250607141751.png)

解决方案也简单，在 cmd 中输入`CHCP 65001`，也可以直接改写命令：

```
"dev": "chcp 65001 && nodemon --exec \"electron .\" --watch . --ext js,html,css",
```

> CHCP 是一个计算机指令，能够显示或设置活动代码页编号（65001 UTF-8 代码页、950 繁体中文、936 简体中文默认的 GBK、437 MS-DOS 美国英语）。



### 永久修改

**方案一**

想永久的更改 cmd 编码值需要修改注册表

在运行中通过 regedit 进入注册表

找到 HKEY_CURRENT_USER\Console\%SystemRoot%\_system32_cmd.exe

新建一个 DWORD（32 位值）,命名为 CodePage，值设为 65001

**方案二**

新建一个 cmd.reg

内容输入如下：

```reg
Windows Registry Editor [Version](https://so.csdn.net/so/search?q=Version&spm=1001.2101.3001.7020) 5.00

[HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe]

"CodePage"=dword:0000fde9

"FontFamily"=dword:00000036

"FontWeight"=dword:00000190

"FaceName"="Consolas"

"ScreenBufferSize"=dword:232900d2

"WindowSize"=dword:002b00d2
```

保存之后，双击 cmd.reg 即可



## 上下文不隔离

有些朋友不喜欢多加一层上下文桥梁，可以在配置中关闭上下文隔离，这样就可以直接在渲染进程引入`ipcRenderer`与主进程通信

```
function createWindow() {
  // 创建一个窗口
  const win = new BrowserWindow({
    width: 800, //窗口宽度
    height: 600,//窗口高度
    autoHideMenuBar: true, //自动隐藏菜单栏
    webPreferences: {
      // 配置预加载脚本
      // preload: path.resolve(__dirname, './preload.js'),
      // 启用Node.js集成（存在安全风险）
      nodeIntegration: true,
      contextIsolation: false
    }
  });
```

优点是 页面可以直接使用 Node.js 的核心模块，比如：`fs`, `path`, `child_process` 这些都可以在前端页面中直接使用

```
// 直接使用 Node.js 的核心模块
console.log(require("fs"));
```



### 安全隐患

但是这会带来很大的安全隐患，如果你的页面有一丁点 XSS（例如某个组件可以注入 `<script>`），攻击者就可以这样：

```
require('child_process').exec('rm -rf /'); // 💣 毁灭性命令
```

可以直接读取本地文件、环境变量等：

```
const fs = require('fs');
const secret = fs.readFileSync('/etc/passwd').toString();
```

Electron 原本设计的沙箱隔离会被绕过，页面脚本拥有和主进程等价的权限，任何 `nodeIntegration: true` 的窗口都可能成为攻击目标。

所以还是老老实实开启`contextIsolation`

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250607160210.png)



## electron-vite

electron-vite 是一个新型构建工具，旨在为 Electron 提供更快、更精简的开发体验。它主要由五部分组成：

- 一套构建指令，它使用 Vite 打包你的代码，并且它能够处理 Electron 的独特环境，包括 Node.js 和浏览器环境。

- 集中配置主进程、渲染器和预加载脚本的 Vite 配置，并针对 Electron 的独特环境进行预配置。

- 为渲染器提供快速模块热替换（HMR）支持，为主进程和预加载脚本提供热重载支持，极大地提高了开发效率。

- 优化 Electron 主进程资源处理。

- 使用 V8 字节码保护源代码。


electron-vite 快速、简单且功能强大，旨在开箱即用。

```
npm i electron-vite -D
```

搭建

```
pnpm create @quick-start/electron

#使用模板构建一个 Electron + Vue 项目
pnpm create @quick-start/electron my-app --template vue
pnpm create @quick-start/electron my-app --template vue-ts
```



`package.json` 文件中添加 npm scripts：

```
{
  "scripts": {
    "start": "electron-vite preview", // 开启 Electron 程序预览生产构建
    "dev": "electron-vite dev", // 开启开发服务和 Electron 程序
    "prebuild": "electron-vite build" // 为生产构建代码
  }
}
```

当以命令行方式运行 `electron-vite` 时，electron-vite 将会自动尝试解析项目根目录下名为 `electron.vite.config.js` 的配置文件。最基本的配置文件如下所示：

```
// electron.vite.config.js
export default {
  main: {
    // vite config options
  },
  preload: {
    // vite config options
  },
  renderer: {
    // vite config options
  }
}
```

当使用 electron-vite 打包代码时，Electron 应用程序的入口点应更改为输出目录中的主进程入口文件。默认的输出目录 `outDir` 为 `out`。你的 `package.json` 文件会是这样：

```
{
  "name": "electron-app",
  "version": "1.0.0",
  "main": "./out/main/index.js"
}
```





## 安装失败解决锦囊

### 方案一：清理缓存强制安装

```shell
RequestError: unable to verify the first certificate
```

strict-ssl=false 会解决证书验证问题。
设置环境变量绕过证书验证

```shell
# 在命令行中设置跳过SSL验证（临时）
set NODE_TLS_REJECT_UNAUTHORIZED=0
```

```shell
pnpm install --ignore-scripts
pnpm rebuild electron
```

### 方案二：设置代理

--



## 参考

- [electron-vite](https://cn.electron-vite.org/guide/)
