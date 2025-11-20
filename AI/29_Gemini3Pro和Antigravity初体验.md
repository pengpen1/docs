<h1 align="center" id="Gemini3Pro和Antigravity初体验">Gemini3Pro和Antigravity初体验</h1>

**概要：** 本章节主包将分享下使用18号晚最新发布的当下最强模型Gemini 3 Pro和Antigravity的初体验。



###  文档

Antigravity文档地址：https://antigravity.google/docs/get-started

Gemini3Pro体验地址：https://aistudio.google.com/



### rule配置

全局/工作空间规则和mcp配置入口在右上角：

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120155603378.png)

老规矩，先找找项目级规则写在哪，文档中没有明说写在哪。我们通过Process Monitor(v4.01)监控下`Antigravity`读的文件可知，项目级别规则应该写在`.gemini/GEMINI.md`里面。

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120155632906.png)

简单验证下：

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120160201235.png)



### 测试

现在我们来测试下`Gemini 3 Pro`对复杂任务的处理能力。

测试项目为常见的后台管理系统项目，由于设计需求，很多页面的编辑和添加是单独的路由和组件，我一直在考虑是否要抽成一个组件，但碍于快节奏的迭代，页面基本都是独立的，这次就让`Gemini 3 Pro`来试着抽离下逻辑吧，展示展示它的强大。

本次用的prompt：

```
我需要你针对项目的重复逻辑/组件进抽离为公共组件，增加可维护性、可阅读性、项目健壮性。
需要注意的是，很多页面的添加和编辑存在交互差异，不能破坏原本的交互逻辑。
---
建议工作流：
1. 阅读路由文件，查看views文件夹下面的组件，列出TODO list
2. 按照TODO，一个页面一个页面的重构
---
开始吧，有需要我补充说明或者验证的地方请直接说明
```

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120160412200.png)

不知道是不是使用人多的原因，`Antigravity`很容易报错中断。先不管了，让他继续执行。

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120160431176.png)

代码变更UI给我的感觉比较中规中矩：

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120160440393.png)

大概花了20分钟完成了两个页面的重构，我运行了下，页面没有报错，添加编辑也是正常的，一遍过确实有实力。封装了`MCPForm.vue`和`ScheduleForm.vue`通用组件，减少了大概1000行代码。

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120160452428.png)



### 扩展

ide做了和chrome的连接，在chrome装它的插件后能够添加visual comment，相当于可视化调前端（让我想起了Trae的内嵌web功能，但是Trae的体验给我感觉一般），看起来还不错。

扩展下载地址：https://chromewebstore.google.com/detail/antigravity-browser-exten/eeijfnjmjelapkebgockoeaadonbchdd



### 对比

来和我最近使用ide对比下吧

| 名称           | 评价                                                         | 整体评分 |
| -------------- | ------------------------------------------------------------ | -------- |
| Antigravity    | 很容易报错中断，导致整体体验达不到断层水准，Gemini3Pro确实强，但是不存在网上说的超越claude 4.5一大截的实力 | ⭐⭐⭐⭐     |
| Curosr         | 业界标杆，无需要多言                                         | ⭐⭐⭐⭐     |
| Trae（国际版） | 最近出的solo模式，让整体使用体验上升了一个档次               | ⭐⭐⭐      |
| Kiro           | 主要是有claude 4.5，模型强                                   | ⭐⭐⭐      |



### 总结

**Gemini 3.0 Pro**在文本理解，视觉分析有不错的突破，但是在代码生成上只是更进一步的水准。

**Antigravity**的使用体验并没有给我很亮眼的感觉，纯靠使用的模型强。容易中断的问题暂且算使用的人很多，等后续再深度评测。
