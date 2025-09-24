const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayProphets(data.prophets);
  } catch (error) {
    console.error('Error fetching prophet data:', error);
  }
}

function displayProphets(prophets) {
  const cards = document.querySelector('#cards');

  prophets.forEach(prophet => {
    // Create elements
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const img = document.createElement('img');
    const dob = document.createElement('p');
    const pob = document.createElement('p');

    // Set content
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    img.setAttribute('src', prophet.imageurl);
    img.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    img.setAttribute('loading', 'lazy');
    img.setAttribute('width', '340');
    img.setAttribute('height', '440');

    dob.textContent = `Date of Birth: ${prophet.birthdate}`;
    pob.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Append to card
    card.appendChild(fullName);
    card.appendChild(dob);
    card.appendChild(pob);
    card.appendChild(img);

    // Append card to container
    cards.appendChild(card);
  });
}

// Fetch and render data on page load
getProphetData();