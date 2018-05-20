function getNameofCountry() {
    var validation = setTimeout(function(){
        $("#name_error").html("Write country correctly.")
    }, 1000)
    // Get Value from input and clear input
    var cityName = document.getElementById("country").value;
    document.getElementById("country").value = "";
    // getCountryData
    $.getJSON('https://restcountries.eu/rest/v2/name/' + cityName + '?fullText=true', function(dataCountry) {
        // clear error function and clear error massage
        clearTimeout(validation);
        $("#name_error").html("")
        // extra var's to make it a bit more clearer
        var latitude = dataCountry[0].latlng[0];
        var longitude = dataCountry[0].latlng[1];
        //display main container
        var contentDiv = document.getElementById("container");
        if(latitude !== undefined) {
            contentDiv.style.display = "block";
            showAllDataUser(latitude, longitude, dataCountry);
        }
    })
}

function showAllDataUser(latitude, longitude, dataCountry) {
    //Get weather of location
    $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + "&lon=" + longitude +'', function(dataCountryWeather) {
        //Push data to html
        $("#region").html(" " + dataCountry[0].region);
        $("#langugage").html(" " + dataCountry[0].languages[0].name);
        $("#currency").html(" " + dataCountry[0].currencies[0].code);
        $("#countryName").html(dataCountry[0].name);
        $(".temperaturee").html(Math.floor(dataCountryWeather.main.temp));
        $(".flagg").attr("src", dataCountry[0].flag);
        $(".weatherImg").attr("src", dataCountryWeather.weather[0].icon);
        console.log(dataCountry[0].flag)
    })
    // Google maps 
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 4
    });
    // Print a marker on the middle of country
    var marker = new google.maps.Marker({
        position:{lat: latitude,lng: longitude},
        map:map
    })
}

// Press enter instead of button 
$("body").keydown(function (event) {
       if (event.keyCode === 13) {
            getNameofCountry()
       }
})// make first letter of text upper case and compare words


