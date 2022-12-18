var searchBox = $('#search-box');
var cityInput = $('#city-input')
var cityLst = $('#city-list');

// Load local storage

function getGeoCoordinate(cityObj) {
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityObj[0]+'&limit=5&appid=e1a4381a327810c6af4c7a917596228b';
    console.log(requestURL);
    fetch(requestURL)
    .then(function (response) {
        return response.json();
      })
        .then(function(data){
            console.log(data)
            if (data[0].lon == undefined) {
                console.log("invalid city")
            } else {
                cityObj.cityLon = data[0].lon;
                cityObj.cityLat = data[0].lat;
                console.log(cityObj)
                getWeatherData(cityObj);
            }
        })
}

function getWeatherData(cityObj) {
 var requestURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+cityObj.cityLat+'&lon='+cityObj.cityLon+'&appid=e1a4381a327810c6af4c7a917596228b';
 fetch(requestURL)
 .then(function (response) {
     return response.json();
   })
     .then(function(data){
         console.log(data);
         
        })
}
    


// Add city searched for to list
var handleInputCity = function (event){
    event.preventDefault();
    var cityObj = [
        cityName = cityInput.val(),
    ] 

    console.log(cityObj)

    getGeoCoordinate(cityObj);
    // getWeatherData(cityLon, cityLat)

  
    // var cityEl = $('<li>');
    // cityEl.attr('id', city);
    // cityEl.text(city);

    // console.log(cityEl);

    // cityLst.append(cityEl);
}

searchBox.on('submit', handleInputCity)
// Assign time of city

// Load weather API

// Assign time of city

// Update the current forecast and 5 day forecast

// Save to local storage