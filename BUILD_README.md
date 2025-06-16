# Docsify 博客本地化构建指南

你的 docsify 博客现在有两种本地化方案可选择，解决 CDN 访问慢的问题。

## 🚀 方案一：现代化 Vite 构建（推荐）

### 特点
- ✅ 支持热重载开发
- ✅ 现代化构建工具
- ✅ 更好的开发体验
- ✅ 自动优化和压缩
- ✅ ES模块化，更好的性能

### 使用步骤

1. **安装依赖**
```bash
npm install
```

2. **开发模式**
```bash
npm run dev
```
访问 `http://localhost:3000` 进行开发

3. **构建生产版本**
```bash
npm run build
```
生成的文件在 `dist/` 目录

4. **预览生产版本**
```bash
npm run preview
```

### 项目结构
- `public/index.html` - Vite 入口文件
- `src/main.js` - JavaScript 主文件，配置 docsify
- `vite.config.js` - Vite 构建配置

### 部署
将 `dist/` 目录的内容部署到你的服务器即可。

---

## 📦 方案二：传统构建方案

### 特点
- ✅ 配置简单
- ✅ 兼容性好
- ✅ 直接替换现有文件

### 使用步骤

1. **下载 CDN 资源到本地**
```bash
npm run build:traditional
```
这会在 `assets/` 目录下载所有必要的 CDN 资源。

2. **替换 index.html**
```bash
# 备份原文件
cp index.html index-cdn.html.bak

# 使用本地化版本
cp index-traditional.html index.html
```

3. **测试运行**
```bash
npm run serve
```

### 部署
直接将整个项目目录（包含 `assets/` 文件夹）部署到服务器。

---

## 🔧 自定义配置

### 添加新的 CDN 资源
如果需要添加新的 CDN 资源，编辑 `build.js` 文件中的 `cdnResources` 对象：

```javascript
const cdnResources = {
  'your-library.js': 'https://cdn.example.com/your-library.js',
  // ... 其他资源
};
```

### 修改 Vite 配置
编辑 `vite.config.js` 来自定义构建行为，比如修改输出目录、添加插件等。

---

## 🚀 性能优化建议

1. **使用 gzip 压缩**：在服务器启用 gzip 压缩
2. **设置缓存头**：为静态资源设置合适的缓存策略
3. **使用 CDN**：将构建后的静态资源部署到 CDN

---

## 🛠 故障排除

### 问题1：模块加载失败
**解决方案**：确保所有依赖都已正确安装，运行 `npm install`

### 问题2：路径问题
**解决方案**：检查 `vite.config.js` 中的路径配置，确保与你的部署环境匹配

### 问题3：构建后样式丢失
**解决方案**：检查 CSS 文件是否正确复制到输出目录

---

## 📝 注意事项

- 方案一适合需要现代化开发体验的场景
- 方案二适合简单快速的本地化需求
- 两种方案可以并存，根据需要选择使用
- 建议在本地测试后再部署到生产环境

---

## 🔄 迁移现有项目

如果你有现有的 docsify 项目，可以按以下步骤迁移：

1. 复制 `package.json`、`vite.config.js`、`build.js` 到你的项目
2. 运行 `npm install` 安装依赖
3. 根据需要选择构建方案
4. 测试确认所有功能正常

现在你的博客就可以摆脱 CDN 依赖，在任何网络环境下都能快速加载了！🎉 