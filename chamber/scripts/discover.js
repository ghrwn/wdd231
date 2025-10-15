// --- VISIT MESSAGE using localStorage ---
document.addEventListener("DOMContentLoaded", () => {
  const visitMessage = document.getElementById("visit-message");
  const msToDays = 86400000;
  const today = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((today - lastVisit) / msToDays);
    if (daysBetween < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", today);
  loadDiscoverItems();
});

// --- LOAD DISCOVER ITEMS from JSON ---
async function loadDiscoverItems() {
  try {
    const response = await fetch("./data/discover.json");
    if (!response.ok) throw new Error("Network error loading data");
    const places = await response.json();
    displayPlaces(places);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// --- DISPLAY CARDS ---
function displayPlaces(places) {
  const grid = document.getElementById("discover-grid");
  grid.innerHTML = "";

  places.forEach((place, index) => {
    const card = document.createElement("div");
    card.classList.add("discover-card");
    card.setAttribute("style", `grid-area: card${index + 1}`);

    card.innerHTML = `
      <figure class="image-container">
        <img src="images/${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
        <figcaption>
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <address>${place.address}</address>
          <button class="learn-more">Learn More</button>
        </figcaption>
      </figure>
    `;
    grid.appendChild(card);
  });
}