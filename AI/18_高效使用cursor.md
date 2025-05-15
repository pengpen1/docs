<h1 align="center" id="高效使用cursor">高效使用cursor</h1>

**概要：** 本章节将介绍主啵是如何更高效使用 cursor 的。

## 引言

会使用 tab 补全和 AI chat 其实就已经其实掌握了 cursor 最核心的功能。

> cursor 的 Tab 补全为什么是当前牛的，因为它有多行编辑、光标预测、提示框展示补全信息

## 安装篇

我推荐下载[预览版](https://github.com/oslook/cursor-ai-downloads?tab=readme-ov-file)，因为比稳定版本(官网那的)要多出一些功能，比如之前 think 模式是单独计费，预览版改成了双倍次数，这不妥妥的福利吗。

> 不是，哥们儿，安装都要出教程啊

## 配置篇

先去`Modes`中去掉废物模型，别问为什么，问就是它是按次数收费的

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250515153409608.png)

再去把`Features`中的 Tab 相关功能点满

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250515153552160.png)

其他设置用到再更改，解释下代码库索引：
Cursor 会计算代码库中每个文件的嵌入，并利用这些嵌入来提高代码库答案的准确性（存储向量并支持高效的相似度查询）。打开项目时，每个 Cursor 实例都会初始化该工作区的索引。简单来说把你代码库分割成向量数据库了，先将代码分解成有意义的块，再把每个块被转换成一个数字向量（嵌入）

> 中文呢？目前设置没办法改成中文，其他地方倒是可以安装 Chinese 翻译插件来汉化

## 快捷键篇

`ctrl+ K`和 `ctrl+ l` 分别唤醒两种聊天方式（之前还有个`ctrl+ i` 唤醒 Agent 聊天模式，不过现在都用下面的下拉进行切换）

- `ctrl+ K` 唤醒的是**内联聊天**，可以指定小范围的代码变更，这功能日常是基本是离不开的

- `ctrl+ l` 唤醒的是聊天窗口，我们可以放入各种文件作为上下文进行聊天（放 UI 图谁用谁知道）

点击添加文件那的@可以搜索文件

命令栏输入`/`后会出现更多快捷键，比如将`打开/活动`文件都加入到上下文

右下角可以切换模式，【agent（代理（工具人）模式，自主规划），Ask（询问模式，了解代码块的不会进行更改），Manual（精确的代码更改）】

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250515151529397.png)

## mcp 篇

先把那个联网搜索的`mcp服务器`关掉，现在大模型的训练数据已经很全面优秀了，联网搜索大部分情况只会污染（编写代码方面，其他情况不评论），推荐安装以下 MCP

#### [context7](https://github.com/upstash/context7)

上干货，让 LLM 使用最新文档来编写代码，也就是`读完文档再说`

安装方式很简单，打开 MCP 配置，会跳转到`mcp.json`文件，将配置复制进去，当然，也可以采用手动 nxp 的方式安装

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

使用方式，只需在 prompt 中加上`use context7`，AI 就会基于最新文档生成代码啦，你如果是尊贵的 pro 会员，也可以写在 rule 中，没那么多次数还是需要的时候再用吧

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250515160352624.png)

其他 MCP 安装和使用方式类似，主啵不再赘述

## prompt 篇

这可是真干货，建议记笔记。

#### 重要项目开发

对于开发新项目（比较重要），我们可以分为七个步骤

1. 加载上下文：没上下文，你让 AI 凭空想象吗
2. 描述变更：对于重要项目就别人 AI 直接编辑文件了，让它列出方法，**因为 LLm 的抉择并不总是最优的**
3. 选择方法：选择一种你觉得最好的方法，让他编写（更细的话可以让 AI 提供代码草稿）
4. 审查与学习(可选)：让 AI 解释代码逻辑，爱学习的孩子有福了
5. 测试(重要)：全面测试
6. 寻求建议，重复：询问接下来实现什么的建议，并重复

#### 日常工作

日常工作直接让 AI 仿照其他页面就好，另外好的 prompt 一定是目标明确的，如下：

```txt
@c:\Users\sw\Desktop\内部知识库\接口文档示例 (2).txt
你的任务是，完成数据标注视图DataAnnotationView页面的开发，接下来我将给你描述现状，以及一些必要的说明

------
现状：
数据标注视图页面就两个接口，参数信息放在了接口文档示例 (2).txt里面
我删除了之前的代码，只留下了基本架构，请求在useDataAnnotationViewRequestService.js文件，逻辑和数据处理应该写在useDataAnnotationViewService.js，页面在
DataAnnotationView.vue，组件在DataAnnotationView文件夹下
然后图一是数据标注视图的UI页面，图二是统计报表页面（注意这是另一个页面，因为组件类似，所以复制过来，你可以参考这个页面的写法StatisticsReport）
组件部分，为你提前复制了StatisticsCard.vue、BarChart.vue、LineChart.vue等组件

----
建议工作顺序：
1.读取相关页面，读取接口文档，了解当前状况
2.在useDataAnnotationViewRequestService.js页面定义mock数据，并在useDataAnnotationViewService.js调用接口获取数据
3.完善DataAnnotationView.vue页面，实现页面成功展示假数据，且布局符合UI图设计
```

