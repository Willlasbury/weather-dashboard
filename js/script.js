let key = "433504929c3f849b429bb998b8932527";

// get the current weather conditions
function getCurrentWeather(lat, lon, key, unit) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let conditions = data.list[0].main;
      let cityName = data.city.name;
      let date = dayjs().format("MM/DD/YYYY");
      let icon = data.list[0].weather[0].icon;
      let temp = conditions.temp;
      let humidity = conditions.humidity;
      let windSpeed = data.list[0].wind.speed;
      displayWeather(cityName, date, icon, temp, humidity, windSpeed);
    });
}
// display current weather for searched city
function displayWeather(name, date, icon, temp, humidity, windSpeed) {
  // hold todays weather and five day forcast
  let weatherSec = document.querySelector("#weather-display");
  weatherSec.textContent = "";
  // create div for all of todays weather
  let todayWeather = document.createElement("article");
  // TODO: add styling to today's weather
  todayWeather.setAttribute("class", "");

  // create weather conditions list
  let condUl = document.createElement("ul");
  // header for today's weather
  let cityDateH1 = document.createElement("h1");
  cityDateH1.textContent = `${name} (${date}) ${icon}`;

  let templi = document.createElement("li");
  templi.textContent = `Temperature: ${Math.floor(temp)}℉`;
  let humli = document.createElement("li");
  humli.textContent = `Humidity: ${humidity}%`;
  let windli = document.createElement("li");
  windli.textContent = `Wind Speed: ${windSpeed}mph`;

  // TODO: get icon from api

  condUl.appendChild(templi);
  condUl.appendChild(humli);
  condUl.appendChild(windli);
  weatherSec.appendChild(todayWeather);
  todayWeather.appendChild(cityDateH1);
  todayWeather.appendChild(condUl);
}
// get the weather for the next five days
function getFutureWeather(lat, lon, key, unit) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      storage = [];
      // extract dt_text from data to find noon weather from list
      for (let i = 0; i < data.list.length; i++) {
        let dt_text = data.list[i].dt_txt;
        if (findNoon(dt_text)) {
          storage.push(data.list[i]);
        }
      }
      // get variables for each day form storage
      for (let i = 0; i < storage.length; i++) {
        let date = dayjs(storage[i].dt_txt).format("MM/DD/YYYY");
        let icon = storage[i].weather[0].icon;
        let temp = storage[i].main.temp;
        let humidity = storage[i].main.humidity;
        let windSpeed = storage[i].wind.speed;
        displayWeatherCard(date, icon, temp, humidity, windSpeed);
      }
    });
}

function displayWeatherCard(date, icon, temp, humidity, windSpeed) {
  // hold todays weather and five day forcast
  let weatherSec = document.querySelector("#weather-display");
  // create section for all cards
  let weatherCard = document.createElement("section");
  // TODO: add styling

  // TODO: get icon from api

  let dateLi = document.createElement("li");
  dateLi.textContent = date;
  let iconImg = document.createElement("image");
  iconImg.textContent = icon;
  let templi = document.createElement("li");
  templi.textContent = `Temperature: ${Math.floor(temp)}℉`;
  let humli = document.createElement("li");
  humli.textContent = `Humidity: ${humidity}%`;
  let windli = document.createElement("li");
  windli.textContent = `Wind Speed: ${windSpeed}mph`;

  weatherCard.appendChild(dateLi);
  weatherCard.appendChild(iconImg);
  weatherCard.appendChild(templi);
  weatherCard.appendChild(humli);
  weatherCard.appendChild(windli);
  weatherSec.appendChild(weatherCard);
}
// search data and pull out any data from noon
function findNoon(string) {
  // string style "YYYY-MM-DD hh:mm:ss"
  let array = string.split("");
  if (Number(array[11]) === 1 && Number(array[12]) === 2) {
    return true;
  } else {
    return false;
  }
}

// get the longitude and latitude for a city
function getLatLon(city, key) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      getCurrentWeather(latitude, longitude, key, "imperial");
      getFutureWeather(latitude, longitude, key, "imperial");
    });
}

// function that pulls in the user input
function getCityIn() {
  let cityIn = document.querySelector("#city-input");

  let city = cityIn.value.trim();
  if (city) {
    storeCities(city);
  }
  cityIn.value = "";
  return city;
}

function quickSearch() {
  let cityBtn = document.querySelector("#quick-search");
  let city = cityBtn.textContent;
  return city;
}

// take user input from doc and store in local memory
function storeCities(city) {
  if (!localStorage.getItem("cities")) {
    let cityStorage = [];
    cityStorage.push(city);
    localStorage.setItem("cities", JSON.stringify(cityStorage));
  } else {
    let cityList = JSON.parse(localStorage.getItem("cities"));
    if (!cityList.includes(city)) {
      cityList.push(city);
      localStorage.setItem("cities", JSON.stringify(cityList));
    }
  }
}

// take cities key from memory and display whats stored
function displayCities() {
  let cityUl = document.querySelector("#saved-cities");
  // remove all buttons already displayed to prevent redundant buttons
  cityUl.textContent = "";
  let cityList = JSON.parse(localStorage.getItem("cities"));

  for (let i = 0; i < cityList.length; i++) {
    let cityBtn = document.createElement("button");
    cityBtn.setAttribute("id", "quick-search");
    cityBtn.textContent = cityList[i];
    cityBtn.setAttribute(
      "class",
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full my-3"
    );

    cityUl.appendChild(cityBtn);
    cityBtn.addEventListener("click", function () {
      getLatLon(quickSearch(), key);
      displayCities();
    });
  }
}

// listen for searches and update cities and display
let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", function () {
  getLatLon(getCityIn(), key);
  displayCities();
});

displayCities();
