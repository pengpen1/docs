<style>
/* Reuse styles or add specific styles */
.nlp-pipeline-diagram svg {
  max-width: 100%;
  height: auto;
}
.formula {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1em;
  margin: 1em 0;
  overflow-x: auto;
  font-family: monospace;
}
</style>

<h1 align="center" id="NLP基础">自然语言处理 (NLP) 基础</h1>

**概要：** 本章节将介绍自然语言处理（Natural Language Processing, NLP）的基本概念、核心任务、关键技术（特别是文本表示方法），以及在 Transformer 架构出现之前的经典深度学习模型（如 Seq2Seq）。这将为后续理解更先进的 LLM 和 RAG 技术打下基础。

## 1. 什么是自然语言处理 (NLP)？

**自然语言处理 (NLP)** 是人工智能和语言学领域的一个分支，致力于让计算机能够**理解、解释、生成人类使用的自然语言**（如汉语、英语）。其目标是弥合人类交流方式与计算机理解能力之间的鸿沟。

NLP 涉及众多子任务，从基础的文本处理到复杂的语义理解和生成。

## 2. 基础 NLP 任务（传统流程）

传统的 NLP 系统通常采用流水线 (Pipeline) 的方式处理文本，包含以下一些常见的基础任务：

-   **文本获取 (Text Acquisition):** 从各种来源（网页、文档、数据库）获取原始文本数据。
-   **文本预处理 (Text Preprocessing):**
    *   **分词 (Tokenization):** 将连续的文本切分成有意义的单元（词语、标点符号等），称为“词符 (Token)”。例如，"我爱NLP" -> ["我", "爱", "NLP"]。对于中文等语言，分词本身就是一个挑战。
    *   **文本清洗 (Text Cleaning):** 去除无关字符（如 HTML 标签）、处理大小写、去除停用词 (Stop Words，如 "的", "是", "a", "the" 等常见但信息量低的词)。
    *   **词形还原 (Lemmatization) / 词干提取 (Stemming):** 将单词的不同形式（如 "running", "ran"）还原为其基本形式（如 "run"）。词形还原通常基于词典，更准确；词干提取则基于规则，速度更快但可能不准确。
-   **词性标注 (Part-of-Speech, POS Tagging):** 为每个词符标注其语法词性（如名词、动词、形容词等）。例如，"我/代词 爱/动词 NLP/名词"。
-   **命名实体识别 (Named Entity Recognition, NER):** 识别文本中具有特定意义的实体，并将其分类（如人名、地名、组织名、日期、时间等）。例如，在“Apple 公司昨天发布了新款 iPhone”中识别出“Apple” (组织名)、“昨天” (日期)、“iPhone” (产品名)。
-   **句法分析 (Syntactic Parsing):** 分析句子的语法结构，通常生成一个句法树 (Parse Tree)，表示句子中词语之间的语法关系（如主谓宾结构）。
-   **语义分析 (Semantic Analysis):** 理解文本的含义，包括词义消歧 (Word Sense Disambiguation)、语义角色标注 (Semantic Role Labeling) 等。

**简化 NLP 流水线示例：**

```mermaid
graph LR
    A[原始文本: "Apple 公司昨天发布了新款 iPhone。"] --> B(分词);
    B --> C(词性标注);
    C --> D(命名实体识别);
    D --> E[后续任务 (如信息抽取, 情感分析)];

    B -- ["Apple", "公司", "昨天", ...] --> C;
    C -- ["Apple/名词", "公司/名词", "昨天/时间词", ...] --> D;
    D -- ["Apple/组织", "昨天/日期", "iPhone/产品"] --> E;
```

## 3. 文本表示 (Text Representation)

机器学习模型无法直接处理原始文本，需要将文本转换为**数值向量**。如何有效地表示文本是 NLP 的核心问题之一。

### 3.1 离散表示 (Discrete Representations)

-   **独热编码 (One-Hot Encoding):**
    *   为词汇表中的每个词创建一个非常长的向量，向量长度等于词汇表大小。
    *   该词对应的位置为 1，其他位置全为 0。
    *   **优点:** 简单。
    *   **缺点:** 向量维度巨大且非常稀疏；无法表示词语之间的语义相似性（任意两个词的向量点积为 0）。
-   **词袋模型 (Bag-of-Words, BoW):**
    *   忽略文本中的词序和语法，仅将文本看作是一个词语的集合（袋子）。
    *   用一个向量表示文本，向量的每个维度代表词汇表中的一个词，其值表示该词在文本中出现的**频率 (Term Frequency, TF)** 或次数。
    *   **优点:** 简单，在某些任务（如文本分类）上效果不错。
    *   **缺点:** 丢失词序信息；无法表示语义相似性；高频词（如停用词）可能占据主导地位。
-   **TF-IDF (Term Frequency-Inverse Document Frequency):**
    *   BoW 的改进，旨在降低高频词的权重，提升重要但出现频率不高的词的权重。
    *   **TF (词频):** 衡量一个词在**当前文档**中出现的频率。
    *   **IDF (逆文档频率):** `log(文档总数 / 包含该词的文档数)`。一个词在越多的文档中出现，其 IDF 值越低，表示区分度越低。
    *   **TF-IDF 值 = TF * IDF**。
    *   **优点:** 比 BoW 更能反映词语的重要性。
    *   **缺点:** 仍然丢失词序信息；无法表示语义相似性；维度仍然很高。

### 3.2 分布式表示 / 词嵌入 (Distributed Representations / Word Embeddings)

核心思想：**一个词的含义由其上下文决定 (Distributional Hypothesis)**。将每个词映射到一个**低维、稠密**的实数向量（称为词嵌入向量），使得语义相似的词在向量空间中距离更近。

