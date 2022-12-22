var cityList = JSON.parse(localStorage.getItem('savedCityArray'));
// Searchbox Variables
var searchBox = $('#search-box');
var cityInput = $('#city-input')
var cityLst = $('#city-list');

// Weather Display Variables
var crntDay = $('#current')
var fiveDay = $('#five-day')

// Save City to local storage
function saveCity(cityName) {
    cityList = JSON.parse(localStorage.getItem('savedCityArray'));
    console.log(cityList)
    if (cityList === null) {
        cityList = []
    }
    
    var checkCity = cityList.includes(cityName)
    console.log(cityName)
    console.log(cityList.includes(cityName))
        
    if (!checkCity) {
        if (cityList.length < 7) {
            cityList.unshift(cityName)
        } else {
            cityList.pop()
            cityList.unshift(cityName)
        }
    }

    console.log(cityList)

    localStorage.setItem('savedCityArray', JSON.stringify(cityList));

    renderCityList()
}

// function retrieveCityObj(event) {
//     var cityName = event.target.text()
//     console.log(cityName)
// }

function renderCityList() {
    cityLst.empty()
    var loadedCities = JSON.parse(localStorage.getItem('savedCityArray'));
    console.log(loadedCities)
    for (let i = 0; i < loadedCities.length; i++) {
        var cityEl = $('<button>')
        cityEl.addClass('btn btn-secondary col-12 my-1')
        cityEl.text(loadedCities[i])
        cityLst.append(cityEl)
    }
}

function showAlert() {
    $('.alert').css('display', 'block');
                setInterval(function () {
                    $('.alert').css('display','none')
                    clearInterval
                }, 2000)
}

function getGeoCoordinate(cityObj) {
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityObj[0]+'&limit=1&appid=e1a4381a327810c6af4c7a917596228b';
    console.log(requestURL);
    fetch(requestURL)
    .then(function (response) {
        return response.json();
        
      })
        .then(function(data){
            console.log(data)
            if (data.length == 0) {
                
            showAlert()
                
            } else {
                cityObj.cityLon = data[0].lon;
                cityObj.cityLat = data[0].lat;
                getWeatherData(cityObj);
                // Save cityobj to city list
            }
        })
}
function writeCurrentDay(data,chosen){
    console.log(chosen)
    crntDay.children('h1').text(data.city.name + ' ('+ dayjs().format('DD-MM') + ')')
         $('#current-image').attr('src', 'http://openweathermap.org/img/wn/'+data.list[chosen].weather[0].icon+'@2x.png')
         crntDay.children().children().children().children('.temperature').text(Math.round(data.list[chosen].main.temp) + ' °C')
         crntDay.children().children().children().children('.wind').text(Math.round(data.list[chosen].wind.speed) + ' km/h')
         crntDay.children().children().children().children('.humidity').text(data.list[chosen].main.humidity + '%')
}

function currentDayWeather(data) {
    var crntTime = Math.floor(dayjs()/1000)

    console.log(crntTime)
    var target = crntTime
    var min;
    var chosen = 0;

    // Find index closest to current time
    for (let i = 0; i < 8; i++) {
        min = Math.abs(data.list[chosen].dt - target);
        if (Math.abs(data.list[i].dt - target) < min){
            chosen = i;
        }     
    }
    writeCurrentDay(data,chosen)
}
    
    

function fiveDayWeather(data) {
    fiveDay.empty()
    console.log(data)
    for (i = 0; i < 5; i++) {
    // change to 24 hour intervals
    var interval = 7+8 * i;
    // if (interval >= 40) {
    //     interval = 39;
    
    var unixTime = data.list[interval].dt;

   
    
    var fiveDayCard = $('<div>');
    fiveDayCard.addClass('card')
    
    var fiveImg = $('<img>');
    fiveImg.addClass('card-img-top')

    var dateTitle = $('<h3>');
    dateTitle.addClass('card-title')
    
    var fiveBody = $('<div>')
    fiveBody.addClass('class-body')
    fiveBody.append(dateTitle, fiveImg)
    

    var fiveCondtions = $('<ul>');
    fiveCondtions.addClass('list-group list-group-flush')
    
    var fiveTemp = $('<li>');
    fiveTemp.addClass('list-group-item')
    
    var fiveWind = $('<li>');
    fiveWind.addClass('list-group-item')
    
    var fiveHum = $('<li>');
    fiveHum.addClass('list-group-item') 

    fiveCondtions.append(fiveTemp, fiveWind, fiveHum)
    fiveDayCard.append(fiveBody, fiveCondtions)
    fiveDay.append(fiveDayCard)
    
    console.log(interval)
    console.log(data.list[interval])
    dateTitle.text(dayjs.unix(unixTime).format('DD-MM'))
    fiveImg.attr('src', 'http://openweathermap.org/img/wn/'+data.list[interval].weather[0].icon+'@2x.png')
    fiveTemp.text(Math.round(data.list[interval].main.temp) + ' °C')
    fiveWind.text(Math.round(data.list[interval].wind.speed) + ' km/h')
    fiveHum.text(data.list[interval].main.humidity + '%')
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
            var cityName = data.city.name
            saveCity(cityName);

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
$('#city-list').on('click', function(event){
        var cityObj = [
            cityName = event.target.textContent,
        ] 
    
        console.log(cityObj)
    
        getGeoCoordinate(cityObj);
    })

renderCityList()
// Assign time of city

// Load weather API

// Assign time of city

// Update the current forecast and 5 day forecast

// Save to local storage