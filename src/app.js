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

function showTemperature(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}° C`;
}

// Displays searched city and the correct temp (celsius/metric) w/API/AJAX

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let newCity = document.querySelector("#city-name");

  newCity.innerHTML = `${cityInput.value}`;

  let apiKey = "b9e4a8acfd074502d8896fee3c101e74";
  let newSearch = document.querySelector("#search-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newSearch}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", showCity);
