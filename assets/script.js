let previousMonth = moment().subtract(1, "month").format('YYYY/MM/DD');
console.log(previousMonth)

const censusKey = "a0c1493a1c79e4680d709f96001b49d5df683b82";
const weatherAPI = "4392f23b16ef4173136c90ec556dff94";
const newsAPI = "839c97c1784e48ea9080960111bbc030";

$(document).ready(function () {

    $(".submit").on("click", function(event) {
        event.preventDefault();
        let searchLocation = $("#search-input").val();
        startSearch(searchLocation);
        // startCensusSearch(searchLocation);
        startNewsHeadlines(searchLocation);
    })

    // function startCensusSearch(searchLocation) {
    //     const censusUrl = "https://api.census.gov/data/2014/pep/natstprc?get=STNAME,POP&DATE_=7&for=state:" + searchLocation + "&key=" + censusKey;

    //     $.ajax({
    //         url: corsAnywherePrefix + censusUrl,
    //         method: "GET",
    //     })
    //     .then(function(response) {
    //         console.log(response)
    //     })
    
    // }

    function startNewsHeadlines(searchLocation) {
        $(".news-container").empty();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Off",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
                "x-rapidapi-key": "ec9dfe9dc8msh78e949798989417p1e7203jsn200ebc7e2cc5",
                "x-bingapis-sdk": "true"
            }
        }
        
        $.ajax(settings).done(function (newsResponse) {
            console.log(newsResponse);

            $(".news-container").text("Major headlines in " + searchLocation);
            let newsCard = $("<div>").addClass("news-card")

            for (let i = 0; i < 9; i++) {
                let newsImage = $("<img>").attr("src", newsResponse.value[i].image.thumbnail.contentUrl)
                newsImage.addClass(".thumbnail")
                let headlines = $("<h2>")
                let newsHyperLink = $("<a>").attr("href", newsResponse.value[i].url)
                newsHyperLink.text(newsResponse.value[i].name)

                headlines.append(newsHyperLink)
                newsCard.append(newsImage, headlines)
                $(".news-container").append(newsCard)

            }
        });
    }

    function startSearch(searchLocation) {
        $(".map-container").empty();
        $(".map").empty();
        $(".forecast-container").empty();
        const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchLocation + "&appid=" + weatherAPI + "&units=imperial";
        $.ajax({
            url: weatherUrl,
            method: "GET"
        })
        .then(function (responseWeather) {
            console.log(responseWeather)
            let longitude = responseWeather.coord.lon;
            let latitude = responseWeather.coord.lat;
            let weatherIconCode = responseWeather.weather[0].icon;
            var weatherIconLink = "http://openweathermap.org/img/wn/" + weatherIconCode + ".png"

            $(".forecast-container").text("Current weather outlook and forecast for " + searchLocation)

            let weatherCard = $("<div>").addClass("weather-card")
            let cardHeader = $("<h5>").text(responseWeather.name)
            let weatherIcon = $("<img>").attr("src", weatherIconLink)
            let temp = $("<p>").text("Temp: " + responseWeather.main.temp + "\xB0F");
            let humidity = $("<p>").text("Humidity: " + responseWeather.main.humidity + "%");
            let windSpeed = $("<p>").text("Wind: " + responseWeather.wind.speed + " mph")

            weatherCard.append(cardHeader, weatherIcon, temp, humidity, windSpeed)
            $(".forecast-container").append(weatherCard)

            $(".map-container").text("Map overview of " + responseWeather.name)
            var map = new ol.Map({
                target: 'map',
                layers: [
                  new ol.layer.Tile({
                    source: new ol.source.OSM()
                  })
                ],
                view: new ol.View({
                  center: ol.proj.fromLonLat([longitude, latitude]),
                  zoom: 8
                })
            });
        });
        createForecastCards(searchLocation);
    }

    function createForecastCards(searchLocation) {
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
                        
                    $(".forecast-container").append(forecastCard);
                })
            }
    }
})
