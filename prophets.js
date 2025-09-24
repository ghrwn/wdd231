const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.table(data.prophets); // For debugging in browser console
    displayProphets(data.prophets);
  } catch (error) {
    console.error('Error fetching prophet data:', error);
  }
}

const displayProphets = (prophets) => {
  const cards = document.querySelector('#cards');

  prophets.forEach((prophet) => {
    // Create elements
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let dob = document.createElement('p');
    let pob = document.createElement('p');
    let status = document.createElement('p');
    let order = document.createElement('p');
    let children = document.createElement('p');

    // Set content and attributes
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    dob.textContent = `Date of Birth: ${prophet.birthdate}`;
    pob.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Optional Enhancements
    status.textContent = prophet.death ? `Died: ${prophet.death}` : 'Living';
    status.style.fontWeight = 'bold';
    status.style.color = prophet.death ? '#e74c3c' : '#27ae60';

    order.textContent = `Order: #${prophet.order}`;
    order.style.fontSize = '0.85rem';
    order.style.color = '#7f8c8d';

    children.textContent = `Children: ${prophet.numofchildren}`;
    children.style.fontSize = '0.85rem';
    children.style.color = '#7f8c8d';

    // Append to card
    card.appendChild(fullName);
    card.appendChild(dob);
    card.appendChild(pob);
    card.appendChild(status);
    card.appendChild(order);
    card.appendChild(children);
    card.appendChild(portrait);

    // Append card to container
    cards.appendChild(card);
  });
};

// Fetch and display data when page loads
getProphetData();