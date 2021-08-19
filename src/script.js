let apiKey = "71af1676c3761d98953a8f7745c3a282";

let searchCity = document.querySelector("#searchCityForm");
searchCity.addEventListener("submit", showSearchCity);

function showSearchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enterCity");
  document.getElementById("currentCity").innerHTML = cityInput.value;

  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiCity).then(showCityTemp);
}
function showCityTemp(response) {
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentHumidity = document.querySelector("#humidity");
  let dataCurrentHumidity = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `${dataCurrentHumidity}%`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${response.data.wind.speed} m/s`;
  let currentweatherdescription = document.querySelector("#weatherdescription");
  currentweatherdescription.innerHTML =
    response.data.weather[0].description.toUpperCase();
  let currentLocation = document.querySelector("#currentCity");
  currentLocation.innerHTML = response.data.name;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiCurrentCity = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiCurrentCity).then(showCityTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getCurrentPosition);

let date = document.querySelector("#dateToday");
let now = new Date();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
document.getElementById(
  "dateToday"
).innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

//ignore for now
function displayTempCelcisus(event) {
  event.preventDefault();
  document.getElementById("temperature").innerHTML = 19;
}
let currentCelciusTemp = document.querySelector("#celciusLink");
currentCelciusTemp.addEventListener("click", displayTempCelcisus);

function displayTempFahrenheit(event) {
  event.preventDefault();
  document.getElementById("temperature").innerHTML = Math.round(
    (19 * 9) / 5 + 32
  );
}
let currentFahrenheitTemp = document.querySelector("#fahrenheitLink");
currentFahrenheitTemp.addEventListener("click", displayTempFahrenheit);
