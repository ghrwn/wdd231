document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // --- Auto highlight active link based on file name in URL ---
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll("#main-nav a");
  links.forEach(a => {
    const href = a.getAttribute("href");
    if (href === currentPage) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });
});