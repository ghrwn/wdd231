/* main.js — site-wide script for LasaPH */
document.addEventListener("DOMContentLoaded", () => {
  // Year + last modified
  const yearEl = document.getElementById("currentyear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModEl = document.getElementById("lastModified");
  if (lastModEl) lastModEl.textContent = document.lastModified ? `Last Modified: ${document.lastModified}` : "";

  // Mobile nav toggle
  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.querySelector(".main-nav");
  const mobileNav = document.querySelector(".mobile-nav");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      if (mainNav) mainNav.style.display = expanded ? "" : "none";
      if (mobileNav) mobileNav.style.display = expanded ? "none" : "block";
    });
  }

  // Restore nav display for larger screens on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 641) {
      if (mainNav) mainNav.style.display = "";
      if (mobileNav) mobileNav.style.display = "none";
      if (hamburger) hamburger.setAttribute("aria-expanded", "false");
    } else {
      if (mainNav) mainNav.style.display = "none";
    }
  });

  // Accessibility: close any open <dialog> with Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll("dialog[open]").forEach(d => d.close());
    }
  });

  // stored under 'lasa_preferred_category'
  const savedCategory = localStorage.getItem("lasa_preferred_category");
  if (savedCategory) {
    // pages can read localStorage and act on it
    console.log("Preferred category:", savedCategory);
  }
});