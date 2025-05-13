<style>
  /* 时间线容器 */
  .wrap{
    margin: 0 auto;
    position: relative;
  }
  .timeline {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  /* 时间线竖线 */
  .timeline::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0px;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #4facfe, #00f2fe);
    border-radius: 2px;
  }

  /* 每个节点 */
  .timeline-item {
    position: relative;
    margin-left: 80px;
    margin-bottom: 40px;
  }

  /* 节点圆点 */
  .timeline-item::before {
    content: "";
    position: absolute;
    left: -40px;
    top: 5px;
    width: 20px;
    height: 20px;
    background: #4ecdc4;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 10px #4ecdc4aa;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .timeline-item:hover::before {
    background: #42b983;
    box-shadow: 0 0 15px #42b983cc;
  }

  /* 节点标题 */
  .timeline-item > a {
    font-size: 1.2em;
    font-weight: 600;
    color: #2c3e50;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .timeline-item > a:hover {
    color: #42b983;
    text-decoration: underline;
  }

  /* 节点描述 */
  .timeline-item > p {
    margin: 6px 0 0 0;
    color: #555;
    font-size: 0.95em;
    line-height: 1.4;
    max-width: 600px;
  }

  /* 连接线 */
  .timeline-connector {
    position: absolute;
    left: -30px;
    top: 25px;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, #4facfe, #00f2fe);
    border-radius: 1px;
  }

  /* 最后一个节点不显示连接线 */
  .timeline-item:last-child .timeline-connector {
    display: none;
  }

  /* 响应式 */
  @media (max-width: 600px) {
    .timeline {
      margin-left: 20px;
      margin-right: 20px;
    }
    .timeline-item {
      margin-left: 60px;
    }
    .timeline-item > a {
      font-size: 1.1em;
    }
  }
</style>

<h1 align="center" id="AI学习路线导航">AI学习路线导航</h1>

<div class="wrap">
<div class="timeline" role="list" aria-label="AI学习路线导航">
  <div class="timeline-item" role="listitem">
    <a href="/#/AI/index" title="AI学习路线导航">路线导航</a>
    <p>本路线导航帮助你系统学习AI相关知识，按章节顺序逐步深入，从基础理论到实际应用。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/01_基础与历史" title="基础与历史">01_基础与历史</a>
    <p>了解AI的发展史与底层逻辑，为后续学习打好基础。如果对机器学习感兴趣，还可以浏览扩展阅读：<a href="/#/AI/01a_机器学习基础" title="机器学习基础">机器学习基础</a>，<a href="/#/AI/01b_深度学习基础" title="深度学习基础">深度学习基础</a>，<a href="/#/AI/01c_NLP基础" title="NLP基础">NLP基础</a></p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/02_检索内容增强(RAG)" title="检索内容增强(RAG)">02_检索内容增强(RAG)</a>
    <p>理解RAG技术，掌握如何通过外部知识检索增强模型的能力，是构建知识库和专业领域应用的基础。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/03_强化学习(RL)" title="强化学习(RL)">03_强化学习(RL)</a>
    <p>学习强化学习的基本概念和算法，理解智能体如何通过环境反馈优化行为，为打造自主智能体做准备。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/04_智能体(Agent)" title="智能体(Agent)">04_智能体(Agent)</a>
    <p>深入智能体设计，了解Agent的架构与实现，掌握如何构建能够自主决策和完成任务的AI系统。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/05_MCP协议" title="MCP协议">05_MCP协议</a>
    <p>掌握Model-Client-Protocol协议的通信机制，了解如何实现AI模型与客户端之间的标准化通信。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/06_A2A协议" title="A2A协议">06_A2A协议</a>
    <p>学习Agent-to-Agent协议，理解智能体之间的高级交互模式，打造协作式智能体系统。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/07_工作流开发后端功能" title="工作流开发后端功能">07_工作流开发后端功能</a>
    <p>掌握AI系统的后端工作流开发，支持智能体的自动化流程和复杂任务编排。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/08_打造个人知识库" title="打造个人知识库">08_打造个人知识库</a>
    <p>结合RAG技术，构建个人专属知识库，实现知识的高效管理、检索与应用。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/09_AI伦理与安全" title="AI伦理与安全">09_AI伦理与安全</a>
    <p>探讨AI发展带来的伦理挑战与安全隐患，了解如何构建负责任且安全的AI系统。</p>
    <div class="timeline-connector"></div>
  </div>
</div>
</div>

<h1 align="center" id="大模型应用实践">大模型应用实践</h1>

<div class="wrap">
<div class="timeline" role="list" aria-label="大模型应用实践">
  <div class="timeline-item" role="listitem">
    <a href="/#/AI/10_Cline配置Mcp" title="Cline配置Mcp">10_Cline配置Mcp</a>
    <p>学习如何在VSCode中配置Cline和Copilot与MCP服务器的连接，开始体验智能Agent的能力。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/11_搭建基于KAG的法律顾问" title="搭建基于KAG的法律顾问">11_搭建基于KAG的法律顾问</a>
    <p>掌握Knowledge-Augmented Generation框架，构建适合法律等复杂推理场景的智能问答系统。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/14_提示词工程" title="提示词工程">14_提示词工程</a>
    <p>学习提示词工程技巧，通过精心设计的提示让AI模型生成更高质量、更符合需求的内容。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/15_prompt注入" title="prompt注入">15_prompt注入</a>
    <p>理解prompt注入攻击的原理和防御方法，提高AI应用的安全性和鲁棒性。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/16_LangChain实现智能体API" title="LangChain实现智能体API">16_LangChain实现智能体API</a>
    <p>使用LangChain框架开发智能体API，简化大模型应用开发流程。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/17_微调模型" title="微调模型">17_微调模型</a>
    <p>掌握模型微调技术，让通用大模型更好地适应特定领域和任务需求。</p>
    <div class="timeline-connector"></div>
  </div>
</div>
</div>

<h1 align="center" id="前沿思考">前沿思考</h1>

<div class="wrap">
<div class="timeline" role="list" aria-label="前沿思考">
  <div class="timeline-item" role="listitem">
    <a href="/#/AI/12_浅谈我对AI以及前端未来的思考" title="浅谈我对AI以及前端未来的思考">12_浅谈我对AI以及前端未来的思考</a>
    <p>探讨AGI发展趋势及其对前端开发的影响，思考人类与AI共存的未来发展方向。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/13_AI技术&工具的演变" title="AI技术&工具的演变">13_AI技术&工具的演变</a>
    <p>从技术演进的角度回顾AI发展历程，理解各阶段技术工具的特点与应用场景，把握未来发展趋势。</p>
    <div class="timeline-connector"></div>
  </div>
</div>
</div>
