// 使用IIFE和标识符防止重复执行
(function() {
  // 检查是否已执行过
  if (window.rideScriptInitialized) {
    return;
  }
  window.rideScriptInitialized = true;

  // 处理照片画廊查看更多功能
  const galleries = document.querySelectorAll(".photo-gallery");

  galleries.forEach((gallery) => {
    const photos = gallery.querySelectorAll(".photo-item");
    const viewMoreBtn = gallery.nextElementSibling;

    // 如果照片数量超过4张，添加has-more类
    if (photos.length > 4) {
      gallery.classList.add("has-more");

      // 确认按钮的文本
      if (viewMoreBtn && viewMoreBtn.classList.contains("view-more-btn")) {
        viewMoreBtn.textContent = `查看更多照片 (${photos.length - 4}+)`;

        // 点击查看更多按钮展开画廊
        viewMoreBtn.addEventListener("click", function () {
          gallery.classList.toggle("expanded");

          if (gallery.classList.contains("expanded")) {
            viewMoreBtn.textContent = "收起照片";
          } else {
            viewMoreBtn.textContent = `查看更多照片 (${photos.length - 4}+)`;
          }
        });
      }
    }
  });

  // 点击照片放大
  const photoItems = document.querySelectorAll(".photo-item");
  const photoOverlay = document.getElementById("photoOverlay");
  const enlargedImg = document.getElementById("enlargedImg");
  const closeOverlay = document.getElementById("closeOverlay");

  photoItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      enlargedImg.src = imgSrc;
      photoOverlay.classList.add("active");
    });
  });

  closeOverlay && closeOverlay.addEventListener("click", function () {
    photoOverlay.classList.remove("active");
  });

  // 点击overlay背景关闭
  photoOverlay && photoOverlay.addEventListener("click", function (e) {
    if (e.target === this) {
      photoOverlay.classList.remove("active");
    }
  });

  // 键盘ESC关闭
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && photoOverlay && photoOverlay.classList.contains("active")) {
      photoOverlay.classList.remove("active");
    }
  });
})();
