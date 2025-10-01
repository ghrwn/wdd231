// DOM Elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');

// API URL for Trier, Germany (lat: 49.75, lon: 6.64) - Metric Units
const apiKey = '09823de2d29802c6d591fd79b74bb4cd';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=${apiKey}`;

// Fetch Weather Data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); // For testing
    displayResults(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Display Results on Page
function displayResults(data) {
  // Temperature
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

  // Weather Icon & Description
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
  const description = data.weather[0].description;

  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', description);
  weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1); // Capitalize first letter
}

apiFetch();