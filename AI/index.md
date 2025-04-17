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
    <p>本路线导航帮助你系统学习AI相关知识，按章节顺序逐步深入。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/01_基础与历史" title="基础与历史">01_基础与历史</a>
    <p>了解AI的发展史与底层逻辑，为后续打好基础。如果对机器学习感兴趣，还可以浏览扩展阅读：<a href="/#/AI/01a_机器学习基础" title="机器学习基础">机器学习基础</a>，<a href="/#/AI/01b_深度学习基础" title="深度学习基础">深度学习基础</a>，<a href="/#/AI/01c_NLP基础" title="NLP基础">NLP基础</a></p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/02_检索内容增强(RAG)" title="检索内容增强(RAG)">02_检索内容增强(RAG)</a>
    <p>理解RAG协议，掌握如何通过检索增强模型的知识能力，是后续知识库构建的基础。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/03_强化学习(RL)" title="强化学习(RL)">03_强化学习(RL)</a>
    <p>学习强化学习的基本概念和算法，理解智能体如何通过环境反馈优化行为。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/04_智能体(Agent)" title="智能体(Agent)">04_智能体(Agent)</a>
    <p>深入智能体设计，了解Agent的架构与实现，结合强化学习提升智能体能力。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/05_MCP协议" title="MCP协议">05_MCP协议</a>
    <p>掌握MCP协议的通信机制，为多智能体协作和复杂系统交互打下基础。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/06_A2A协议" title="A2A协议">06_A2A协议</a>
    <p>学习A2A协议，理解Agent间的高级交互模式，提升系统的灵活性和扩展性。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/07_工作流开发后端功能" title="工作流开发后端功能">07_工作流开发后端功能</a>
    <p>掌握后端工作流开发，支持AI系统的自动化和流程管理。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/AI/08_打造个人知识库" title="打造个人知识库">08_打造个人知识库</a>
    <p>基于前面章节，构建个人知识库，实现知识的高效管理与调用。</p>
  </div>
</div>
</div>
