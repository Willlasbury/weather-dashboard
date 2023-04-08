// TODO:  get api key from email when it is sent out
// TODO:  create a link to https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// TODO: set up geocoder api to convert lat, lon to cities
    // TODO: it should use the same api key

// TODO: build function that pulls in the user input 
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
        
        myModal.addEventListener('shown.bs.modal', function () {
          myInput.focus()
        })