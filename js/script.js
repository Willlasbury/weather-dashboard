// TODO:  get api key from email when it is sent out
// TODO:  create a link to https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
let key = '433504929c3f849b429bb998b8932527'

function getCurrentWeather(lat, lon, key, unit){

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`).then( function(response){
        return response.json()
    }).then( function (data){
        // TODO:   display city name, the date, an icon representation of weather
                // conditions, the temperature, the humidity, and the wind speed
        let conditions = data.list[0].main
        let cityName = data.city.name
        let date = dayjs().format('MM/DD/YYYY')
        let icon = data.list[0].weather[0].icon
        let temp = conditions.temp
        let humidity = conditions.humidity
        let windSpeed = data.list[0].wind.speed
        // let futureWeather = something
    })
}

function findNoon(string){
    // string style "YYYY-MM-DD hh:mm:ss"
    let array = string.split("")
    if ((Number(array[11]) === 1) && Number(array[12]) === 2){
        return true
    } else { 
        return false
    }

}


function getFutureWeather(lat, lon, key, unit){

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`).then( function(response){
        return response.json()
    }).then( function (data){
        storage = []
        // extract dt_text from data to find noon weather from list
        for (let i = 0; i < data.list.length; i++) {
            let dt_text = data.list[i].dt_txt
            if (findNoon(dt_text)) {
                storage.push(data.list[i])
            }
        }

        // get variables for each day form storage
        for (let i = 0; i < storage.length; i++) {
            // console.log("storage:", storage)
            console.log(`storage${i}:`, storage[i])
            // conditions, the temperature, the humidity, and the wind speed
            let date = dayjs(storage[i].dt_txt).format('MM/DD/YYYY')
            console.log("date:", date)
            let icon = storage[i].weather[0].icon
            console.log("icon:", icon)
            let temp = storage[i].main.temp
            console.log("temp:", temp)
            let humidity = storage[i].main.humidity
            console.log("humidity:", humidity)
            let windSpeed = storage[i].wind.speed
            // let futureWeather = something
        }
    })
}
// TODO: display city name, the date, an icon representation of weather

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
        getCurrentWeather(latitude, longitude, key, 'imperial')
        getFutureWeather(latitude, longitude, key, 'imperial')
        
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
        