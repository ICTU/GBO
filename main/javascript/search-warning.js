(function () {
  const WARNING_ID = "search-scope-warning";

  const MESSAGE =
    "Let op: deze zoekfunctie zoekt alleen binnen dit documentatie-onderdeel. " +
    "Documentatie in andere onderdelen wordt niet meegenomen.";

  function addSearchWarning() {
    const search = document.querySelector(".md-search");
    const input = document.querySelector(".md-search__input");

    if (!search || !input) {
      return;
    }

    // Voorkom dubbele initialisatie bij instant navigation
    if (search.dataset.scopeWarningInitialized === "true") {
      return;
    }

    search.dataset.scopeWarningInitialized = "true";

    // Maak de scope ook zichtbaar vóórdat iemand typt
    input.setAttribute("placeholder", "Zoeken binnen dit onderdeel");
    input.setAttribute("aria-describedby", WARNING_ID);

    const warning = document.createElement("div");
    warning.id = WARNING_ID;
    warning.className = "md-search-scope-warning";
    warning.setAttribute("role", "status");
    warning.setAttribute("aria-live", "polite");
    warning.textContent = MESSAGE;

    const form = search.querySelector(".md-search__form");

    if (form) {
      form.insertAdjacentElement("afterend", warning);
    }

    function showWarning() {
      search.classList.add("md-search--scope-warning-visible");
    }

    function hideWarningWhenEmpty() {
      if (!input.value && document.activeElement !== input) {
        search.classList.remove("md-search--scope-warning-visible");
      }
    }

    input.addEventListener("focus", showWarning);
    input.addEventListener("input", showWarning);
    input.addEventListener("blur", hideWarningWhenEmpty);

    // Bij reset/clear blijft de waarschuwing zichtbaar zolang het zoekveld focus heeft
    const reset = search.querySelector(".md-search__reset");
    if (reset) {
      reset.addEventListener("click", function () {
        window.setTimeout(function () {
          if (document.activeElement === input) {
            showWarning();
          } else {
            hideWarningWhenEmpty();
          }
        }, 0);
      });
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(addSearchWarning);
  } else {
    document.addEventListener("DOMContentLoaded", addSearchWarning);
  }
})();
