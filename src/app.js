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

function getForecast(coordinates) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  let forecastElement = document.querySelector("#forecast");
  console.log(apiUrl);
  axios.get(apiUrl).then(forecastElement);
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