-   **Word2Vec (Mikolov et al., 2013):**
    *   基于神经网络的词嵌入方法，有两种主要模型：
        *   **CBOW (Continuous Bag-of-Words):** 根据上下文词预测中心词。
        *   **Skip-gram:** 根据中心词预测上下文词。
    *   通过在大量文本上训练，学习到能够捕捉词语语义和语法关系的向量表示。例如，`vector('国王') - vector('男人') + vector('女人') ≈ vector('王后')`。
-   **GloVe (Global Vectors for Word Representation, Pennington et al., 2014):**
    *   结合了全局矩阵分解（如 LSA）和局部上下文窗口（如 Word2Vec）的优点。
    *   基于全局词-词共现统计信息进行训练。
-   **FastText (Bojanowski et al., 2016):**
    *   Word2Vec 的扩展，将词语视为**字符 n-gram** 的集合来构建词向量。
    *   优点：能够为词汇表之外的词（Out-of-Vocabulary, OOV）生成向量；在处理形态丰富的语言时效果更好。

**词嵌入的优点:**

-   **低维稠密:** 相比 One-Hot 或 TF-IDF，维度大大降低，向量稠密。
-   **捕捉语义相似性:** 语义相近的词向量距离更近。
-   **作为下游任务的输入:** 可以直接作为深度学习模型的输入特征。

**局限性:**

-   **静态:** 每个词只有一个固定的向量表示，无法处理一词多义 (Polysemy) 的问题。例如，“bank” 在 “river bank” 和 “bank account” 中的含义不同，但 Word2Vec 会给出相同的向量。

## 4. Transformer 之前的经典深度学习模型：Seq2Seq

在 Transformer (2017) 出现之前，基于 **循环神经网络 (RNN)**，特别是 **LSTM** 和 **GRU** 的 **序列到序列 (Sequence-to-Sequence, Seq2Seq)** 模型是处理许多 NLP 任务（如机器翻译、文本摘要、对话系统）的主流架构。

### 4.1 Seq2Seq 架构

Seq2Seq 模型通常由两个主要部分组成：

-   **编码器 (Encoder):** 一个 RNN（通常是 LSTM 或 GRU），负责读取输入序列（如源语言句子），并将其压缩成一个固定长度的**上下文向量 (Context Vector)**，也称为“思想向量 (Thought Vector)”。这个向量被认为是输入序列的语义表示。
-   **解码器 (Decoder):** 另一个 RNN，以编码器生成的上下文向量作为初始状态，然后一步一步地生成输出序列（如目标语言句子）。在生成每个词时，解码器通常会考虑上一步生成的词和当前的隐藏状态。

```mermaid
graph TD
    subgraph Encoder (RNN/LSTM/GRU)
        direction LR
        E_In1[Input 1] --> E_h1 --> E_h2 --> E_hn[Input n]
        E_hn --> ContextVec(Context Vector)
    end
    subgraph Decoder (RNN/LSTM/GRU)
        direction LR
        ContextVec -- 初始化状态 --> D_h0
        D_h0 -- "<START>" --> D_h1 -- Output 1 --> D_h2 -- Output 2 --> D_hn[...]
    end

    style ContextVec fill:#f9f,stroke:#333,stroke-width:2px
```

### 4.2 注意力机制 (Attention Mechanism)

基本的 Seq2Seq 模型存在一个**瓶颈**：编码器必须将整个输入序列的所有信息压缩到一个**固定长度**的上下文向量中。对于长输入序列，这可能导致信息丢失。

**注意力机制 (Bahdanau et al., 2014; Luong et al., 2015)** 被提出来解决这个问题。其核心思想是：

-   允许解码器在生成输出序列的**每一步**，都能够“关注”输入序列的不同部分。
-   解码器在生成每个输出词时，会计算输入序列中每个词（或编码器隐藏状态）与当前解码状态的**相关性分数 (Attention Scores)**。
-   根据这些分数对输入序列的表示进行**加权求和**，生成一个**动态的上下文向量 (Dynamic Context Vector)**。
-   这个动态上下文向量与解码器的当前状态一起用于预测下一个输出词。

注意力机制使得解码器能够根据需要聚焦于输入序列的相关部分，极大地提升了 Seq2Seq 模型在处理长序列任务（尤其是机器翻译）上的性能。它也是后续 **Transformer 架构的核心基础**。

## 5. 总结

自然语言处理旨在让计算机理解和生成人类语言。传统 NLP 任务涉及分词、标注、句法分析等步骤。将文本表示为数值向量是关键，从早期的 BoW、TF-IDF 到捕捉语义的词嵌入 (Word2Vec, GloVe)。在 Transformer 之前，基于 RNN 的 Seq2Seq 模型（尤其是结合了注意力机制的）是处理序列转换任务的主流方法。理解这些基础概念和技术演进，有助于我们更好地认识现代 NLP（如 [RAG](/AI/02_检索内容增强(RAG)) 和基于 Transformer 的 LLM）的强大能力和创新之处。

## 6. 参考资料

-   [Speech and Language Processing (Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/) - NLP 领域的经典教材
-   [Natural Language Processing with Python (Bird, Klein, Loper)](https://www.nltk.org/book/) - 使用 NLTK 库进行 NLP 实践
-   [CS224n: Natural Language Processing with Deep Learning (Stanford Course)](http://web.stanford.edu/class/cs224n/)
-   [Word2Vec Paper](https://arxiv.org/abs/1301.3781)
-   [GloVe Paper](https://nlp.stanford.edu/projects/glove/)
-   [Attention Mechanism Papers (Bahdanau et al., Luong et al.)](https://arxiv.org/abs/1409.0473), [https://arxiv.org/abs/1508.04025](https://arxiv.org/abs/1508.04025)
