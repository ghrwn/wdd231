// Set timestamp when form loads
document.addEventListener("DOMContentLoaded", () => {
  const timestamp = document.getElementById("timestamp");
  if (timestamp) timestamp.value = new Date().toISOString();

  // Modal controls
  const openButtons = document.querySelectorAll(".open-modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.dataset.target;
      document.getElementById(modalId).showModal();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest("dialog").close();
    });
  });
});