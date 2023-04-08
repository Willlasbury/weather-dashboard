// TODO:  get api key from email when it is sent out
// TODO:  create a link to https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
let key = '433504929c3f849b429bb998b8932527'

function getWeather(lat, lon, key, unit){

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`).then( function(response){
        return response.json()
    }).then( function (data){
        // TODO: return: the current weather conditions and future weather conditions
        // TODO:   display city name, the date, an icon representation of weather
                // conditions, the temperature, the humidity, and the wind speed
        let conditions = data.list[0].main
        console.log("conditions:", conditions)
        let cityName = data.city.name
        // console.log("cityName:", cityName)
        // let futureWeather = something
        // let date = dayjs.format(DDDD, MM YYYY)
        let icon = data.list[0].weather[0].icon
        console.log("icon:", icon)
        let temp = conditions.temp
        let humidity = conditions.humidity
        let windSpeed = data.list[0].wind.speed
        console.log("windSpeed:", windSpeed)
        console.log("data:", data)
    })
}


// TODO: set up geocoder api to convert lat, lon to cities
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
async function getLatLon(city, key){
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`).then(function(response){
        return response.json()
    }).then(function (data){
        // console.log("data:", data)
        let latitude = data[0].lat
        let longitude = data[0].lon
        // console.log("latitude, longitute:", latitude, longitude)
        // TODO: send lat, lon to openweather
        getWeather(latitude, longitude, key, 'imperial')
        
    })
}

let lat, lon = getLatLon('Seattle', key)
// console.log("lat, longitude:", lat)

// TODO: build function that pulls in the user input 
function getCityIn() {
    let cityIn = document.querySelector('#city-input').value
    return cityIn
}
    // TODO: take user input from doc and store in local memory
    // TODO: update saved cities list to incude the searched city
        // TODO: append search function for quick search

// TODO: take city name and send to geocoder api
        // TODO: return lat and longtiude data

// TODO: send lat, lon to openweather
    // TODO: return: the current weather conditions and future weather conditions
        // TODO:   display city name, the date, an icon representation of weather
            // conditions, the temperature, the humidity, and the wind speed

// TODO: create five day forcast display
    // TODO: create card element to display date (MM/DD/YYYY), weather icon, 
        //temp, wind, and humidity
    

        var myModal = document.getElementById('myModal')
        var myInput = document.getElementById('myInput')
        