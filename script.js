document.addEventListener("DOMContentLoaded", () => {
    const searchBar   = document.querySelector(".search-bar");
    const searchToggle = document.querySelector(".search-toggle");
    const searchInput = document.querySelector(".search-input");
    const exercises   = document.querySelectorAll(".exercise");
  
    if (!searchBar || !searchToggle || !searchInput) return;
  
    const TRANSITION_MS = 350; // должно совпадать с transition в CSS
  
    // ───────── ОТКРЫТИЕ ПОИСКА ─────────
    function openSearch() {
      searchBar.classList.add("open");
      searchInput.classList.add("open");
  
      // чуть задержать, чтобы фокус не дёргал анимацию
      setTimeout(() => {
        searchInput.focus();
      }, 150);
    }
  
    // ───────── ПЛАВНОЕ ЗАКРЫТИЕ + СБРОС ─────────
    function resetSearch() {
      // запускаем анимацию закрытия
      searchBar.classList.remove("open");
      searchInput.classList.remove("open");
  
      // очищаем текст и подсветку ПОСЛЕ завершения анимации
      setTimeout(() => {
        searchInput.value = "";
        exercises.forEach(ex => ex.classList.remove("highlight"));
      }, TRANSITION_MS);
    }
  
    // клик по иконке лупы
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
  
      if (searchBar.classList.contains("open")) {
        resetSearch();
      } else {
        openSearch();
      }
    });
  
    // клик по пустому месту страницы — закрыть поиск
    document.addEventListener("click", (e) => {
      if (!searchBar.contains(e.target)) {
        resetSearch();
      }
    });
  
    // ───────── ПОИСК УПРАЖНЕНИЙ ─────────
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
  
      if (query.length < 2) return; // игнорируем одиночные буквы
  
      exercises.forEach(ex => {
        const titleEl = ex.querySelector(".exercise-title");
        if (!titleEl) return;
  
        const title = titleEl.textContent.toLowerCase();
  
        if (title.includes(query)) {
          // плавный скролл к упражнению
          ex.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
  
          // мягкая подсветка блока
          ex.classList.add("highlight");
          setTimeout(() => ex.classList.remove("highlight"), 2000);
        }
      });
    });
  });
  document.querySelector('#ex3 .video-side video').playbackRate = 0.7;
  document.querySelector('#ex3 .video-front video').playbackRate = 0.7;
