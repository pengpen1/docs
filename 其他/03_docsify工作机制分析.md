<h1 align="center" id="docsify工作机制分析">docsify工作机制分析</h1>

**概要：** 我现在 md 文档中插入脚本，但是均没有被执行，于是准备研究下 docsify 工作机制，一起来学习下吧。

## 原因分析

1. **docsify 是单页应用（SPA）框架**，它通过 AJAX 异步加载 Markdown 文件内容，然后动态渲染到页面的某个容器（ `<div id="app">`）中。
2. 当 docsify 加载 Markdown 或 HTML 内容时，它是把内容插入到 DOM 中的，而不是直接加载一个完整的 HTML 页面。
3. **浏览器不会自动执行动态插入的 `<script>` 标签中的脚本**。也就是说，如果在 Markdown 或动态加载的 HTML 里写 `<script>...</script>`，这些脚本不会被执行。

## 解决方案

**使用 docsify 提供的钩子执行脚本**

docsify 提供了生命周期钩子，可以在页面渲染完成后执行自定义 JS 代码。

```js
window.$docsify = {
  // 其他配置...
  doneEach: function () {
    console.log("欢迎来到我的二进制世界！");
    // 这里写你想执行的脚本代码
  },
};
```

`doneEach` 会在每次页面渲染完成后调用，适合放置页面初始化脚本。

**把脚本写在 docsify 的全局 JS 文件里**

你可以在项目中创建一个 JS 文件，比如 `main.js`，写入你的脚本：

```js
console.log("欢迎来到我的二进制世界！");
```

然后在 `index.html` 或 docsify 配置中引入：

```html
<script src="main.js"></script>
```

这样脚本会在页面加载时执行。

## 按需加载/执行

```js
        plugins: [
          function (hook, vm) {
            hook.doneEach(function () {
              // 每次路由切换，内容渲染完成执行
              // 针对 Markdown 中的特定标记来加载脚本
              // 例如，在 Markdown 中写：<div data-load-script="path/to/my-script.js"></div>
              const scriptLoaders =
                document.querySelectorAll("[data-load-script]");
              scriptLoaders.forEach((loader) => {
                const scriptSrc = loader.dataset.loadScript;
                const scriptId =
                  "script-" + scriptSrc.replace(/[^a-zA-Z0-9]/g, ""); // 生成唯一ID
                // if (scriptSrc && !document.getElementById(scriptId)) { // 如果用这个则只执行一次
                if (scriptSrc) {
                  var script = document.createElement("script");
                  script.id = scriptId;
                  script.src = scriptSrc;
                  // 如果脚本需要初始化，确保它定义了一个全局函数
                  // script.onload = () => { if(window.initMyScript) window.initMyScript(); };
                  document.body.appendChild(script);
                  // 可以选择移除这个标记，避免下次重复处理
                  // loader.removeAttribute('data-load-script');
                }
              });
            });
          },
        ],
```

使用测试，可打开控制台，查看是否输出`text`

<div data-load-script="../_media/scripts/test.js"></div>

## 全局配置

Docsify 有一个配置项 executeScript，如果设置为 true，它会尝试执行 Markdown 中嵌入的 script 脚本。脚本在全局作用域执行，容易造成变量污染，记得多久留意。

```HTML
<script>
  window.$docsify = {
    // ... 其他配置
    executeScript: true // 允许执行 Markdown 中的脚本
  };
</script>
```

使用测试，可打开控制台，查看是否输出`text2`

<script>
console.log("test2")
</script>
