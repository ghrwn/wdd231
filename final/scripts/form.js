document.addEventListener("DOMContentLoaded", () => {
  const ts = document.getElementById("timestamp");
  if (ts) ts.value = new Date().toISOString();

  document.querySelectorAll(".open-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.target;
      const dlg = document.getElementById(id);
      if (dlg) dlg.showModal();
    });
  });
  document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => btn.closest("dialog").close());
  });
});