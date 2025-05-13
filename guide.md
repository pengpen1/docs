# 指南

## 开始

```shell
npm i docsify-cli -g

// 创建并cd并以vscode打开
docsify init ./docs && cd docs && code .

// 预览
docsify serve
```

## 标题

页面的 title 标签是根据所选侧边栏项目名称生成的。为了获得更好的 SEO，您可以通过在文件名后指定字符串来自定义标题。

- [Guide](guide.md "The greatest guide in the world")

## 层级

```shell
npm install -g treer
treer -e ./_tree.txt -i node_modules
```

## emoji

在文章中添加一些表情符号能够增强文章的趣味性 😊，这种表情符号的官方名字叫做 emoji ，来自日语词汇“絵文字”（假名为“えもじ”，读音即 emoji），emoji 的创造者是日本人栗田穰崇。emoji 是一种文本类型的象形符号， 它和图片、表情包不同，它能够在任何文本输入的地方使用，因为它本身就是一种文字。
语法 1：&#xcode; (注意最后的分号 ; 不可少)
语法 2：:emoji: (注意冒号 : 不可少)

[快速查询清单](https://www.webfx.com/tools/emoji-cheat-sheet/)
[中文 emoji 清单](https://www.emojiall.com/zh-hans)

## 获取文章数量

```js
node _media/scripts/count-md-files.js
```

返回示例：

```txt
正在统计文章数量...

- 前端: 17 篇文章
- AI: 20 篇文章
- 后端: 4 篇文章
- 算法: 5 篇文章
- 爬虫: 7 篇文章
- 设计模式: 24 篇文章
- 工具: 1 篇文章
- UI设计: 1 篇文章
- 一些想法: 1 篇文章
- 其他: 9 篇文章

----------------------------------------
总计: 89 篇文章
----------------------------------------

格式化输出：

const articleCounts = {
  frontend: 17,
  ai: 20,
  backend: 4,
  algorithm: 5,
  crawler: 7,
  designpattern: 24,
  tool: 1,
  uidesign: 1,
  thoughts: 1,
  other: 9
};

----------------------------------------
脚本执行完毕。
```
