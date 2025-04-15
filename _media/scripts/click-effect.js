// 点击特效配置
const settings = {
  particleCount: 6, // 每次点击产生的粒子数
  spreadRange: 360, // 粒子扩散角度范围
  colors: ["#42b983", "#4facfe", "#ff6b6b"], // 粒子颜色
  size: 8, // 粒子大小(px)
  duration: 1000, // 动画时长(ms)
  maxParticles: 30, // 同时存在最大粒子数
};

let particles = [];

// 逻辑：
// 1. 监听点击事件，获取点击位置
// 2. 根据点击位置和配置创建粒子
// 3. 为每个粒子设置随机属性和样式
// 4. 为每个粒子设置动画
// 5. 动画结束后移除粒子

function createParticle(x, y) {
  if (particles.length >= settings.maxParticles) return;

  for (let i = 0; i < settings.particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "click-particle";

      // 随机属性
      
    //   随机位置偏移量 => [0, spreadRange] => [-spreadRange/2, spreadRange/2]
    const angle =
          Math.random() * settings.spreadRange - settings.spreadRange / 2;
      
    const color =
      settings.colors[Math.floor(Math.random() * settings.colors.length)];
    const delay = Math.random() * 0.2;

    // 样式设置
    particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${settings.size}px;
        height: ${settings.size}px;
        background: ${color};
        animation: particleMove ${settings.duration}ms ease-out ${delay}s forwards;
      `;

    // 运动轨迹
    const radians = (angle * Math.PI) / 180; // 角度转弧度
    const distance = 60 + Math.random() * 40; // 粒子飞行距离（60-100px）
    const targetX = Math.cos(radians) * distance;
    const targetY = Math.sin(radians) * distance;

    particle.style.setProperty("--target-x", `${targetX}px`); //  X 轴位移分量
    particle.style.setProperty("--target-y", `${targetY}px`); // Y 轴位移分量

    document.body.appendChild(particle);
    particles.push(particle);

    // 动画结束后移除
    setTimeout(() => {
      particle.remove();
      particles = particles.filter((p) => p !== particle);
    }, settings.duration + delay * 1000);
  }
}

// 初始化点击监听
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    createParticle(e.clientX, e.clientY);
  });
});

// 添加样式到head
const style = document.createElement("style");
style.textContent = `
  .click-particle {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    opacity: 0.8;
    z-index: 9999;
    transform: translate(0, 0);
  }
  
  @keyframes particleMove {
    0% {
      opacity: 0.8;
      transform: translate(0, 0);
    }
    100% {
      opacity: 0;
      transform: translate(var(--target-x), var(--target-y));
    }
  }
  `;
document.head.appendChild(style);
