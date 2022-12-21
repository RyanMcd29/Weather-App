
// Searchbox Variables
var searchBox = $('#search-box');
var cityInput = $('#city-input')
var cityLst = $('#city-list');

// Weather Display Variables
// var crntImg = ('#current-image')
var crntDay = $('#current')
var fiveDay = $('#five-day')

// Load local storage

function getGeoCoordinate(cityObj) {
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityObj[0]+'&limit=1&appid=e1a4381a327810c6af4c7a917596228b';
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
                // Save cityobj to city list
            }
        })
}


function currentDayWeather(data){
    crntDay.children('h1').text(data.city.name)
         $('#current-image').attr('src', 'http://openweathermap.org/img/wn/'+data.list[0].weather[0].icon+'@2x.png')
         crntDay.children().children().children().children('.temperature').text(data.list[0].main.temp + ' degrees')
         crntDay.children().children().children().children('.wind').text(data.list[0].wind.speed + ' kmh')
         crntDay.children().children().children().children('.humidity').text(data.list[0].main.humidity + '%')
}

function fiveDayWeather(data) {
for (i = 1; i < 6; i++) {
    // change i to 24 hour intervals
    var interval = i*4;
    var fiveDayCard = $('<div>')
    var dateTitle = $('<h3>')
    var fiveImg = $('<img>')
    var fiveCondtions = $('<ul>')
    var fiveTemp = $('<li>')
    var fiveWind = $('<li>')
    var fiveHum = $('<li>')
    
    fiveCondtions.append(fiveTemp, fiveWind, fiveHum)
    fiveDayCard.append(dateTitle, fiveImg, fiveCondtions)
    fiveDay.append(fiveDayCard)

    console.log(data.list[i])

    fiveImg.attr('src', 'http://openweathermap.org/img/wn/'+data.list[interval].weather[0].icon+'@2x.png')
    fiveTemp.text(data.list[interval].main.temp + ' degrees')
    fiveWind.text(data.list[interval].wind.speed + ' kmh')
    fiveHum.text(data.list[interval].main.humidity + '%')
    
    console.log(fiveDay)
    
}



}

function getWeatherData(cityObj) {

// Set weather data for current day
 var requestURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+cityObj.cityLat+'&lon='+cityObj.cityLon+'&appid=e1a4381a327810c6af4c7a917596228b&units=metric';
 fetch(requestURL)
 .then(function (response) {
     return response.json();
   })
     .then(function(data){
         console.log(data);
            currentDayWeather(data);
            fiveDayWeather(data);
         
        })

// var requestURLFiveDay = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+cityObj.cityLat+'&lon='+cityObj.cityLon+'&appid=e1a4381a327810c6af4c7a917596228b'
// fetch(requestURLFiveDay)
//         .then(function (response) {
//             return response.json();
//         })
//             .then(function(data){
//                 console.log(data);
//                     fiveDayWeather(data);
    


// Set weather data for next 5 days

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