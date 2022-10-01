let currentTime = new Date();

function formatDate(date) {
  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();

  let formattedDate = `${month} ${currentDate}, ${currentYear}`;

  return formattedDate;
}

let newDates = document.querySelector("#date-year");
newDates.innerHTML = `${formatDate(currentTime)}`;

function formatTime(time) {
  let fullTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let formattedTime = `${fullTime}`;

  return formattedTime;
}

let newTime = document.querySelector("#clock");
newTime.innerHTML = `${formatTime(currentTime)}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col" id="weekday">
              SUN<br /><i class="fa-solid fa-cloud-sun" id="daily-icon"></i
              ><br /><span id="daily-temp">20°C</span>
            </div>
            <div class="col" id="weekday">
              MON<br /><i class="fa-solid fa-cloud-rain" id="daily-icon"></i
              ><br /><span id="daily-temp">24°C</span>
            </div>
            <div class="col" id="weekday">
              TUES<br /><i class="fa-solid fa-sun" id="daily-icon"></i
              ><br /><span id="daily-temp">19°C</span>
            </div>
            <div class="col" id="weekday">
              WED<br /><i class="fa-solid fa-cloud-sun" id="daily-icon"></i
              ><br /><span id="daily-temp">22°C</span>
            </div>
            <div class="col" id="weekday">
              THURS<br /><i class="fa-solid fa-sun" id="daily-icon"></i
              ><br /><span id="daily-temp">23°C</span>
            </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-name");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}° C`;
  cityElement.innerHTML = response.data.name;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "b9e4a8acfd074502d8896fee3c101e74";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city");
  search(cityInputElement.value);
}

search("Montreal");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
