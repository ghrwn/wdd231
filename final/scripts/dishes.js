/* dishes.js — load dishes.json and render cards + dialog modals */
async function loadDishes() {
  try {
    const res = await fetch("./data/dishes.json");
    if (!res.ok) throw new Error("Failed to load dishes.json");
    const dishes = await res.json();
    renderDishes(dishes);
  } catch (err) {
    console.error(err);
    const main = document.querySelector("main");
    if (main) {
      main.insertAdjacentHTML("beforeend", `<p style="color:crimson">Failed to load dishes data.</p>`);
    }
  }
}

function renderDishes(dishes) {
  const grid = document.querySelector(".grid") || document.getElementById("dishes-grid");
  if (!grid) return;

  dishes.forEach(d => {
    const div = document.createElement("article");
    div.className = "card";
    div.innerHTML = `
      <figure class="media">
        <img src="images/${d.image}" alt="${d.name}" loading="lazy" width="400" height="260">
        <figcaption>
          <h3>${escapeHtml(d.name)}</h3>
          <p>${escapeHtml(d.category)} • ${escapeHtml(d.region)}</p>
        </figcaption>
      </figure>
      <div class="content">
        <h3>${escapeHtml(d.name)}</h3>
        <p>${escapeHtml(d.description)}</p>
        <address>${escapeHtml(d.address)}</address>
      </div>
      <div class="actions">
        <button class="small-btn" data-open="${d.id}">Details</button>
        <button class="small-btn secondary" data-save="${d.id}">Save Preference</button>
      </div>
    `;
    grid.appendChild(div);

    // Create dialog element per dish (append to body)
    createDialogForDish(d);
  });

  // events: open details
  document.querySelectorAll("button[data-open]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = btn.dataset.open;
      const dlg = document.getElementById(`dlg-${id}`);
      if (dlg) dlg.showModal();
    });
  });

  // save preference
  document.querySelectorAll("button[data-save]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.save;
      localStorage.setItem("lasa_preferred_category", id);
      btn.textContent = "Saved ✓";
      setTimeout(() => btn.textContent = "Save Preference", 1200);
    });
  });
}

function createDialogForDish(d) {
  // avoid duplicates
  if (document.getElementById(`dlg-${d.id}`)) return;

  const dialog = document.createElement("dialog");
  dialog.id = `dlg-${d.id}`;
  dialog.setAttribute("aria-labelledby", `title-${d.id}`);
  dialog.innerHTML = `
    <button class="dialog-close" aria-label="Close dialog">✕</button>
    <div class="dialog-content">
      <div class="dialog-media">
        <img src="images/${d.image}" alt="${d.name}">
      </div>
      <div class="dialog-body">
        <h3 id="title-${d.id}">${escapeHtml(d.name)}</h3>
        <p><strong>Region:</strong> ${escapeHtml(d.region)}</p>
        <p><strong>Category:</strong> ${escapeHtml(d.category)}</p>
        <p><strong>Ingredients:</strong> ${escapeHtml(d.ingredients.join(", "))}</p>
        <p>${escapeHtml(d.description)}</p>
      </div>
    </div>
  `;
  document.body.appendChild(dialog);

  // close button
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

  // close by clicking backdrop
  dialog.addEventListener("click", (ev) => {
    if (ev.target === dialog) dialog.close();
  });
}

/* simple escaping to avoid injecting content */
function escapeHtml(s) {
  if (!s) return "";
  return s.replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
}

/* init when the page loads */
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".grid") || document.getElementById("dishes-grid")) {
    loadDishes();
  }
});