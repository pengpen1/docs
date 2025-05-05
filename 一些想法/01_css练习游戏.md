<h1 align="center" id="css练习游戏">css练习游戏</h1>

**概要：** 我想实现个练习css的网站。

## css-practice-game：

- 类似于闯关游戏，从简单的开始，逐渐增加难度，用户可以选择关卡，将css的布局技巧都一一体现(浮动、定位、flex、grid等等)
- 每个关卡都可以基于不同的 CSS 技巧设计，难度逐渐增加。比如：

  - 初级（1-5关）：简单的盒子模型、浮动布局、伪类；示例关卡1：（盒子模型：给定一个容器，要求使用 CSS 中的伪类设置其宽高、边距、内边距等）
  - 中级（6-15关）：Flexbox、Grid布局；示例关卡6（Grid 布局：让用户完成一个两行三列的复杂布局）
  - 高级（16-25关）：响应式设计、动画、特效、伪元素特效；示例关卡16（制作一个响应式菜单：使用媒体查询，制作一个可以在移动端收缩的导航菜单）
  - 进阶（26-30关）：CSS变量、前端性能优化等；示例关卡26（制作色轮：CSS 实现一个色轮组件）
- 右上角给出最终效果（在考虑是用图片还是直接渲染），中间是展示区，下面是代码区(实时渲染到展示区，支持代码高亮，支持代码提示，支持点击按钮格式化代码)
- 当用户书写完毕点击提交按钮，出现从上到下的检测光标，然后运行代码，检测是否通过（根据需要补充交互）
- 技术栈（暂时，根据需要补充）：

  - 前端框架: React+Ts
  - 状态管理: zustand
  - 代码高亮: prismjs
  - UI框架: Material-UI
  - 代码格式化： Prettier
  - 实时渲染：直接使用 iframe 来渲染用户输入的 CSS，可以动态更新其内容 || 或者其他好的开源库
  - 动画与过渡：framer-motion
  - 后端？：看是否需要后端，如果需要Node.js + Express都行


已操作步骤

```
npx create-react-app css-practice-game --template typescript
npm install framer-motion
npm install zustand
npm install prettier
npm install @mui/icons-material
npm install @fontsource/roboto
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @mui/material @emotion/react @emotion/styled
npm install @monaco-editor/react
npm install react-i18next i18next i18next-browser-languagedetector --legacy-peer-deps
```

当前遇到的问题
依赖冲突：
TypeScript 之后，又遇到了反向的依赖冲突。这次是 react-scripts (来自 create-react-app) 要求 TypeScript 版本 4
i18next 的新版本需要 TypeScript 5

如何解决：
```
--legacy-peer-deps
```