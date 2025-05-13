<h1 align="center" id="prompt注入">LangChain实现智能体API</h1>

**概要：** 本章节将介绍如何从传统python调用实现私有知识库到基于langchain的智能体API。



##  什么是 LangChain

LangChain 是一个用于构建 LLM 驱动应用程序的框架。它可以帮助您将可互操作的组件和第三方集成链接在一起，从而简化 AI 应用程序的开发，同时随着底层技术的发展，做出面向未来的决策。

它的目标是为各种大型语言模型应用提供通用接口，从而简化应用程序的开发流程。简单来说，LangChain 让 LLMs 更像一个有“记忆”和“知识库”的助手，而不是只能单纯回答问题的聊天机器人。



## LangChain 的核心功能

LangChain 主要提供以下功能：

- **链（Chains）**：将多个 LLM 调用组合起来，实现更复杂的应用逻辑。
- **记忆（Memory）**：让 AI 记住对话上下文，进行更连贯的交互。
- **检索增强生成（RAG）**：结合外部数据，提高回答的准确性，减少幻觉。
- **代理（Agents）**：让 AI 具备决策能力，可以动态选择工具完成任务。
- **工具（Tools）**：集成 API、数据库、搜索引擎等，使 AI 能执行各种任务。



## 实现简单RAG系统

<blockquote>思路：文本加载 → 向量化 → 向量数据库 → 问答链 的方式构建了一个简单的 RAG 系统</blockquote>



**安装 LangChain**

```shell
pip install langchain openai chromadb
```



**读取本地文件放入向量数据库**

```python
from langchain.document_loaders import TextLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

loader = TextLoader("test.txt")       # 加载名为 test.txt 的文本
documents = loader.load()                # 读取并解析为文档列表

vectorstore = Chroma.from_documents(     # 将文档转换为向量，并存入 Chroma 向量数据库
    documents,
    OpenAIEmbeddings()                   # 使用 OpenAI 的模型将文本转为向量
)
```



**让 AI 查询数据并回答**

```python
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

qa = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(),                      # 使用 OpenAI 的对话模型（GPT-3.5/4）
    retriever=vectorstore.as_retriever()   # 使用上面生成的向量数据库作为检索器
)

response = qa.run("今年的贷款利率是多少？")  # 提问
print(response)                            # 打印回答
```

其中**默认是将向量数据存储在当前目录的 `.chroma` 文件夹中**

它是一个本地向量数据库

如果你想自定义路径，可以加上 `persist_directory` 参数：

```python
Chroma.from_documents(documents, OpenAIEmbeddings(), persist_directory="./db")
```



## 实现混合智能体

<blockquote>基于 LangChain + DeepSeek API + 多工具（Google搜索 + 本地金融库） 的智能体系统</blockquote>

**「混合智能体」架构**：

- **LLM 使用远程模型 API**（DeepSeek）
- **工具包含远程与本地的混合**
- **所有决策（是否调用哪个工具）都是由大模型来决定的**

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/gent.png)

安装依赖包：

```python
pip install langchain langchain-community openai python-dotenv
pip install serpapi  # 如果你启用了 Google 搜索工具
```



**准备 `.env` 文件**，内容如下（放在项目根目录）：

```json
DEEPSEEK_API_KEY=你的deepseek_api_key
SERPAPI_API_KEY=你的serpapi_api_key
```



**创建本地数据文件** `finance.txt`：

这个文件是模拟的本地金融知识库，例如：

```txt
贷款审批条件：

1. 必须提供收入证明和信用记录；
2. 首付比例不得低于30%；
3. 征信不能有严重逾期；
```



**编写主程序**

