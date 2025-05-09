<h1 align="center" id="检索内容增强(RAG)">检索内容增强(RAG)</h1>

**概要：**在这篇记录中，学习私域聊天机器人是如何工作的，以及什么是检索内容增强(RAG)。



原文：[How do domain-specific chatbots work? An Overview of Retrieval Augmented Generation (RAG)](https://scriv.ai/guides/retrieval-augmented-generation-overview/) —— scriv.ai. Aug 23, 2023.



有一个名为 [LangChain](https://python.langchain.com/) 的流行开源库，它可以创建聊天机器人，其中包括用 3 行代码对任何网站/文档进行问答。这是 [LangChain 文档中的一个示例](https://python.langchain.com/docs/use_cases/question_answering/)。

```python
from langchain.document_loaders import WebBaseLoader
from langchain.indexes import VectorstoreIndexCreator

loader = WebBaseLoader("http://www.paulgraham.com/greatwork.html")
index = VectorstoreIndexCreator().from_loaders([loader])
index.query("What should I work on?")
```

它输出特定于 Paul Graham 文章的答案：

The work you choose should ideally have three qualities: it should be something you have a natural aptitude for, something you have a deep interest in, and something that offers scope to do great work. If you're unsure, you could start by working on your own projects that seem excitingly ambitious to you. It's also beneficial to be curious, try lots of things, meet lots of people, read lots of books, and ask lots of questions. When in doubt, optimize for interestingness. It's okay to guess and be wrong sometimes, as this can lead to discovering what you're truly good at or interested in.

到底是如何工作的？

答案是一个称为检索增强生成（Retrieval Augmented Generation）的过程，简称 RAG。这是一个非常简单的概念，但其实现细节也具有令人难以置信的深度。

这篇文章将提供 RAG 的高级概述。我们将从正在发生的事情的整体工作流程开始，然后放大所有单独的部分。到最后，您应该对这三行神奇代码的工作原理以及创建这些问答机器人所涉及的所有原理有一个深入的了解。

如果您是一名尝试构建这样的机器人的开发人员，您将学到您可以调整哪些旋钮以及如何调整它们。如果您是一名非开发人员，希望在数据集上使用人工智能工具，您将获得有助于您充分利用这些工具的知识。而且，如果您只是一个好奇的人，您有望对一些正在颠覆我们生活的技术了解一两件事。

让我们深入了解一下。



## 什么是检索增强生成？

检索增强生成（Retrieval Augmented Generation, RAG）是用从其他地方检索到的附加信息来补充用户输入到聊天 GPT 等**大型语言模型（Large Language Models, LLM）**的过程。LLM 本身是[深度学习](/AI/01b_深度学习基础)领域，特别是[自然语言处理 (NLP)](/AI/01c_NLP基础) 领域的重要成果。然后，LLM 可以使用检索到的信息来增强其生成的响应。

下图显示了 RAG 在实践中的工作原理：

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250410105007319.png)

它从用户的问题开始。例如“How do I do <something>?”

首先发生的是**检索 (Retrieval)** 步骤。这是接受用户问题并从知识库中搜索可能回答该问题的最相关内容的过程。这一步通常涉及将问题和知识库文档转换为**向量嵌入 (Vector Embeddings)**（一种源于 [NLP](/AI/01c_NLP基础?id=_32-分布式表示-词嵌入-distributed-representations-word-embeddings) 和 [深度学习](/AI/01b_深度学习基础)的技术），然后在向量空间中进行相似性搜索。检索步骤是迄今为止 RAG 链中最重要、最复杂的部分。但现在，想象一下一个黑匣子，它知道如何提取与用户查询相关的最佳相关信息块。

**为什么需要检索，而不是直接给 LLM 整个知识库？**

您可能想知道为什么我们费心检索而不是只将整个知识库发送给 LLM。原因之一是模型对一次可以消耗的文本量有内置的限制（尽管这些限制正在迅速增加）。第二个原因是成本 —— 发送大量文本会变得相当昂贵。最后，有证据表明发送少量相关信息会得到更好的答案。

一旦我们从知识库中获取了相关信息，我们就会将其（作为上下文 Context）与用户的原始问题一起发送到大型语言模型（LLM）。 LLM（如 ChatGPT）然后“读取”所提供的上下文信息并结合自身知识来生成最终答案。这是**增强生成 (Augmented Generation)** 步骤。



## 其他方案

我们当然可以不使用向量知识库，直接将我们的内容发送给LLM，然后再提出问题，就像这样：

<blockquote>ChatGPT，我将给你一段内容，阅读它，并回答我之后提出的问题</blockquote>

这样做当然没问题，但是这种做法太考验prompt是否清晰，更偏向于[提示词工程](/AI/14_提示词工程)。



**核心区别**

- **RAG知识库 (Retrieval Augmented Generation):** 这种方法首先将用户的查询与一个外部的、预先建立好的知识库进行匹配，检索出最相关的几段信息。然后，这些检索到的信息连同用户的原始查询一起被整合到一个新的提示中，并发送给LLM。LLM基于这些提供的上下文信息来生成答案。简单来说，RAG是“先检索，后生成”，LLM利用的是经过筛选的、来自特定知识源的信息。
- **直接将内容发给LLM:** 这种方法是将所有相关的背景信息直接包含在用户向LLM发出的提示中。LLM完全依赖于其预训练时获得的内部知识以及提示中明确提供的这些上下文信息来作答。这通常被称为“提示工程”的一部分，重点在于如何构建一个信息丰富且结构清晰的提示。虽然说可以将所有的背景信息和相关prompt直接放入system级指令中来避免提示词不够清晰的问题，但是这样做，过于消耗资源。



## 检索步骤

从本质上讲，检索是一种搜索操作 —— 我们希望根据用户的输入查找最相关的信息。就像搜索一样，有两个主要部分：

1. 索引：将您的知识库变成可以搜索/查询的内容。
2. 查询：从搜索词中提取最相关的知识。

当今大多数 RAG 系统都依赖于语义搜索，它使用人工智能技术的另一个核心部分：Embedding（嵌入）。

**什么是嵌入？**

LLM 很奇怪。他们最奇怪的事情之一是没有人真正知道他们如何理解语言。嵌入是这个故事的重要组成部分。

在我们大脑深处的某个地方，有一个复杂的结构，它知道“child”和“kid”基本上是相同的，“红色”和“绿色”都是颜色，“高兴”、“快乐”和“兴高采烈”代表着相同的情绪，但程度不同。我们无法解释它是如何工作的，我们只是知道它。

语言模型对语言有类似的复杂理解，只不过，因为它们是计算机，所以它不在它们的大脑中，而是由数字组成。在大语言模型的世界中，任何人类语言都可以表示为**数字向量**（列表）。这个数字向量就是一个**嵌入**。

LLM 技术的一个关键部分是从人类文字语言到人工智能数字语言的翻译器，我们将这个翻译器称为“嵌入机”。

文本通过Embedding Machine（嵌入机）转换为Vectors of Numbers（数字向量）。

<blockquote>
我喜欢你-> Embedding Machine ->[3,11,55,48,21,...19]
</blockquote>

这些数字意味着什么？没有人知道！它们只对人工智能“有意义”。但是，我们所知道的是，相似的单词最终会得到相似的数字组。因为在幕后，人工智能使用这些数字来“阅读”和“说话”。因此，这些数字在人工智能语言中融入了某种神奇的理解力，即使我们无法理解它。



现在，既然我们有了这些神奇的 AI 数字，我们就可以绘制它们。上述示例的简化图可能看起来像这样 —— 其中轴只是人类/人工智能语言的一些抽象表示：

![img](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250508111412668.png)

一旦我们绘制了它们，我们就可以看到，在这个假设的语言空间中，两点彼此越接近，它们就越相似。 “你好吗？”和“嘿，怎么样？”实际上是互相叠加的。另一种问候语“早上好”与这些问候语相距不远。而“我喜欢纸杯蛋糕”则位于一个与其他完全不同的岛屿上。

当然，你无法在二维图上表示整个人类语言，但理论是相同的。实际上，嵌入有更多的坐标（OpenAI 当前使用的模型有 1,536 个）。但您仍然可以进行基本数学计算来确定两个嵌入（以及两段文本）彼此之间的接近程度。

**这些嵌入和确定接近度是语义搜索背后的核心原则，为检索步骤提供动力。**



## 通过嵌入找到最相关的知识片段

首先我们必须将知识库分解为文本块。

之后，我们将每个知识片段通过嵌入机器（实际上是 OpenAI API 或类似机器）传递，并返回该文本的嵌入表示。然后，我们保存该片段以及向量数据库中的嵌入，该数据库针对数字向量进行了优化。

现在我们有了一个数据库，其中嵌入了我们所有的内容。从概念上讲，您可以将其视为我们整个知识库在“语言”图上的图：

![img](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250508111251547.png)

一旦我们有了这个图，在查询方面，我们就会执行类似的过程。首先我们获得用户输入的嵌入：

<blockquote>
How do I do x...？-> Embedding Machine ->[3,11,55,48,21,...19]
</blockquote>

然后我们将其绘制在相同的向量空间中并找到最接近的片段（这只是抽象表达，实际的查询涉及一些复杂的数学技巧 —— 通常使用称为余弦距离的东西，也有其他计算方法）：

![img](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250508111136885.png)

神奇的嵌入机器认为这些是与所提出的问题最相关的答案，因此这些是我们提取发送给大语言模型的片段！



?> 在我们的 LangChain 示例中`index.query("What should I work on?")`，我们现在已经涵盖了这一行代码完成的所有操作。



## 知识库建立索引

以 LangChain 为例，索引过程可归结为两个高级步骤。

1. 加载：从通常存储的位置获取知识库的内容。
2. 分割：将知识分割成适合嵌入搜索的片段大小的块。

?> 在我们的LangChain 示例中`WebBaseLoader("http://www.paulgraham.com/greatwork.html")`加载器将访问这个网站，找出可用的页面，然后拉取每个页面，最后输出单独的文档 —— 网站上的每个页面都有一个文档。

装载机内部发生了很多事情，需要抓取所有页面，抓取每个页面的内容，然后将 HTML 格式化为可用的文本。还有其他东西的装载机 —— 例如 PDF 或 Google Drive — 有不同的部分。还有并行化、错误处理等等需要解决。从加载器中出来后，我们将获得与文档站点中每个页面相对应的文档集合。此外，理想情况下，此时额外的标记已被删除，仅保留底层结构和文本

现在我们需要对输出的文档进行分割，将任何单个文档分割成小块的、可嵌入的块，更适合搜索。如何分割也是一个复杂的逻辑，需要考虑片段大小，太大，它们不能很好地匹配查询，太小，它们没有足够的有用上下文来生成答案），如何拆分内容（通常按标题，如果有的话）。

一旦我们有了文档片段，我们就将它们保存到我们的向量数据库中，如上所述，我们终于完成了！

这是索引知识库的完整流程图：

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250508112745724.png)

在 LangChain中，整个索引过程都封装在这两行代码中。首先我们初始化网站加载器并告诉它我们要使用什么内容：

```
loader = WebBaseLoader("http://www.paulgraham.com/greatwork.html")
```

然后我们从加载器构建整个索引并保存它到我们的向量数据库：

```
index = VectorstoreIndexCreator().from_loaders([loader])
```

加载、分割、嵌入和保存都在幕后发生。



## 整个过程

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250508113001156.png)



## 参考

- [RAG](https://www.yuque.com/serviceup/misc/cn-retrieval-augmented-generation-overview#mmagO)