## rule 篇

分为全局 rule 和项目级 rule。

命令栏输入`/`，选择`Generate Cursor Rules`可以让 cursor 给你定制规则。

> AI 给 AI 定制规则 == 牛马给牛马定制规则 ？

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250515160910279.png)

#### 全局

打开设置，找到 Rules，在这里设置规则，分享一个毕竟通用的规则，主要是做工作流规划的，可以理解为 think 模式扩展包。[点击前往](/AI/AGENT_EXECUTION_PROTOCOL_CN.md)

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250515162259231.png)

#### 项目级

在项目的 .cursor/rules 目录下可以创建不同规则的文件。
每个规则文件均以 MDC ( .mdc ) 编写

| Rule Type 规则类型 | Description 描述                                                                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Always             | Always included in the model context<br>始终包含在模型上下文中                                                                                     |
| Auto Attached      | Included when files matching a glob pattern are referenced<br>当引用与 glob 模式匹配的文件时包含                                                   |
| Agent Requested    | Rule is available to the AI, which decides whether to include it. Must provide a description<br>规则可供 AI 使用，由 AI 决定是否纳入。必须提供描述 |
| Manual             | Only included when explicitly mentioned using @ruleName<br>仅在使用 @ruleName 明确提及时才包含                                                     |

例子：这是我博客项目的规则配置，用的`Auto Attached`类型，就是当我指定要阅读或者修改的文件类型是.html,.js(可配置)时，就会附加这些规则。

![rule](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250515174423688.png)

再附上一个通用规则：

```txt
# Cursor notta web 编码规范指南

你是以下技术栈的专家：
- TypeScript
- Node.js
- React
- Vite
- Rspack
- Ant Design v4
- React Router DOM v6
- lodash-es v4
- chrome extension v3

### 核心原则：

- 编写简洁、技术性的响应，并提供准确的 TypeScript 示例
- 使用函数式、声明式编程，避免使用类
- 优先使用迭代和模块化，而不是代码重复定义
- 使用描述性变量名，包含助动词（如 isLoading）
- 目录使用小写字母加横线（如 components/auth-wizard）
- 组件优先使用命名导出
- 使用接收对象返回对象（RORO）模式

### JavaScript/TypeScript 规范：

- 纯函数使用 "function" 关键字。省略分号
- 所有代码都使用 TypeScript。优先使用接口（interface）而不是类型（type）
- 文件结构：导出组件、子组件、辅助函数、静态内容、类型定义
- 条件语句中避免不必要的大括号
- 单行条件语句省略大括号
- 简单条件语句使用简洁的单行语法（如 if (condition) doSomething()）
- 工具函数若 lodash-es 有提供则尽量复用，避免重复定义
- 禁止三元表达式嵌套，使用阅读性更好的条件语句
- if-else 过多时优化为 map 设计

### 错误处理优先级：
- 在函数开始处处理错误和边界情况
- 对错误条件使用提前返回，避免深层嵌套的 if 语句
- 将正常执行路径放在函数末尾以提高可读性
- 避免不必要的 else 语句；使用 if-return 模式
- 使用守卫子句尽早处理前置条件和无效状态
- 实现适当的错误日志记录和用户友好的错误消息
- 考虑使用自定义错误类型或错误工厂以保持错误处理的一致性

### 依赖项：
- React v17
- Ant Design v4
- Rspack
- React Router DOM v6

### React/Next.js 规范：

- 使用函数组件和 TypeScript 接口
- 使用声明式 JSX
- 组件使用 function 而不是 const 声明
- 使用 Ant Design v4 进行组件开发和样式设计
- 采用移动优先的响应式设计方法
- 静态内容和接口放在文件末尾
- 静态内容变量放在渲染函数外
- 最小化 'use client'、'useEffect' 和 'setState' 的使用。优先使用 RSC
- 使用 Suspense 包装客户端组件并提供 fallback
- 非关键组件使用动态加载
- 图片优化：WebP 格式、尺寸数据、懒加载

### 关键约定：

1. 依赖 React Router DOM 进行状态变更
2. 优先考虑 Web Vitals（LCP、CLS、FID）
```

## 知识库篇

我们可以提炼出项目中的经典功能实现当知识库喂给 LLM，对于老项目来说不要太爽。

## 参考

- [cursor 文档](https://docs.cursor.com/context/model-context-protocol)
