# HTML5 新增内容

**HTML5 是 HTML 的第五次重大更新**，引入了一系列新的元素和属性，旨在提高网页的语义化、交互性和性能。

### **语义化元素（HTML5 新增）**

1. **结构标签**：
   - `<header>`、`<footer>`：页眉/页脚。
   - `<nav>`：导航链接。
   - `<section>`：文档中的独立区块。
   - `<article>`：独立内容（如博客文章）。
   - `<aside>`：侧边栏或附属内容。
   - `<main>`：页面主内容（唯一性）。
   - `<figure>` 和 `<figcaption>`：媒体内容及其标题。
2. **文本语义**：
   - `<time datetime="YYYY-MM-DD">`：机器可读的时间。
   - `<mark>`：高亮文本。
   - `<progress>` 和 `<meter>`：进度条和度量值。

### **响应式与媒体处理**

1. **图片优化**：

   - `srcset` 和 `sizes`：

     ```
     <img src="small.jpg"
          srcset="medium.jpg 800w, large.jpg 1200w"
          sizes="(max-width: 600px) 100vw, 50vw">
     ```

     - `w` 描述符表示图片宽度，`x` 描述符表示像素密度。

   - **`<picture>` 元素**：根据条件加载不同图片：

     ```
     <picture>
       <source media="(min-width: 800px)" srcset="large.jpg">
       <source media="(min-width: 400px)" srcset="medium.jpg">
       <img src="small.jpg">
     </picture>
     ```

2. **视频与音频**：

   - `<video controls preload="metadata">`：`preload` 控制预加载行为。
   - `<audio loop>`：循环播放。
   - `<track>`：字幕或章节（`kind="subtitles"`）。

### **表单增强**

1. **输入类型**：
   - `type="email"`、`type="tel"`、`type="date"`：浏览器内置验证。
   - `type="search"`：搜索框。
   - `type="range"`：滑动条（结合 `min`、`max`、`step`）。
2. **属性**：
   - `required`：必填字段。
   - `placeholder`：输入提示。
   - `autocomplete="on/off"`：自动填充。
   - `pattern="[A-Za-z]{3}"`：正则验证。
   - `formnovalidate`：提交时跳过验证。

### **性能与 SEO 优化**

1. **资源加载**：
   - `<script defer>`：延迟执行（不阻塞渲染）。
   - `<script async>`：异步加载（适用于独立脚本）。
   - `<link rel="preload">`：预加载关键资源。
   - `loading="lazy"`（图片/iframe）：延迟加载。
2. **SEO 与元数据**：
   - `<meta charset="UTF-8">`：字符编码。
   - `<meta name="viewport" content="width=device-width">`：移动端适配。
   - `<meta name="description">`：页面描述。
   - **结构化数据**：使用 `schema.org` 或微数据（`itemprop`）。

### **交互与可访问性**

1. **交互元素**：
   - `<details>` 和 `<summary>`：折叠内容。
   - `<dialog>`：模态对话框（需 JavaScript 控制显示）。
2. **ARIA 属性**：
   - `role="button"`：定义元素角色。
   - `aria-label`：为无文本元素提供标签。
   - `aria-labelledby`：关联标签元素。

### **全局常用属性**

1. **数据存储**：
   - `data-*`：自定义数据属性（如 `data-user-id="123"`）。
2. **其他**：
   - `contenteditable="true"`：使元素可编辑。
   - `hidden`：隐藏元素（等效于 `display: none`）。
   - `tabindex`：控制 Tab 键顺序（`tabindex="-1"` 移出顺序）。

### **安全相关**

- `<a target="_blank" rel="noopener noreferrer">`：防止新页面通过 `window.opener` 访问原页面。
- `<iframe sandbox="allow-scripts">`：限制 iframe 权限。

### 关联考点

1. **响应式图片**：`srcset` 和 `sizes` 的工作原理？`<picture>` 与 `<img srcset>` 的区别？
2. **脚本加载**：`defer` 和 `async` 的区别？
3. **语义化**：为何使用 `<article>` 而不是 `<div>`？
4. **表单验证**：如何自定义 `pattern` 的正则规则？
5. **可访问性**：如何为屏幕阅读器优化页面？