```python
from langchain_community.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool
from langchain_community.utilities import SerpAPIWrapper
from dotenv import load_dotenv
import os
import re

# 加载环境变量
load_dotenv()

# 配置API密钥
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

# 带日志记录的Google搜索功能
def logged_google_search(query):
    try:
        print(f"[日志] 🔍 Google搜索被调用，搜索内容：{query}")
        search = SerpAPIWrapper()
        result = search.run(query)
        print(f"[日志] ✅ 搜索完成")
        return result
    except Exception as e:
        error_msg = f"Google搜索失败: {str(e)}"
        print(f"❌ {error_msg}")
        return error_msg

# 本地金融数据库查询功能
def findLocalData(query: str) -> str:
    
    try:
        print(f"\n[日志] 📚 本地数据库查询，关键词：{query}")
        
        # 读取本地文件
        file_path = "finance.txt"
        if not os.path.exists(file_path):
            return "错误：找不到金融数据文件 finance.txt"
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 简单的相关性匹配
        paragraphs = content.split('\n\n')  # 按段落分割
        relevant_info = []
        
        for para in paragraphs:
            # 检查段落是否包含查询关键词
            if any(keyword in para.lower() for keyword in query.lower().split()):
                relevant_info.append(para.strip())
        
        if relevant_info:
            result = "\n\n".join(relevant_info)
            print("[日志] ✅ 找到相关信息")
            return result
        else:
            return "未找到相关信息"
            
    except Exception as e:
        error_msg = f"本地数据查询失败: {str(e)}"
        print(f"❌ {error_msg}")
        return error_msg

# 初始化带有多个工具的Deepseek智能代理
def initialize_agent_with_tools():
   
    try:
        # 定义工具列表
        tools = [
            Tool(
                name="Google Search",
                func=logged_google_search,
                description="用于搜索最新信息、新闻和数据。输入：搜索关键词"
            ),
            Tool(
                name="Local Finance DB",
                func=findLocalData,
                description="用于查询本地金融和贷款相关信息。当问题涉及金融、贷款政策等内容时使用此工具。"
            )
        ]

        # 初始化语言模型
        llm = ChatOpenAI(
            api_key=DEEPSEEK_API_KEY,
            model="deepseek-reasoner",
            base_url="https://api.deepseek.com/v1",
            temperature=0,
            max_tokens=1000,
            request_timeout=60,
            max_retries=3,
            verbose=True
        )

        # 创建系统提示信息
        system_message = """你是一个智能助手，

请严格按照以下格式回答，不要添加任何其他内容：

Thought: 在这里写你的思考过程
Action: 在这里只写工具名称
Action Input: 在这里写输入参数
Observation: 这里是工具返回的结果
Thought: 继续思考...
Action: 继续使用工具...
Action Input: 继续输入参数...
Observation: 继续观察结果...
... (可以重复多轮)
Thought: 我现在知道答案了
Final Answer: 在这里写最终答案

可用的工具有：
1. Google Search: 用于搜索最新信息和实时数据
2. Local Finance DB: 用于查询金融和贷款相关的本地信息

重要规则：
1. 需要最新信息或新闻时必须使用 Google Search
2. 遇到查询金融和贷款相关的本地信息必须使用 Local Finance DB
3. 每个 Action 后必须跟 Action Input
4. 严格遵循上述格式，不要添加任何额外的标签或格式
5. 使用中文回答
6. 不要使用任何XML标签
7. 保持回答简洁，避免过长的输出"""

        # 初始化代理
        agent = initialize_agent(
            tools=tools,
            llm=llm,
            agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
            max_iterations=2,
            handle_parsing_errors=True,
            agent_kwargs={
                "system_message": system_message
            }
        )

        return agent
    except Exception as e:
        print(f"❌ Agent初始化失败: {str(e)}")
        return None

# 测试函数：运行agent并格式化输出结果
def test_agent_with_question(agent, question):
    print("\n" + "="*50)
    print(f"📝 测试问题：{question}")
    print("="*50)
    
    try:
        # 记录原始工具函数
        original_funcs = {}
        for tool in agent.tools:
            original_funcs[tool.name] = tool.func
            # 包装工具函数，添加日志记录
            def make_logged_func(tool_name, orig_func):
                def logged_func(input_value):
                    print(f"\n🔧 工具调用: {tool_name}")
                    print(f"输入: {input_value}")
                    result = orig_func(input_value)
                    print(f"输出: {str(result)[:150]}..." if len(str(result)) > 150 else str(result))
                    return result
                return logged_func
            tool.func = make_logged_func(tool.name, tool.func)
        
        # 执行查询
        print("\n💭 正在处理...")
        response = agent.invoke({"input": question})
        
        # 输出结果
        print("\n📊 回答:")
        answer = response.get('output', '') if isinstance(response, dict) else str(response)
        print(answer.split("Final Answer:")[-1].strip() if "Final Answer:" in answer else answer)
        
    except Exception as e:
        print(f"❌ 错误: {str(e)}")
    finally:
        # 恢复原始工具函数
        for tool in agent.tools:
            tool.func = original_funcs[tool.name]
    
    print("="*50)

# 主程序入口
if __name__ == "__main__":
    try:
        print("🚀 正在初始化智能助手...")
        agent = initialize_agent_with_tools()
        
        if agent:
            print("\n📌 开始运行测试案例...")
            
            # 问题1：查询实时信息，期望调用google
            test_question1 = "请告诉我2024年3月人工智能最新发展和重要新闻"
            # 问题2：查询本地信息，期望查询本地文件
            test_question2 = "根据本地信息查询：贷款的审批条件"
           
            
            # 测试完整的Agent
            print("\n🤖 现在测试完整的Agent:")
            test_agent_with_question(agent, test_question1)
            
            print("\n✅ 所有测试案例执行完成！")
        else:
            print("\n❌ Agent初始化失败，无法运行测试")
                
    except Exception as e:
        print(f"❌ 运行主流程时发生错误: {str(e)}")
```



