$(document).ready(function () {
  console.log("ready!");


  $("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("button was clicked")

    var userInput = $("#userInput").val().trim();
    console.log(userInput);

    // var APIKey = "815a2a795482a610cc6a76c55b68ac5a";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + userInput + ",us&APPID=815a2a795482a610cc6a76c55b68ac5a";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {
        console.log(response);
        var results = response.list;
        $("#tbody").empty();

        var forecastSlotsToDisplay = 6;
        var bounds = results.length >= forecastSlotsToDisplay ? 5 : results.length;

        for (var i = 0; i <= bounds; i++) {
          var time = moment.unix(results[i].dt);
          var currentTime = moment();
          var diff = currentTime.diff(time)
          if (diff > 0) {
            continue;
          }
          var displayTime = time.calendar()
          var pullTemp = results[i].main.temp;
          var displayTemp = parseInt((pullTemp - 273.15) * 1.8) + 32;
          var displayWeather = results[i].weather[0].description;
          // var temp = 
          // var weather 

          $("#tbody").append(
            "<tr><td>" + displayTime +
            "</td><td>" + displayTemp +
            "</td><td>" + displayWeather +
            "</td></tr>")
        }
      });
    });

    var location = "";

    $("#submit").on("click", eventInfo);

    function eventInfo() {
      event.preventDefault();

      location = $("#userInput").val().trim();
      var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + location + "&start_date.keyword=today&token=YMCHN5J2AOTS2WEM2FF2";


      $.ajax({
        url: queryURL,
        method: "GET",

      }).done(function (response) {
        console.log(response);

        var results = response.events;

        for (i = 0; i < results.length; i++) {

          var event = results[i].name.text;
          var eventLink = results[i].url;
          var eventName = "<a href='" + eventLink + "'>" + event + "</a>";
          var eventTime = moment(results[i].start.local).format("LT, ddd");
          console.log(eventTime);
          console.log(eventLink);

          $("#eventResults").append(
            "<tr><td id='addRow'>" + eventName +
            "</td><td id='addRow'>" + eventTime +
            "</td></tr>");
        }
      });
    }
 

})
