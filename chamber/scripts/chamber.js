// Toggle between grid and list view
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#members-display");

gridButton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listButton.addEventListener("click", () => {
  display.classList.add("list");
  display.classList.remove("grid");
});

// Fetch members and display
async function fetchMembers() {
  try {
    const response = await fetch("./data/members.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members) {
  const container = document.querySelector("#members-display");
  container.innerHTML = ""; // Clear any existing content

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    // Membership badge
    let badge = "";
    if (member.membershipLevel === 3) badge = "🥇 Gold Member";
    else if (member.membershipLevel === 2) badge = "🥈 Silver Member";
    else badge = "⭐ Member";

    // Grid View Content
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="200" height="150">
      <h3>${member.name}</h3>
      <p class="badge">${badge}</p>
      <p class="category">${member.category}</p>
      <p class="address">${member.address}</p>
      <p class="phone">${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

    // List View - hide image, rearrange layout via CSS
    container.appendChild(card);
  });
}

// Display last modified date
document.addEventListener("DOMContentLoaded", function() {
  const lastModElement = document.getElementById("lastModified");
  if (lastModElement) {
    lastModElement.textContent = document.lastModified;
  }
});

// Initialize on load
fetchMembers();