// CONFIG
const API_KEY = '09823de2d29802c6d591fd79b74bb4cd';
const LAT = 14.67; // Quezon City
const LON = 121.05;

// DOM ELEMENTS
const currentTemp = document.getElementById('current-temp');
const currentDesc = document.getElementById('current-desc');
const currentIcon = document.getElementById('current-icon');
const forecastContainer = document.getElementById('forecast-cards');
const spotlightContainer = document.getElementById('spotlight-cards');

// FETCH WEATHER
async function fetchWeather() {
  try {
    // Current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
    );
    const currentData = await currentRes.json();

    // 5-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
    );
    const forecastData = await forecastRes.json();

    // Display
    displayCurrentWeather(currentData);
    displayForecast(forecastData);

  } catch (error) {
    console.error('Weather error:', error);
    currentTemp.textContent = 'Error loading weather';
  }
}

function displayCurrentWeather(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;
  currentDesc.textContent = capitalize(data.weather[0].description);
  currentIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  currentIcon.alt = data.weather[0].description;
}

function displayForecast(data) {
  forecastContainer.innerHTML = '';
  const daily = getDailyForecast(data.list);

  daily.slice(0, 3).forEach(day => {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    const date = new Date(day.dt * 1000);
    
    card.innerHTML = `
      <p><strong>${date.toLocaleDateString('en-US', { weekday: 'short' })}</strong></p>
      <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
      <p>${day.main.temp.toFixed(0)}&deg;C</p>
      <p>${capitalize(day.weather[0].description)}</p>
    `;
    forecastContainer.appendChild(card);
  });
}

// Get one forecast per day (around noon)
function getDailyForecast(list) {
  const now = new Date();
  const forecasts = [];
  const seenDates = new Set();

  for (let item of list) {
    const date = new Date(item.dt * 1000);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    
    if (key !== `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}` &&
        date.getHours() >= 11 && date.getHours() <= 13 &&
        !seenDates.has(key)) {
      seenDates.add(key);
      forecasts.push(item);
    }
  }
  return forecasts;
}

// FETCH SPOTLIGHTS
async function fetchSpotlights() {
  try {
    const res = await fetch('./data/members.json');
    const members = await res.json();
    
    // Filter gold (3) & silver (2)
    const premium = members.filter(m => m.membershipLevel >= 2);
    
    // Shuffle & pick 3
    const shuffled = [...premium].sort(() => Math.random() - 0.5);
    const spotlights = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = '';
    spotlights.forEach(member => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      
      const badgeClass = member.membershipLevel === 3 ? 'gold' : 'silver';
      const badgeText = member.membershipLevel === 3 ? '🥇 Gold Member' : '🥈 Silver Member';

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <span class="badge ${badgeClass}">${badgeText}</span>
        <p class="phone">📞 ${member.phone}</p>
        <p class="address">📍 ${member.address}</p>
        <a href="${member.website}" target="_blank" class="btn-secondary">Visit Website</a>
      `;
      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Spotlights error:', error);
  }
}

// HELPER
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchSpotlights();

  // Last modified (if chamber.js doesn't handle it)
  const lastMod = document.getElementById('lastModified');
  if (lastMod) lastMod.textContent = document.lastModified;
});