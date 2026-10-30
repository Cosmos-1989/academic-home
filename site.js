/* Native details elements work without JavaScript; this adds direct section links. */
(() => {
  function revealLinkedSection() {
    let section = document.getElementById(window.location.hash.slice(1));
    while (section) {
      if (section instanceof HTMLDetailsElement) section.open = true;
      section = section.parentElement;
    }
  }

  revealLinkedSection();
  window.addEventListener("hashchange", revealLinkedSection);

  // Include all sections when printing, then restore the reader's open sections.
  let previouslyOpen = [];
  window.addEventListener("beforeprint", () => {
    previouslyOpen = [...document.querySelectorAll("details")].filter(section => section.open);
    document.querySelectorAll("details").forEach(section => { section.open = true; });
  });
  window.addEventListener("afterprint", () => {
    document.querySelectorAll("details").forEach(section => {
      section.open = previouslyOpen.includes(section);
    });
  });
})();
