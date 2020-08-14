// const mapsKey = "pk.eyJ1IjoibmFyZGFjeW9uIiwiYSI6ImNrZHVpYnYydzA4NHQyeW9namNzYW5ncDQifQ.d9XwB7yRUuZAtnXx-4pGHQ";
// var locationInput = "San%20Diego,CA";

// const corsAnywherePrefix = 'https://cors-anywhere.herokuapp.com/';
// const mapsURL = "https://api.mapbox.com/?access_token=" + mapsKey;

// $.ajax({
//     url: corsAnywherePrefix + mapsURL,
//     method: 'GET'
// })
// .then(function (responseMaps){
//     console.log(responseMaps);
//     var map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/light-v10',
//         center: [-96, 37.8],
//         zoom: 3
//       });
// })
// .catch(function (error) {
//     console.log(error);
// });

// var map = new ol.Map({
//     target: 'map',
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM()
//       })
//     ],
//     view: new ol.View({
//       center: ol.proj.fromLonLat([-117.16, 32.72]),
//       zoom: 4
//     })
//   });

const censusKey = "a0c1493a1c79e4680d709f96001b49d5df683b82";
const censusUrl = "https://api.census.gov/data/2014/pep/natstprc?get=STNAME,POP&DATE_=7&for=state:*&key=" + censusKey;

$.ajax({
    url: censusUrl,
    method: "GET",
})
.then(function(response) {
    // console.log(response)
})

let weatherAPI = "4392f23b16ef4173136c90ec556dff94";

$(document).ready(function () {
    //coord for SD map will generally show SoCal
    let longitude = -117.16;
    let latitude = 32.72;
    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([longitude, latitude]),
          zoom: 4
        })
      });

    $(".submit").on("click", function(event) {
        event.preventDefault();
        let searchLocation = $("#search-input").val();
        startSearch(searchLocation);
    })

    function startSearch(searchLocation) {

    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchLocation + "&appid=" + weatherAPI + "&units=imperial";
    $.ajax({
        url: weatherUrl,
        method: "GET"
    })
    .then(function (responseWeather) {
        console.log(responseWeather)
        let weatherIconCode = responseWeather.weather[0].icon;
        var weatherIconLink = "http://openweathermap.org/img/wn/" + weatherIconCode + ".png"

        let weatherCard = $("<div>").addClass("weather-card")
        let cardHeader = $("<h5>").text(responseWeather.name)
        let weatherIcon = $("<img>").attr("src", weatherIconLink)
        let temp = $("<p>").text("Temp: " + responseWeather.main.temp + "\xB0F");
        let humidity = $("<p>").text("Humidity: " + responseWeather.main.humidity + "%");

        weatherCard.append(cardHeader, weatherIcon, temp, humidity)
        $(".forecast").append(weatherCard)

        const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchLocation + "&appid=" + weatherAPI + "&units=imperial";

        for(let i = 0; i < 5; i++) {    

            let selectArr = 2 + (i * 8);
            
            $.ajax({
                url: forecastUrl,
                method: "GET"
            })
            .then(function(responseForecast) {

                let forecastIconCode = responseForecast.list[selectArr].weather[0].icon;
                var forecastIconLink = "http://openweathermap.org/img/wn/" + forecastIconCode + ".png"

                let forecastCard = $("<div>").addClass("forecast-card");

                let date = (moment.unix(responseForecast.list[selectArr].dt).format("MM/DD/YYYY"));
                let forecastDate = $("<h5>").text(date);
                forecastDate.addClass("forecast-date");

                let forecastIcon = $("<img>").attr("src", forecastIconLink);

                let forecastTemp = $("<p>").text("Temp: " + responseForecast.list[selectArr].main.temp + "\xB0F");
                forecastTemp.addClass("card-text");

                let forecastHumidity = $("<p>").text("Humidity: " + responseForecast.list[selectArr].main.humidity + "%");
                forecastHumidity.addClass("card-text");

                forecastCard.append(forecastDate);
                forecastCard.append(forecastIcon);
                forecastCard.append(forecastTemp);
                forecastCard.append(forecastHumidity);
                
                $(".forecast").append(forecastCard);
            })
        }
    });

    }
    
})

