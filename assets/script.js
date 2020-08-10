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
    console.log(response)
})