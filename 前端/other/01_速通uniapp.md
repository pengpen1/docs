<h1 align="center" id="速通uniapp">速通uniapp</h1>

本文将带你从安装环境、项目创建、目录结构、页面路由、组件使用、API 概览、运行调试，到打包发布等全流程，以最精炼的方式快速上手 uni‑app。首先介绍为什么选择 uni‑app 及其核心优势，然后演示如何通过 HBuilderX 和 Vue CLI 两种方式创建项目并理解目录结构；接着深入页面配置与组件用法，再探讨跨平台 API 的调用及条件编译；最后介绍在各类端上的运行、调试和打包发布流程，并附上实用小贴士，助你在最短时间内完成第一个 uni‑app 项目。



## 为什么选择 uni‑app

`uni‑app` 是 DCloud 推出的基于 Vue.js 的跨平台前端框架，开发者编写一套代码，可发布到 iOS、Android、Web（响应式）、以及微信/支付宝/百度/抖音/快应用等多端。
 采用 Vue 语法，无需额外学习成本，且官方维护的插件生态完善，社区资源丰富，适合从 Vue2/Vue3 迁移的前端工程师快速上手。



## 1. 安装与环境配置

### 1.1 使用 HBuilderX（可视化）

1. 从 DCloud 官方下载 HBuilderX 安装包并解压，注意路径及文件名不可包含特殊字符。
2. 运行 HBuilderX，首次使用需在“运行设置”中配置各端开发者工具路径，如微信、支付宝、抖音等。

### 1.2 使用 Vue CLI（命令行）

1. 安装全局脚手架：

   ```
   npm install -g @vue/cli
   ```

2. 创建 uni‑app 正式版项目：

   ```
   vue create -p dcloudio/uni-preset-vue my-project
   ```

   或创建 Alpha 版：

   ```
   vue create -p dcloudio/uni-preset-vue#alpha my-alpha-project
   ```

3. 选择 “hello uni‑app” 模板进行快速体验



## 2. 创建项目

### 2.1 HBuilderX 创建

在 HBuilderX 欢迎页点击“新建 uni‑app”，选择 “Hello uni‑app” 模板，即可生成基本项目结构。

### 2.2 CLI 创建

执行上文 Vue CLI 命令后，脚手架会下载并安装 uni‑app 依赖，生成与 HBuilderX 同样的目录结构及配置文件



## 3. 项目目录结构

一个典型 uni‑app 项目基于 Vue，默认包含以下主要文件夹与配置：

```
text复制编辑/pages           // 页面文件目录
/components      // 可复用组件
/static          // 静态资源
/main.js         // 程序入口
/App.vue         // 根组件
/pages.json      // 页面路由配置
/manifest.json   // 各平台 App、微信小程序等全局配置
```

该结构与普通 Vue 项目类似，新增的 manifest.json 与 pages.json 支持多端特性配置



## 4. 页面与路由

所有页面需在 `/pages.json` 中注册，示例：

```
json复制编辑{
  "pages": [
    {"path":"pages/index/index","style":{"navigationBarTitleText":"首页"}},
    {"path":"pages/logs/logs","style":{"navigationBarTitleText":"日志"}}
  ],
  "globalStyle":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"}
}
```

`pages.json` 决定页面路径、导航栏样式、原生 TabBar 等，全局样式也可在此统一配置。



## 5. 组件使用

uni‑app 内置基础组件（如 `<view>`、`<text>`、`<image>`、`<scroll-view>` 等），无需注册，直接使用；扩展组件则需安装并导入才能使用。
 注意：虽然支持原生 HTML 标签，编译时会自动转换为对应小程序组件，建议习惯性使用 uni‑app 自带组件以保证各端兼容。



## 6. 跨端 API 概览

uni‑app JS API 分为标准 ECMAScript API 与 uni 扩展 API，前者支持所有平台，后者提供跨端能力，如网络请求、媒体、储存等。
 不同平台特有 API 可通过条件编译调用，例如：

```
js复制编辑// #ifdef APP-PLUS
uni.getSystemInfoSync();
// #endif
// #ifdef MP-WEIXIN
wx.login();
// #endif
```



## 7. 运行与调试

在 HBuilderX 中，按 `Ctrl+R` 可快速运行到各端模拟器（微信、支付宝、抖音、360、快应用等），如若自动启动失败，可手动在相应开发者工具中导入项目路径进行预览。
 调试模式下可使用 SourceMap 进行断点调试，错误信息也会在控制台同步显示。



## 8. 打包与发布

### 8.1 原生 App（云端/离线）

- 云端打包：HBuilderX “发行”→“原生App-云端打包”，一键提交打包并下载安装包。
- 离线打包：在“发行”菜单导出本地打包资源，参考离线打包文档进行平台签名与出包操作。

### 8.2 H5

在 manifest.json 可视化界面配置基本路径，点击 “发行”→“网站-H5 手机版” 生成 H5 资源文件，存放在 `unpackage` 目录中，可直接部署至任意静态服务器。

### 8.3 各类小程序

点击 “发行”→“小程序-微信/支付宝/百度/抖音/360/快应用”等，填写 AppID，产出对应平台代码，之后在官方开发者工具里导入、调试、上传、审核、发布标准流程即可。



## 9. 实用小贴士

- 在 CLI 模式下项目自带编译器，升级需手动执行 `npm update` 或更新 `package.json`；HBuilderX 模式则随 IDE 自动升级。
- 如需在 VSCode 等编辑器中获得 `.d.ts` 类型提示，可在项目中执行 `npm i @types/uni-app -D`。
- 使用条件编译根据平台定制体验，如在 App 端使用原生摄像头，在小程序端调用相应小程序 API。
- 推荐结合 uniCloud 实现云函数与数据库能力，加速后端开发。