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

<h1 align="center" id="程序员英语学习线路">程序员英语学习线路</h1>

<div class="wrap">
<div class="timeline" role="list" aria-label="英语学习路线导航">
  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/01_技术英语基础词汇" title="技术英语基础词汇">01_技术英语基础词汇</a>
    <p>掌握程序员必备的400个高频技术词汇，包括编程语言、框架、工具等核心术语，采用记忆卡片方式，配合情境记忆法提高记忆效率。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/02_技术文档阅读技巧" title="技术文档阅读技巧">02_技术文档阅读技巧</a>
    <p>学习快速浏览和精读技术文档的方法，掌握API文档、GitHub README、技术博客等不同类型技术文本的阅读策略，提高阅读理解效率。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/03_旅游英语实用短句" title="旅游英语实用短句">03_旅游英语实用短句</a>
    <p>掌握300个旅游场景常用英语表达，涵盖交通、住宿、餐饮、购物、问路等情境，每个短句配有情境对话示例，帮助快速应用。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/04_英语语法速查手册" title="英语语法速查手册">04_英语语法速查手册</a>
    <p>实用英语语法精要，以程序员思维解析语法规则，突出常见错误分析，配合代码类比和记忆口诀，让语法学习不再枯燥。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/05_高效沟通表达模板" title="高效沟通表达模板">05_高效沟通表达模板</a>
    <p>收录工作沟通、技术讨论、会议发言等60个常用表达模板，帮助你在邮件往来、团队协作、技术交流中表达更地道流畅。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/06_技术演讲与分享技巧" title="技术演讲与分享技巧">06_技术演讲与分享技巧</a>
    <p>学习如何用英语进行技术演讲、Code Review和项目演示，掌握专业表达、互动技巧和应对问题的策略，提升国际化工作能力。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/07_远程工作英语指南" title="远程工作英语指南">07_远程工作英语指南</a>
    <p>适应远程办公和异步沟通环境的英语表达技巧，包括书面沟通、视频会议、文档协作等方面的实用策略和表达模式。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/08_专业领域词汇扩展" title="专业领域词汇扩展">08_专业领域词汇扩展</a>
    <p>针对AI、云计算、区块链、网络安全等热门技术领域的专业词汇扩展学习，帮助你快速适应不同技术方向的语言环境。</p>
    <div class="timeline-connector"></div>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/学好英语走天下/09_英语学习资源精选" title="英语学习资源精选">09_英语学习资源精选</a>
    <p>精选适合程序员的英语学习资源，包括播客、YouTube频道、开源项目、技术社区、移动应用等，助你持续提升英语水平。</p>
    <div class="timeline-connector"></div>
  </div>
</div>
</div>
