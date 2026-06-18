const API_KEY = '9f117a3429baad80f475d096a5e1e8fc';
const API_BASE = 'https://api.openweathermap.org/data/2.5';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('cityInput');
  const btn = document.getElementById('checkWeatherBtn');
  const messages = document.getElementById('messages');

  btn.addEventListener('click', () => {
    const city = input.value.trim();
    if (!city) {
      return;
    }
    fetchWeather(city);
  });

  //enter pole
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });
});

function showMessage(text, type = 'info') {
  const messages = document.getElementById('messages');
  messages.textContent = text;
  messages.className = type;
}

function fetchWeather(city) {
  const currentPromise = getCurrentWeatherXHR(city);
  const forecastPromise = getForecastFetch(city);

  //uzywamy promise by nie stracic jednego z wyszukiwan
  Promise.allSettled([currentPromise, forecastPromise]).then(results => {
    // res 0 = curr, res 1 = forecast
    const [currentResult, forecastResult] = results;

    if (currentResult.status === 'fulfilled') {
      renderCurrentWeather(currentResult.value);
    } else {
      renderWeatErr(currentResult.reason);
    }

    if (forecastResult.status === 'fulfilled') {
      renderPrognoza(forecastResult.value);
    } else {
      renderPrognozaError(forecastResult.reason);
    }

    //usuwa ladowanie
  });
}

function getCurrentWeatherXHR(city) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pl`;
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => reject({ message: 'blad xhr' });
    xhr.send();
  });
}

function getForecastFetch(city) {
  const url = `${API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pl`;
  return fetch(url).then(resp => {
    if (!resp.ok) {
      return resp.json().then(j => { throw j; }).catch(() => { throw { message: `${resp.status} ${resp.statusText}` }; });
    }
    return resp.json();
  }).catch(err => {
    err = null;
    return null;
  });
}


//renderowanie
function renderCurrentWeather(data) {
  const container = document.getElementById('currentWeather');
  container.innerHTML = '';

  const card = document.createElement('article');
  card.className = 'weather-card';

  const date = new Date((data.dt || Date.now()/1000) * 1000);
  const icon = data.weather && data.weather[0] && data.weather[0].icon ? data.weather[0].icon : '01d';
  const desc = data.weather && data.weather[0] && data.weather[0].description ? capitalize(data.weather[0].description) : '';

  card.innerHTML = `
    <header class="card-header">
      <h2>${escapeHtml(data.name || '')}, ${escapeHtml(data.sys && data.sys.country || '')}</h2>
      <time>${formatDateTime(date)}</time>
    </header>
    <div class="card-body">
      <img class="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${escapeHtml(desc)}" />
      <div class="temps">
        <div class="temp">${Math.round(data.main.temp)} <span class="deg">°C</span></div>
        <div class="feels">Odczuwalna: ${Math.round(data.main.feels_like)} °C</div>
        <div class="desc">${escapeHtml(desc)}</div>
        <div class="meta">Wilgotność: ${data.main.humidity}% • Wiatr: ${Math.round(data.wind.speed)} m/s</div>
      </div>
    </div>
  `;
  container.appendChild(card);
}

function renderWeatErr(err) {
  const container = document.getElementById('currentWeather');
  container.innerHTML = `<div class="error">blad pobieranie pogody: ${escapeHtml(err.message || JSON.stringify(err))}</div>`;
}

function renderPrognoza(data) {
  const container = document.getElementById('forecast');
  container.innerHTML = ''; //clean prev
  //pierwsze 5
  const count = 5;
  const entries = data.list.slice(0, count);

  entries.forEach(entry => {
    const card = document.createElement('article');
    card.className = 'forecast-card';
    const date = new Date(entry.dt * 1000);
    const icon = entry.weather && entry.weather[0] && entry.weather[0].icon ? entry.weather[0].icon : '01d';
    const desc = entry.weather && entry.weather[0] && entry.weather[0].description ? capitalize(entry.weather[0].description) : '';

    card.innerHTML = `
      <div class="fc-time">${formatDateTime(date)}</div>
      <div class="fc-body">
        <img class="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${escapeHtml(desc)}" />
        <div class="fc-info">
          <div class="temp">${Math.round(entry.main.temp)} <span class="deg">°C</span></div>
          <div class="feels">Odczuwalna: ${Math.round(entry.main.feels_like)} °C</div>
          <div class="desc">${escapeHtml(desc)}</div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderPrognozaError(err) {
  const container = document.getElementById('forecast');
  container.innerHTML = `<div class="error">Błąd pobierania prognozy: ${escapeHtml(err.message || JSON.stringify(err))}</div>`;
}

/* Helpers */

function formatDateTime(date) {
  // format dd.mm.yyyy HH:MM
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function escapeHtml(s) {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
