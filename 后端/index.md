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
    left: 0px; /* Adjusted from 50% to align left */
    /* transform: translateX(-50%); */ /* Removed transform */
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #4facfe, #00f2fe);
    border-radius: 2px;
  }

  /* 每个节点 */
  .timeline-item {
    position: relative;
    margin-left: 80px; /* Increased margin for content */
    margin-bottom: 40px;
  }

  /* 节点圆点 */
  .timeline-item::before {
    content: "";
    position: absolute;
    left: -40px; /* Position relative to the left margin */
    top: 5px;
    width: 20px;
    height: 20px;
    background: #4ecdc4;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 10px #4ecdc4aa;
    transition: background-color 0.3s ease;
    cursor: pointer;
    z-index: 1; /* Ensure dot is above the line */
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
    display: block; /* Ensure link takes full width for easier clicking */
    margin-bottom: 5px; /* Space between title and description */
  }

  .timeline-item > a:hover {
    color: #42b983;
    text-decoration: underline;
  }

  /* 节点描述 */
  .timeline-item > p {
    margin: 0; /* Reset margin */
    color: #555;
    font-size: 0.95em;
    line-height: 1.4;
    max-width: 600px;
  }

  /* 连接线 - Adjusted to connect dots */
  .timeline-connector {
      /* This element might not be needed if the main timeline line serves the purpose */
      /* If needed, adjust positioning carefully */
      display: none; /* Hiding connector as the main line is sufficient */
  }


  /* 响应式 */
  @media (max-width: 600px) {
    .timeline {
      margin-left: 20px;
      margin-right: 20px;
    }
    .timeline-item {
      margin-left: 60px; /* Adjust margin for smaller screens */
    }
    .timeline-item::before {
        left: -30px; /* Adjust dot position */
    }
    .timeline-item > a {
      font-size: 1.1em;
    }
  }
</style>

<h1 align="center" id="后端学习路线导航">后端学习路线导航</h1>

<div class="wrap">
<div class="timeline" role="list" aria-label="后端学习路线导航">

  <!-- 基础知识 -->
  <div class="timeline-item" role="listitem">
    <a href="#/后端/01_请求中的MIME类型" title="MIME类型">请求中的MIME类型</a>
    <p>了解HTTP请求中MIME类型的作用、常见MIME类型及其应用场景，掌握Content-Type头的正确使用方法。</p>
  </div>

  <!-- 服务器与协议 -->
  <div class="timeline-item" role="listitem">
    <a href="#/后端/02_REST接口设计规范" title="REST接口设计">REST接口设计规范</a>
    <p>学习RESTful API的设计原则、资源命名、HTTP方法使用、状态码、版本控制等最佳实践，打造易用且一致的API。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/后端/03_GraphQL基础与实践" title="GraphQL">GraphQL基础与实践</a>
    <p>探索GraphQL作为REST API替代方案的优势，学习查询语言、类型系统、解析器实现及性能优化技巧。</p>
  </div>

  <!-- 数据库 -->
  <div class="timeline-item" role="listitem">
    <a href="#/后端/04_SQL与NoSQL选择指南" title="SQL与NoSQL">SQL与NoSQL选择指南</a>
    <p>对比关系型数据库与非关系型数据库的特点，学习如何根据项目需求选择合适的数据库解决方案。</p>
  </div>

  <!-- 安全 -->
  <div class="timeline-item" role="listitem">
    <a href="#/后端/05_API安全最佳实践" title="API安全">API安全最佳实践</a>
    <p>掌握后端安全的关键概念，包括认证、授权、JWT、HTTPS、CORS、XSS和CSRF防护、数据验证等核心安全措施。</p>
  </div>

  <!-- 高级主题 -->
  <div class="timeline-item" role="listitem">
    <a href="#/后端/06_微服务架构设计" title="微服务架构">微服务架构设计</a>
    <p>了解微服务架构的优势与挑战，学习服务拆分、通信模式、服务发现、API网关和容器化部署等关键技术。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/后端/07_高并发系统设计" title="高并发系统">高并发系统设计</a>
    <p>探索构建高并发后端系统的核心策略，包括负载均衡、缓存机制、异步处理、数据库优化和服务器集群。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/后端/08_分布式系统与一致性" title="分布式系统">分布式系统与一致性</a>
    <p>学习分布式系统设计中的CAP理论、一致性算法、分布式事务、消息队列等关键概念和实现方法。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/后端/09_持续集成与部署" title="CI/CD">持续集成与部署</a>
    <p>掌握现代后端开发流程中的CI/CD技术，包括自动化测试、容器化部署、环境管理和版本控制最佳实践。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="#/后端/10_监控与日志管理" title="监控与日志">监控与日志管理</a>
    <p>学习搭建完善的后端监控系统，实现性能指标收集、异常报警、日志聚合与分析，提升系统可观测性。</p>
  </div>

</div>
</div>
