const btnF = document.querySelector(".fahrenheit");
const btnC = document.querySelector(".celcius");
const toggleTemp = document.querySelectorAll(".toggle-temp");
const temp = document.querySelector(".temp");
let tempInF;

document.addEventListener("DOMContentLoaded", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    document.querySelector(".weather").textContent =
      "Geolocation is not supported by this browser.";
  }
});

// Retrive weather info with OpenWeatherMap API
function getWeather(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
      lat +
      "&lon=" +
      lon +
      "&APPID=8f5da5a3c95b945d1b9119efc8bb164b"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.querySelector("#city").textContent = data.name + ",";
      document.querySelector("#country").textContent = data.sys.country;
      document.querySelector(".description").textContent =
        data.weather[0].description;
      tempInF = Math.round(data.main.temp);
      temp.textContent = tempInF;
      document.querySelector(".icon").src =
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    })
    .catch(function () {
      document.querySelector(".block").textContent =
        "Could not retrieve weather info.";
    });
}

toggleTemp.forEach((button) => {
  button.addEventListener("click", convertTemp);
});

// Convert between Celcius and Fahrenheit
function convertTemp(e) {
  btnF.classList.contains("lighten")
    ? (temp.textContent = tempInF)
    : (temp.textContent = Math.round((tempInF - 32) / 1.8));
  toggleTemp.forEach((button) => button.classList.toggle("lighten"));
}
