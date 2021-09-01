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

function getForecast(coordinates) {
  let apiKey = "71af1676c3761d98953a8f7745c3a282";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
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

  currentCelciusTemp = response.data.main.temp;

  getForecast(response.data.coord);

  fahrenheitLink.classList.remove("currentlyDisplaying");
  celciusLink.classList.add("currentlyDisplaying");

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);
}
function search(city) {
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiCity).then(showCityTemp);
}
search("Vienna");

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
).innerHTML = `Last updated: ${currentDay} ${currentHour}:${currentMinutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class = "weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }.png"
                  alt=""
                  width="36"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temp-max"
                    ><strong>${Math.round(
                      forecastDay.temp.max
                    )}°</strong>|</span
                  >
                  <span class="weather-forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTempCelcius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("currentlyDisplaying");
  celciusLink.classList.add("currentlyDisplaying");
  document.getElementById("temperature").innerHTML =
    Math.round(currentCelciusTemp);
}

let currentCelciusTemp = document.querySelector("#celciusLink");
currentCelciusTemp.addEventListener("click", displayTempCelcius);

function displayTempFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("currentlyDisplaying");
  fahrenheitLink.classList.add("currentlyDisplaying");
  document.getElementById("temperature").innerHTML = Math.round(
    (currentCelciusTemp * 9) / 5 + 32
  );
}
let currentFahrenheitTemp = document.querySelector("#fahrenheitLink");
currentFahrenheitTemp.addEventListener("click", displayTempFahrenheit);
