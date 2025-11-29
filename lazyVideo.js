// Находим все видео
const videos = document.querySelectorAll("video");

// Создаем наблюдатель
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      // Видео появилось на экране
      entry.target.play().catch(() => {});
    } else {
      // Видео ушло за экран
      entry.target.pause();
    }

  });
}, {
  threshold: 0.5 // 50% видео должно быть видно
});

// Подключаем наблюдатель ко всем видео
videos.forEach(video => observer.observe(video));