**运行主程序**

```shell
python agent_demo.py
```

输出结果中你会看到：

- 日志打印了是否调用了 Google Search 或 Local Finance DB
- 模型输出了 `Thought`, `Action`, `Observation`, `Final Answer`
- 最终以格式化后的中文回答给出结果



你可以在代码最后添加自定义输入，例如：

```
python复制编辑user_question = input("请输入你的问题：")
test_agent_with_question(agent, user_question)
```

这样每次运行都能交互式提问。



## 实现智能体API

**文件架构：**

```
your_project/
├── agent_initializer.py     # 智能体构造逻辑（对外暴露 agent 实例）
├── rag_api.py               # FastAPI 接口服务（提供 HTTP API）
├── finance.txt              # 本地知识文件
├── .env                     # 存储API密钥
├── requirements.txt         # 依赖包清单
└── utils/
    └── tools.py             # 自定义工具函数（如本地查询、本地向量检索等）
```



**agent_initializer.py（封装智能体）**

```python
# agent_initializer.py

from langchain.agents import initialize_agent, AgentType
from langchain_community.chat_models import ChatOpenAI
from langchain.tools import Tool
from dotenv import load_dotenv
import os
from utils.tools import logged_google_search, find_local_data

load_dotenv()

def get_agent():
    DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

    # 工具定义
    tools = [
        Tool(
            name="Google Search",
            func=logged_google_search,
            description="用于搜索实时新闻和最新信息"
        ),
        Tool(
            name="Local Finance DB",
            func=find_local_data,
            description="用于查询本地金融信息，如贷款利率、政策等"
        )
    ]

    # 初始化LLM
    llm = ChatOpenAI(
        api_key=DEEPSEEK_API_KEY,
        model="deepseek-reasoner",
        base_url="https://api.deepseek.com/v1",
        temperature=0,
        max_tokens=1000
    )

    # 系统提示
    system_message = """你是一个智能助手，...（略，可复用你之前那一段system message）"""

    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=False,
        max_iterations=3,
        agent_kwargs={"system_message": system_message}
    )

    return agent
```



**utils/tools.py（工具函数）**

```python
# utils/tools.py

import os
from langchain_community.utilities import SerpAPIWrapper

def logged_google_search(query):
    print(f"[Google搜索] 查询: {query}")
    try:
        search = SerpAPIWrapper()
        return search.run(query)
    except Exception as e:
        return f"搜索失败: {str(e)}"

def find_local_data(query: str) -> str:
    file_path = "finance.txt"
    if not os.path.exists(file_path):
        return "错误：找不到 finance.txt 文件"

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    paragraphs = content.split('\n\n')
    results = [p for p in paragraphs if any(k in p.lower() for k in query.lower().split())]

    return "\n\n".join(results) if results else "未找到相关信息"
```



**rag_api.py（API服务）**

```python
# rag_api.py

from fastapi import FastAPI, Request
from pydantic import BaseModel
from agent_initializer import get_agent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 允许跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 建议生产环境设置为你的前端域名
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(req: QueryRequest):
    agent = get_agent()
    try:
        result = agent.invoke({"input": req.question})
        return {
            "success": True,
            "answer": result.get("output", "无返回结果")
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
```



**requirements.txt（依赖）**

```txt
fastapi
uvicorn
python-dotenv
langchain
openai
langchain-community
```



**运行方式**

安装依赖：

```
pip install -r requirements.txt
```

启动 API 服务：

```
uvicorn rag_api:app --reload --port 8000
```

前端调用地址：

```
bash复制编辑POST http://localhost:8000/ask
Body: { "question": "今年的贷款利率是多少？" }
```



## 参考

- [LangChain](https://panda-99.com/zh-cn/posts/langchain/)