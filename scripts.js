// Weather App Script File

// Pseudo Code
    // Create user city search text area
    // Get user city search input
    // Create ajax call to request openweather url data with 'GET' method
    // Declare variable to store function to get url data
    // Declare variable to store results of get method
    // Create function to append user city search history to html element
    // Create event listener for search button
    // Create function that creates new unordered list item when url data fetched
    // Append new unordered list item to existing html element
    // Create variable to store user city search field input
    // Declare variable that stores user inputs and concatenates result into url for ajax call
    // Declare variable that stores base url without the api key and without the specific desired city
    // Declare variable that stores api key
    // Create function that triggers if / else statement when search button clicked to check if city name field is empty when and return input required message to user
    // Declare variable that gets city search text area for use in script
    // Declare variable that gets search button for use in script

// Get html elements
// var cityInputEl = $('#citySearchInput');
// var searchButtonEl = $('#searchButton');

// Click events
$( document ).ready( function () {

    var citySearchInput;

    var stateSearchInput;
    
    var cityStore = window.localStorage.getItem("citySearchInput");
    
    var stateStore = window.localStorage.getItem("stateSearchInput");
    
    citySearchInput = cityStore;
    stateSearchInput = stateStore;

    getWeather();
    getFiveDay();

    // When #searcButton clicked run ajax call
    $('#searchButton').click(function(event) {
        
        event.preventDefault();
    
        $('.fiveDayForecastDiv').empty();

        citySearchInput = $('#citySearchInput').val();
    
        stateSearchInput = $('#stateSearchInput').val(); 
    
        if (citySearchInput === "" || stateSearchInput === "") {
            alert('Must enter city AND state to get this bad boy rolling!  Otherwise, all you get is Houston, TX weather results!')
            citySearchInput = "Houston"
            stateSearchInput = "Texas"
        }
    
        window.localStorage.setItem("citySearchInput", citySearchInput);
    
        window.localStorage.setItem("stateSearchInput", stateSearchInput);
    
        getWeather();
        getFiveDay();
    
    });
    
    
    // window.onbeforeunload = function() {
    //     this.localStorage.setItem("searchResult", $('#weatherSearchResult').val());
    // }
    
    
    function getWeather() {
    
        var apiKeyOWM = "bcc2fd2eebd337186fd819184e5d5181";   
    
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "," + stateSearchInput + "&units=imperial&APPID=" + apiKeyOWM;
    
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            
            console.log(response);
            console.log(response.main.temp);
    
            var responseDiv = $("<div class='queryResult'>");
        
            var tempResponse = response.main.temp;
    
            var windResponse = response.wind.speed;
    
            var humidityResponse = response.main.humidity;
    
            var longLocation = response.coord.lon; // Store city longitude to be used in uv index call
    
            var latLocation = response.coord.lat; // Store city latitude to be used in uv index call
    
            // var date = new Date();
            
            // var month = date.getMonth() + 1;
            // var day = date.getDate();
            // var currentDate = date.getFullYear() + '/' +
            //     (month < 10 ? '0' : '') + month + '/' +
            //     (day < 10 ? '0' : '') + day;
    
            // var pOne = $('<p>').text(citySearchInput + ", " + stateSearchInput);
            var pOne = $('<p id="cityTextStyle">').text(citySearchInput + ", " + stateSearchInput);
        
            var pTwo = $('<p>').text('Temperature: ' + tempResponse + "\xB0F");
    
            var pThree = $('<p>').text('Wind Speed: ' + windResponse + "m/s");
    
            var pFour = $('<p>').text('Humidity: ' + humidityResponse + "%");
    
            // var pFive = $('<p>').text(wind.speed.value + " " + wind.speed.unit + " " + wind.speed.name);
    
            // var pDate = $('<p id="currentDate">').text("(" + currentDate + ")");
    
            var newDivBreak = $('<hr><br>');
        
            responseDiv.append(pOne);
    
            // $('pOne').css('font-size': '18px');
    
            responseDiv.append(pTwo);
    
            responseDiv.append(pThree);
    
            responseDiv.append(pFour);
    
            // responseDiv.append(pFive);
    
            responseDiv.append(newDivBreak);
            
            // $('#weatherSearchResult').append(responseDiv + pDate);
            $('#weatherSearchResult').append(responseDiv);
    
            $('weatherSearchResult').css("overflow-y", "scroll");
    
            $('.list-group').append('<li class="list-group-item">' + citySearchInput + ", " + stateSearchInput + '</li>');
        
        });
    
    }
    
    function getFiveDay() {
    
        var apiKeyOWM = "bcc2fd2eebd337186fd819184e5d5181";   
    
        // url query for 5 day forecast
        var queryFiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchInput + "," + stateSearchInput + "&units=imperial&appid=" + apiKeyOWM;
    
            // ajax call for 5 day forecast
            $.ajax({
                url: queryFiveDayURL,
                method: 'GET'
            }).then(function(forecast) {
                console.log(forecast);
                // console log forecast items: date, an icon representation of weather conditions, the temperature, and the humidity
                console.log(JSON.stringify(forecast.list[0].main.temp));
                
                for (let i = 0; i < forecast.list.length; i++) {
                    
                    var noon = "12:00:00";
    
                    var time = forecast.list[i].dt_txt;
    
                    if (time.includes(noon)) {
    
                        // parse object then append to div
    
                        // var forecastWeatherDescription = JSON.parse(forecast.list.weather.main);
                        // var forecastWeatherDescription = JSON.parse(forecast);

                        // var p5DayWeather = $('<p>').text('Weather: ' + forecastWeatherDescription);

                        // $('.weatherCard').append(p5DayWeather);

                        console.log(time);

                        console.log(forecast.list[0].weather[0].main);

                        // var forecastWeather = JSON.parse(forecast.list[0].weather[0].main);

                        var forecastWeatherDiv = $('<div class="col p-2 mx-2 rounded-sm text-white  weatherCard">');

                        var forecastWeatherEl = forecast.list[i].weather[0].main;

                        var pForecastWeather = $('<p>').text('Weather: ' + forecastWeatherEl);

                        forecastWeatherDiv.append(pForecastWeather);

                        $('.fiveDayForecastDiv').append(forecastWeatherDiv);


                        // var forecastWeather = forecast.list[0].weather[0].main;

                        // var pWeather = $('<p class="forecastDivContents">').text('Conditions: ' + forecastWeather);

                        // $('.weatherCard').append(pWeather);
                    }
    
                }
                console.log(JSON.stringify(forecast.list[0].main.temp));
    
                // var pForecast = forecast.split
    
            });
    }
})

