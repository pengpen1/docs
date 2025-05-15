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

<h1 align="center" id="设计模式学习路线导航">设计模式学习路线导航</h1>

<div class="wrap">
<div class="timeline" role="list" aria-label="设计模式学习路线导航">

  <!-- 引言 -->
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/00_引言" title="引言">00_引言：什么是设计模式？</a>
    <p>了解设计模式的基本概念、重要性以及学习设计模式能带来什么好处。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/01_设计原则" title="设计原则">01_设计原则 (SOLID等)</a>
    <p>掌握面向对象设计的核心原则，如单一职责、开闭原则、里氏替换、接口隔离、依赖倒置（SOLID），为理解和应用设计模式打下坚实基础。</p>
  </div>

  <!-- 创建型模式 -->
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/02_单例模式" title="单例模式">02_创建型：单例模式 (Singleton)</a>
    <p>确保一个类只有一个实例，并提供一个全局访问点。学习不同实现方式（懒汉、饿汉、双重检查锁定等）及其优缺点。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/03_工厂方法模式" title="工厂方法模式">03_创建型：工厂方法模式 (Factory Method)</a>
    <p>定义一个用于创建对象的接口，让子类决定实例化哪一个类。将对象的创建延迟到子类。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/04_抽象工厂模式" title="抽象工厂模式">04_创建型：抽象工厂模式 (Abstract Factory)</a>
    <p>提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。用于创建产品族。</p>
  </div>
   <div class="timeline-item" role="listitem">
    <a href="#/设计模式/05_建造者模式" title="建造者模式">05_创建型：建造者模式 (Builder)</a>
    <p>将一个复杂对象的构建与其表示分离，使得同样的构建过程可以创建不同的表示。适用于创建步骤稳定但细节多变的对象。</p>
  </div>
   <div class="timeline-item" role="listitem">
    <a href="#/设计模式/06_原型模式" title="原型模式">06_创建型：原型模式 (Prototype)</a>
    <p>用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。适用于创建成本较高的对象。</p>
  </div>

  <!-- 结构型模式 -->
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/07_适配器模式" title="适配器模式">07_结构型：适配器模式 (Adapter)</a>
    <p>将一个类的接口转换成客户希望的另外一个接口。使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/08_装饰器模式" title="装饰器模式">08_结构型：装饰器模式 (Decorator)</a>
    <p>动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/09_代理模式" title="代理模式">09_结构型：代理模式 (Proxy)</a>
    <p>为其他对象提供一种代理以控制对这个对象的访问。例如，远程代理、虚拟代理、保护代理等。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/10_外观模式" title="外观模式">10_结构型：外观模式 (Facade)</a>
    <p>为子系统中的一组接口提供一个一致的界面。定义一个高层接口，这个接口使得这一子系统更加容易使用。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/11_桥接模式" title="桥接模式">11_结构型：桥接模式 (Bridge)</a>
    <p>将抽象部分与它的实现部分分离，使它们都可以独立地变化。处理多维度变化。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/12_组合模式" title="组合模式">12_结构型：组合模式 (Composite)</a>
    <p>将对象组合成树形结构以表示“部分-整体”的层次结构。使得用户对单个对象和组合对象的使用具有一致性。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/13_享元模式" title="享元模式">13_结构型：享元模式 (Flyweight)</a>
    <p>运用共享技术有效地支持大量细粒度的对象。通过共享不变状态来减少对象数量。</p>
  </div>

  <!-- 行为型模式 -->
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/14_策略模式" title="策略模式">14_行为型：策略模式 (Strategy)</a>
    <p>定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。使得算法可独立于使用它的客户而变化。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/15_观察者模式" title="观察者模式">15_行为型：观察者模式 (Observer)</a>
    <p>定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/16_命令模式" title="命令模式">16_行为型：命令模式 (Command)</a>
    <p>将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/17_迭代器模式" title="迭代器模式">17_行为型：迭代器模式 (Iterator)</a>
    <p>提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/18_模板方法模式" title="模板方法模式">18_行为型：模板方法模式 (Template Method)</a>
    <p>定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/19_状态模式" title="状态模式">19_行为型：状态模式 (State)</a>
    <p>允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/20_责任链模式" title="责任链模式">20_行为型：责任链模式 (Chain of Responsibility)</a>
    <p>为解除请求的发送者和接收者之间耦合，而使多个对象都有机会处理这个请求。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/21_中介者模式" title="中介者模式">21_行为型：中介者模式 (Mediator)</a>
    <p>用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/22_备忘录模式" title="备忘录模式">22_行为型：备忘录模式 (Memento)</a>
    <p>在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。</p>
  </div>
  <div class="timeline-item" role="listitem">
    <a href="#/设计模式/23_访问者模式" title="访问者模式">23_行为型：访问者模式 (Visitor)</a>
    <p>表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。</p>
  </div>

</div>
</div>
