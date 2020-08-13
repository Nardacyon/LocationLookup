const mapsKey = "KAWAMdLGHWecahgkpIBMIHCAvzGhCgeG";
var locationInput = "San%20Diego,CA";
const mapsURL = "http://www.mapquestapi.com/geocoding/v1/address?key=" + mapsKey + "&location=" + locationInput;

$.ajax({
    url: mapsURL,
    method: "GET",
})
.then(function(response) {
    console.log(response)
    console.log(response.results[0].locations[0].mapUrl)
});

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

        
        // let weatherIconCode = responseWeather.
    });

    }
    
})
