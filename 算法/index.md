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

<h1 align="center" id="算法学习路线导航">算法学习路线导航</h1>

<div>TODO: 待填坑</div>

<div class="wrap">
<div class="timeline" role="list" aria-label="算法学习路线导航">

  <!-- 基础算法 -->
  <div class="timeline-item" role="listitem">
    <a href="/#/算法/01_两数之和" title="两数之和">两数之和</a>
    <p>了解哈希表的基本应用，通过经典的两数之和问题掌握时间复杂度优化的思路。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/02_排序算法全解析" title="排序算法">排序算法全解析</a>
    <p>系统学习常见排序算法(冒泡、选择、插入、快速、归并、堆排序等)的原理、实现与复杂度分析。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/03_二分查找与变种" title="二分查找">二分查找与变种</a>
    <p>掌握二分查找的核心思想与实现技巧，学习二分查找的各种变形及其应用场景。</p>
  </div>

  <!-- 数据结构 -->
  <div class="timeline-item" role="listitem">
    <a href="/#/算法/04_链表操作精髓" title="链表">链表操作精髓</a>
    <p>深入理解链表的结构特点，掌握链表的遍历、插入、删除、反转等基本操作及常见链表问题的解决思路。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/05_树与二叉树" title="树与二叉树">树与二叉树</a>
    <p>学习树和二叉树的基本概念、遍历方式、构建与常见操作，掌握二叉搜索树、平衡二叉树的特性与应用。</p>
  </div>

  <!-- 进阶算法 -->
  <div class="timeline-item" role="listitem">
    <a href="/#/算法/06_动态规划入门" title="动态规划">动态规划入门</a>
    <p>理解动态规划的核心思想，学习状态定义、转移方程构建及空间优化技巧，通过经典问题掌握DP解题框架。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/07_贪心算法与应用" title="贪心算法">贪心算法与应用</a>
    <p>学习贪心算法的基本思想与适用条件，通过典型问题理解贪心选择的正确性证明及实现方法。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/08_回溯与递归" title="回溯与递归">回溯与递归</a>
    <p>掌握回溯算法的框架与剪枝技巧，学习如何通过递归实现组合、排列、子集等经典问题的解决方案。</p>
  </div>

  <!-- 高级主题 -->
  <div class="timeline-item" role="listitem">
    <a href="/#/算法/09_图论算法" title="图论算法">图论算法</a>
    <p>了解图的表示方法与遍历算法，学习最短路径、最小生成树、拓扑排序等经典图论算法及其应用。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/10_高级数据结构" title="高级数据结构">高级数据结构</a>
    <p>探索高级数据结构(优先队列、并查集、字典树、线段树等)的原理、实现与典型应用场景。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/11_字符串算法" title="字符串算法">字符串算法</a>
    <p>学习KMP、Rabin-Karp等高效字符串匹配算法，掌握字符串处理的核心技巧与常见问题解法。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/12_位运算技巧" title="位运算技巧">位运算技巧</a>
    <p>掌握位运算的基本操作与常用技巧，学习如何利用位运算提高算法效率并解决特定类型问题。</p>
  </div>

  <!-- 实战与优化 -->
  <div class="timeline-item" role="listitem">
    <a href="/#/算法/13_算法复杂度分析" title="复杂度分析">算法复杂度分析</a>
    <p>深入理解时间复杂度与空间复杂度的计算方法，学习如何分析与优化算法效率。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/14_编程技巧与代码优化" title="编程技巧">编程技巧与代码优化</a>
    <p>总结算法实现的常用编程技巧，学习代码简化、边界处理及性能优化的实用方法。</p>
  </div>

  <div class="timeline-item" role="listitem">
    <a href="/#/算法/15_面试算法题精选" title="面试算法题">面试算法题精选</a>
    <p>精选常见面试算法题及其多种解法，掌握面试中的答题技巧与思路拓展方法。</p>
  </div>

</div>
</div>
