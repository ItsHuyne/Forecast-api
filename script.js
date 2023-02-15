const appwrap = document.getElementById('forecast')
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
 
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (city) {
  fetch("http://api.weatherapi.com/v1/forecast.json?key=1b74c1d4282547c789331030230802 &q=" 
  + city 
  + "&days=7&aqi=yes&alerts=no")
    .then(weather => {
      appwrap.innerHTML = "";
      return weather.json();
    })
    .then(displayResults);
    
}

function displayResults (weather) {
  
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.location.name}`;
  let country = document.querySelector('.location .country')
  country.innerText = `${weather.location.country}`
  let now = new Date();
  let date = document.querySelector('.date');
  date.innerText = getDayName(now);
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.current.temp_c)}<span>°C</span>`;

  let weather_el = document.querySelector('.weather');
  weather_el.innerText = weather.current.condition.text;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `Low: ${Math.round(weather.forecast.forecastday[0].day.mintemp_c)}°C / High: ${Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}°C`;

  for (let i = 1; i < 7; i++) {
    const dayEl = document.createElement("div")
    dayEl.classList.add('day');

    
    const dayNameEl = document.createElement('div');
    dayNameEl.classList.add('day-name');
    dayNameEl.innerText = getDayName(weather.forecast.forecastday[i].date);
    dayEl.appendChild(dayNameEl);

    const dateEl = document.createElement('div');
    dateEl.classList.add('date');
    dateEl.innerText = getDate(weather.forecast.forecastday[i].date);
    dayEl.appendChild(dateEl);

    const iconEl = document.createElement('img');
    iconEl.classList.add('icon');
    iconEl.src = `https:${weather.forecast.forecastday[i].day.condition.icon}`;
    iconEl.alt = weather.forecast.forecastday[i].day.condition.text;
    dayEl.appendChild(iconEl);

    
    const tempEl = document.createElement('div');
    tempEl.classList.add('temp');
    tempEl.innerHTML = `${Math.round(weather.forecast.forecastday[i].day.avgtemp_c)}<span>°C</span>`;
    dayEl.appendChild(tempEl);

    const hilowEl = document.createElement('div');
    hilowEl.classList.add('hi-low');
    hilowEl.innerText = `Low: ${Math.round(weather.forecast.forecastday[i].day.mintemp_c)}°C / High: ${Math.round(weather.forecast.forecastday[i].day.maxtemp_c)}°C`;
    dayEl.appendChild(hilowEl);

    
    document.querySelector('#forecast').appendChild(dayEl);
  }


  
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    // console.log(day);
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
  }
}
function getDayName(dateStr) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateStr);
  return days[date.getDay()];
}

function getDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
