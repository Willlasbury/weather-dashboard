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
      let condArray = [temp, humidity, windSpeed]
      // TODO:  append to main card
    });
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
        // TODO: append as multicard element
      }
    });
}
// TODO: display city name, the date, an icon representation of weather

// get the longitude and latitude for a city
function getLatLon(city, key) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log("data:", data)
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      // console.log("latitude, longitute:", latitude, longitude)
      // TODO: send lat, lon to openweather
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

// take user input from doc and store in local memory
function storeCities(city) {
  if (!localStorage.getItem("cities")) {
    let cityStorage = [];
    cityStorage.push(city);
    localStorage.setItem("cities", JSON.stringify(cityStorage));
  } else {
    let cityList = JSON.parse(localStorage.getItem("cities"));
    cityList.push(city);
    localStorage.setItem("cities", JSON.stringify(cityList));
  }
}

// TODO: display current weather for searched city
function diplayWeather(name, date, icon, condArray){
  let weatherSec = document.querySelector('#weather-display')
  let todayWeather = document.createElement('article')
  let cityDateH1 = document.createElement('h1')
  cityDateH1.textContent = `${name} (${date}) ${icon}`
  
  for (let i = 0; i < condArray.length; i++) {
    let condLi = document.createElement("li");
    condLi.textContent = cityList[i];
    condLi.setAttribute(
      "class",
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full my-3"
    );
    cityUl.appendChild(condLi);
  }

}


// TODO: create five day forcast display


// TODO: create card element to display date (MM/DD/YYYY), weather icon,
// temp, wind, and humidity





// take cities key from memory and display whats stored
function displayCities() {
  let cityUl = document.querySelector("#saved-cities");

  let cityList = JSON.parse(localStorage.getItem("cities"));

  for (let i = 0; i < cityList.length; i++) {
    let cityBtn = document.createElement("button");
    cityBtn.textContent = cityList[i];
    cityBtn.setAttribute(
      "class",
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full my-3"
    );
    cityUl.appendChild(cityBtn);
  }
}

// listen for searches and update cities and display
let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", function (){
  getCityIn()
  displayCities()
});


