// click-effect.js
(function () {
  const colors = [
    '#4ecdc4',
    '#42b983',
    '#4facfe',
    '#00f2fe',
    '#ff6b6b',
    '#ffd700',
  ];

  // 创建彩带粒子
  function createParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = 9999;
    particle.style.opacity = '1';
    particle.style.transform = `translate(0, 0) scale(1)`;
    particle.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';

    document.body.appendChild(particle);

    // 随机方向和距离
    const angle = Math.random() * 2 * Math.PI;
    const distance = 50 + Math.random() * 30;

    // 触发动画
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
      particle.style.opacity = '0';
    });

    // 动画结束后移除元素
    setTimeout(() => {
      particle.remove();
    }, 800);
  }

  // 点击事件处理
  function onClick(e) {
    const x = e.clientX;
    const y = e.clientY;

    // 生成 8 个彩带粒子
    for (let i = 0; i < 8; i++) {
      const color = colors[i % colors.length];
      createParticle(x, y, color);
    }
  }

  // 初始化绑定事件
  function init() {
    document.addEventListener('click', onClick);
  }

  // 等 DOM 加载完再初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
