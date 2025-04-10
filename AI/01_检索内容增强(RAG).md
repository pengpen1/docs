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

检索增强生成是用从其他地方检索到的附加信息来补充用户输入到聊天 GPT 等大型语言模型（LLM）的过程。然后，LLM 可以使用该信息来增强其生成的响应。

下图显示了它在实践中的工作原理：

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250410105007319.png)

它从用户的问题开始。例如“How do I do <something>?”

首先发生的是检索步骤。这是接受用户问题并从知识库中搜索可能回答该问题的最相关内容的过程。检索步骤是迄今为止 RAG 链中最重要、最复杂的部分。但现在，想象一下一个黑匣子，它知道如何提取与用户查询相关的最佳相关信息块。

**难道我们不能只给 LLM 整个知识库吗？**

您可能想知道为什么我们费心检索而不是只将整个知识库发送给 LLM。原因之一是模型对一次可以消耗的文本量有内置的限制（尽管这些限制正在迅速增加）。第二个原因是成本 —— 发送大量文本会变得相当昂贵。最后，有证据表明发送少量相关信息会得到更好的答案。

一旦我们从知识库中获取了相关信息，我们就会将其与用户的问题一起发送到大型语言模型（LLM）。 LLM（最常见的是 ChatGPT）然后“读取”所提供的信息并回答问题。这是增强生成步骤。



## 参考

- [RAG](https://www.yuque.com/serviceup/misc/cn-retrieval-augmented-generation-overview#mmagO)

