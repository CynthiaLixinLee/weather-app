$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {  
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
  $(".weather").html("Geolocation is not supported by this browser.")
  }
});

function getWeather(lat, lon) {
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&APPID=8f5da5a3c95b945d1b9119efc8bb164b", function (data) {
    var json = JSON.parse(JSON.stringify(data));
    $("#city").html(json.name + ", ");
    $("#country").html(json.sys.country);
    $("#description").html(json.weather[0].description);
    $("#temperature").html(Math.round(json.main.temp));
    document.getElementById("icon").src = "http://openweathermap.org/img/w/" + (json.weather[0].icon) +".png"
  });
};

$("#btnFahrenheit").click(function() {
  if ($("#btnFahrenheit").hasClass("lighten")) {
    $("#btnFahrenheit").removeClass("lighten");
    $("#btnCelsius").addClass("lighten");
    $("#temperature").html(Math.round((parseInt($("#temperature").text()) * 1.8) + 32));
  }
})

$("#btnCelsius").click(function() {
  if ($("#btnCelsius").hasClass("lighten")) {
    $("#btnCelsius").removeClass("lighten");
    $("#btnFahrenheit").addClass("lighten");
    $("#temperature").html(Math.round((parseInt($("#temperature").text()) - 32)/ 1.8));
  }
})