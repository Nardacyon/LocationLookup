mapsKey = "AIzaSyCV28S3i7AYMjrj5nMX99lyOo6zp8w6Gz4";

mapsURL = "https://maps.googleapis.com/maps/api/js?key=" + mapsKey + "&callback=initMap"

$.ajax({
    url: mapsURL,
    method: "GET"
})

.then(function(response) {
    console.log(response)
});

console.log(mapsURL)