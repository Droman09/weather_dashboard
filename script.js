// query select 
var conditions = $(".condition-spot");
var forecast = $(".forecast");
//default city list 
var cities = ["Chicago", "Los Angeles", "New York"];
// var load = localStorage.getItem("city")

// displayCity(load)

//display

function displayCity(){
    forecast.empty()
    conditions.empty()
    var city = $(this).attr("city-name");
    var apiKey = "7315fad7d14bb6e3be75a7b373082527";
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    // console.log(queryUrl)
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
            console.log(response)
        var conditionDiv = $("<div class ='condtions'>")
        
        //city name 
        var cityName = response.city.name;
        var nameDisplay = $("<h4>").text(cityName)

        // city time 
        var cityTime = response.list[0].dt_txt;
        nameDisplay.append(" " + cityTime)
        // var time = $("<h5>").text(cityTime)
        // console.log(cityTime)

        conditionDiv.append(nameDisplay)

        ///icon
        // var cityIcon = response.list[0].weather[0].icon;
        // console.log(cityIcon)
        var cityIconImg = `http://openweathermap.org/img/wn/`+response.list[0].weather[0].icon+`@2x.png`;
        console.log(cityIconImg)
        var icon = $("<img>").attr("src", cityIconImg)
        // console.log(icon)
        conditionDiv.append(icon)
        
        //conditions 
            ///temp
        var temperature = response.list[0].main.temp;
        console.log(temperature)
        var pTemp = $("<p>").text("Temperature: " + temperature + "°F")
        conditionDiv.append(pTemp)
            //humidity 
        var humidity = response.list[0].main.humidity;
        var pHum = $("<p>").text("Humidity: " + humidity);
        conditionDiv.append(pHum);
            //wind speed
        var windSpeed = response.list[0].wind.speed;
        var pWind = $("<p>").text("Wind speed: " + windSpeed);
        conditionDiv.append(pWind);
            //IV index
        var lat = response.city.coord.lat 
        var lon = response.city.coord.lon
        var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+ apiKey;

        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function(uvResponse){
            console.log(uvResponse)
            var uv = uvResponse.value;
            var uvDisplay = $("<p>").text("UV index: " + uv)

            if (uv < 3){
                uvDisplay.addClass("text-white bg-success")
            } else if (uv >= 3 && uv <6){
                uvDisplay.addClass("text-white bg-danger")
            } else if (uv >= 6){
                uvDisplay.addClass("text-white bg-primary")
            }
            
            conditionDiv.append(uvDisplay)
            console.log(uv, uvDisplay)
        })
   
        conditions.append(conditionDiv)
        
        var forecastDiv = $("<div class='forecast-spot'>");
         var hForecast = $("<h4>")
         hForecast.text("5 Day Forecast")
         forecastDiv.append(hForecast)

         //storing 5 day list in a variable 
         var fiveList = response.list;
         
         for (var i = 0; i<fiveList.length; i+=8 ){
                var forecastSlot = $("<div class='shadow-lg card bg-light mb-3' style='max-width: 24rem;'>");

                var forecastTime = fiveList[i].dt_txt;
                var pTime = $("<p>").text(forecastTime)

                // var forecastIcon = fiveList[i].weather[0].icon;
                var imgIcons = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+fiveList[i].weather[0].icon+"@2x.png")

                var fiveTemp = fiveList[i].main.temp
                pTemps = $("<p>").text("Temp: " + fiveTemp +"°F");
                pTemps.addClass("card-text")

                var fiveHumidity = fiveList[i].main.humidity; 
                pHumi = $("<p>").text("Humidity: " + fiveHumidity);
                pHumi.addClass("card-text");
                
                forecastSlot.append(pTime, imgIcons, pTemps, pHumi)
                forecastDiv.append(forecastSlot)
         }    
        forecast.append(forecastDiv); 
    })
    renderCities()
}
displayCity()

function renderCities(){
    $(".city-view").empty();
    for( var i = 0; i < cities.length; i++) {
        var p = $("<p>"); 
        p.addClass("city-select");
        p.attr("city-name", cities[i]);
        p.text(cities[i]);
        $(".city-view").append(p);
    }    
}

$(".add-city").click(function(event){
    event.preventDefault();
    
    var city = $(".add").val().trim();
    cities.push(city); 
    renderCities()
    localStorage.setItem("city", city)
    // displayCity(city)
  
    console.log(localStorage)
})


$(document).on("click", ".city-select", displayCity)