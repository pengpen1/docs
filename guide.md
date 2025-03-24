# 指南

## 开始
```
npm i docsify-cli -g

// 创建并cd并以vscode打开
docsify init ./docs && cd docs && code .

// 预览
docsify serve
```

## 标题
页面的 title 标签是根据所选侧边栏项目名称生成的。为了获得更好的 SEO，您可以通过在文件名后指定字符串来自定义标题。
* [Guide](guide.md "The greatest guide in the world")


## 层级
```
npm install -g treer
treer -e ./_tree.txt -i node_modules
```