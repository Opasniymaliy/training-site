// script.js

document.addEventListener("DOMContentLoaded", () => {
  const searchBar    = document.querySelector(".search-bar");
  const searchToggle = document.querySelector(".search-toggle");
  const searchInput  = document.querySelector(".search-input");

  const navToggle = document.querySelector("#navToggle");           // чекбокс
  const navMenu   = document.querySelector(".nav-floating-menu");   // меню
  const navButton = document.querySelector(".nav-toggle-btn");      // кнопка (бургер)

  if (!searchBar || !searchToggle || !searchInput) return;

  // ======== БАЗА ВСЕХ УПРАЖНЕНИЙ (страница + якорь) ========
  const EXERCISES = [
    // ТРЕНИРОВКА 1
    { title: "ПРИСЕДАНИЯ С ГАНТЕЛЯМИ", url: "index.html#ex1" },
    { title: "Румынская тяга",         url: "index.html#ex2" },
    { title: "ЯГОДИЧНЫЙ МОСТ",         url: "index.html#ex3" },
    { title: "СКРУЧИВАНИЯ",            url: "index.html#ex4" },
    { title: "ПЛАНКА",                 url: "index.html#ex5" },

    // ТРЕНИРОВКА 2
    { title: "ТЯГА ВЕРХНЕГО БЛОКА",           url: "index2.html#ex6" },
    { title: "ТЯГА ГОРИЗОНТАЛЬНОГО БЛОКА",    url: "index2.html#ex7" },
    { title: "ЖИМ ГАНТЕЛЕЙ СИДЯ",             url: "index2.html#ex8" },
    { title: "ОТЖИМАНИЯ ОТ СКАМЬИ",           url: "index2.html#ex9" },
    { title: "РАЗВЕДЕНИЕ ГАНТЕЛЕЙ В СТОРОНЫ", url: "index2.html#ex10" },
    { title: "ПОДЪЕМ НОГ ЛЕЖА",               url: "index2.html#ex11" },

    // ОПЦИОНАЛЬНЫЙ ДЕНЬ
    { title: "ВЫПАДЫ НА МЕСТЕ",        url: "index3.html#ex12" },
    { title: "МАХИ НОГОЙ НАЗАД",       url: "index3.html#ex13" },
    { title: "ЯГОДИЧНЫЙ МОСТ",         url: "index3.html#ex14" },
    { title: "ГИПЕРЭКСТЕНЗИЯ",         url: "index3.html#ex15" },
    { title: "КАРДИО",                 url: "index3.html#ex16" }
  ];

  const TRANSITION_MS = 350;
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/ё/g, "е")
      .replace(/\s+/g, " ")
      .trim();

  // ======== ОТКРЫТЬ / ЗАКРЫТЬ ПОИСК ========
  function openSearch() {
    // если открыли поиск — закрываем меню
    if (navToggle) navToggle.checked = false;

    searchBar.classList.add("open");
    searchInput.classList.add("open");

    setTimeout(() => searchInput.focus(), 120);
  }

  function closeSearch(clear = true) {
    searchBar.classList.remove("open");
    searchInput.classList.remove("open");

    if (clear) {
      setTimeout(() => {
        searchInput.value = "";
      }, TRANSITION_MS);
    }
  }

  // ======== ЗАПУСК ПОИСКА (по Enter) ========
  function runSearch() {
    const query = normalize(searchInput.value);
    if (!query || query.length < 2) return;

    // приоритет: сначала текущая страница, потом остальные
    const sorted = [...EXERCISES].sort((a, b) => {
      const aSame = a.url.startsWith(currentPage + "#");
      const bSame = b.url.startsWith(currentPage + "#");
      if (aSame === bSame) return 0;
      return aSame ? -1 : 1;
    });

    const target = sorted.find((ex) =>
      normalize(ex.title).includes(query)
    );

    if (!target) return;

    const [page, hash] = target.url.split("#");

    if (page === currentPage) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      closeSearch(); // убираем панель поиска
    } else {
      window.location.href = target.url;
    }
  }

  // ======== ПОИСК: обработчики ========

  // клик по иконке лупы
  searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    if (searchBar.classList.contains("open")) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  // Enter в поле запускает поиск (по всем страницам)
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
  });

  // ======== НАВИГАЦИЯ: открытие / закрытие ========

  if (navToggle && navButton && navMenu) {
    // Клик по кнопке (бургер)
    navButton.addEventListener("click", (e) => {
      e.preventDefault();      // отключаем стандартный toggle label'ом
      e.stopPropagation();     // чтобы document.click не сработал на этот же клик

      navToggle.checked = !navToggle.checked;

      // если открыли меню — закрываем поиск
      if (navToggle.checked) {
        closeSearch();
      }
    });

    // Клик по документу:
    //  - закрывает поиск, если клик вне него
    //  - закрывает меню, если оно открыто и клик вне меню/кнопки
    document.addEventListener("click", (e) => {
      const target = e.target;

      // --- закрытие поиска вне зоны ---
      if (
        !searchBar.contains(target) &&
        !searchToggle.contains(target)
      ) {
        closeSearch();
      }

      // --- закрытие навигации одним тапом вне меню ---
      if (navToggle.checked) {
        const clickedOnButton = navButton.contains(target);
        const clickedInsideMenu = navMenu.contains(target);

        if (!clickedOnButton && !clickedInsideMenu) {
          navToggle.checked = false;
        }
      }
    });
  } else {
    // если навигации нет (на какой-то странице) — просто закрываем поиск по клику вне
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (
        !searchBar.contains(target) &&
        !searchToggle.contains(target)
      ) {
        closeSearch();
      }
    });
  }
});
