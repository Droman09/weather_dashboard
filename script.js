// query select 
var conditions = $(".condition-spot");
var forecast = $(".forecast");
//default city list 
var cities = ["Chicago", "Los Angeles", "New York"];

//display

function display(){
    forecast.empty()
    conditions.empty()
    var city = $(this).attr("city-name");
    var apiKey = "7315fad7d14bb6e3be75a7b373082527";
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    // console.log(queryUrl)

}

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
renderCities()