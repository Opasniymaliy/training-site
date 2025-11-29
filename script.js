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




  
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle-checkbox"); // чекбокс флажка
    const searchBar = document.querySelector(".search-bar");
    const searchInput = document.querySelector(".search-input");
    const searchToggle = document.querySelector(".search-toggle");
    const navLinks = document.querySelectorAll(".nav-floating-menu a");
  
    if (!navToggle) return;
  
    // === 1. ОТКРЫВАЕМ ПОИСК → ЗАКРЫВАЕМ НАВИГАЦИЮ ===
    if (searchToggle) {
      searchToggle.addEventListener("click", () => {
        navToggle.checked = false; // свернули флажок
      });
    }
  
    if (searchInput) {
      searchInput.addEventListener("focus", () => {
        navToggle.checked = false; // тоже свернуть, если сразу тыкнули в поле
      });
    }
  
    // === 2. ОТКРЫВАЕМ НАВИГАЦИЮ → ЗАКРЫВАЕМ ПОИСК ===
    navToggle.addEventListener("change", () => {
      if (navToggle.checked) {
        // навигация открыта — сворачиваем поиск
        if (searchBar) searchBar.classList.remove("open");
        if (searchInput) {
          searchInput.classList.remove("open");
          searchInput.value = "";
          searchInput.blur();
        }
      }
    });
  
    // === 3. КЛИК ПО ПУНКТУ НАВИГАЦИИ → ЗАКРЫВАЕМ НАВИГАЦИЮ ===
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.checked = false;
      });
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector("#nav-toggle");            // чекбокс навигации
    const navMenu   = document.querySelector(".nav-floating-menu");     // меню
    const searchBar = document.querySelector(".search-bar");
    const searchInput = document.querySelector(".search-input");
    const searchToggle = document.querySelector(".search-toggle");
    const navLinks = document.querySelectorAll(".nav-floating-menu a");

    // --- Если элементы не нашли (страница без них) — выходим ---
    if (!navToggle || !navMenu) return;

    // ============================================================
    // 1. Открыли поиск → закрываем навигацию
    // ============================================================
    if (searchToggle) {
        searchToggle.addEventListener("click", () => {
            navToggle.checked = false;
        });
    }

    if (searchInput) {
        searchInput.addEventListener("focus", () => {
            navToggle.checked = false;
        });
    }

    // ============================================================
    // 2. Клик по пустому месту — закрыть меню
    // ============================================================
    document.addEventListener("click", (e) => {
        const clickedInsideMenu = navMenu.contains(e.target);
        const clickedToggle = e.target.closest(".nav-toggle-btn");

        if (!clickedInsideMenu && !clickedToggle) {
            navToggle.checked = false;
        }
    });

    // ============================================================
    // 3. Клик по пункту меню → закрыть меню
    // ============================================================
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.checked = false;
        });
    });

    // ============================================================
    // 4. Открыли меню → закрываем поиск
    // ============================================================
    navToggle.addEventListener("change", () => {
        if (navToggle.checked) {
            if (searchBar) searchBar.classList.remove("open");
            if (searchInput) {
                searchInput.classList.remove("open");
                searchInput.value = "";
                searchInput.blur();
            }
        }
    });
});





