var searchBox = $('#search-box');
var cityInput = $('#city-input')
var cityLst = $('#city-list');
console.log(searchBox)
// Load local storage

function getGeoCoordinate(city, cityLon, cityLat) {
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=e1a4381a327810c6af4c7a917596228b';
    console.log(requestURL);
    fetch(requestURL)
    .then(function (response) {
        return response.json();
      })
        .then(function(data){
            console.log(data)
            if (data[0].lon == undefined) {
                window.alert('City is invalid')
            } else {
                cityLon = data[0].lon;
                cityLat = data[0].lat;
            }
        })

}


// Add city searched for to list
var handleInputCity = function (event){
    event.preventDefault();
    var city = cityInput.val(); 

    var cityLon = 0
    var cityLat =0
    getGeoCoordinate(city);

    console.log(city+cityLon+cityLat)
  
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