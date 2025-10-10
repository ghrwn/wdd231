document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("currentyear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModEl = document.getElementById("lastModified");
  if (lastModEl) lastModEl.textContent = document.lastModified || new Date().toLocaleString();
});