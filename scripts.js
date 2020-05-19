// Weather App Script File

// Browser load and/or refresh instructions
$( document ).ready( function () {

    // Declare variables to be assigned values later to enable global scope
    var citySearchInput;

    var stateSearchInput;
    
    // Get last city and state search input items from local storage
    var cityStore = window.localStorage.getItem("citySearchInput");
    
    var stateStore = window.localStorage.getItem("stateSearchInput");
    

    citySearchInput = cityStore;
    stateSearchInput = stateStore;

    getWeather();
    getFiveDay();

    // When #searcButton clicked run ajax call
    $('#searchButton').click(function(event) {
        
        // Prevent default if button clicked
        event.preventDefault();
    
        // Clear previous results from five day forecast sections when search button clicked
        $('.fiveDayForecastDiv').empty();

        // Grabs city and state input form values for use in subsequent functions
        citySearchInput = $('#citySearchInput').val();
    
        stateSearchInput = $('#stateSearchInput').val(); 
    
        // Alerts user that city and state default to Houston Texas if either city or state input form is empty
        if (citySearchInput === "" || stateSearchInput === "") {
            alert('Must enter city AND state to get this bad boy rolling!  Otherwise, all you get is Houston, TX weather results!')
            citySearchInput = "Houston"
            stateSearchInput = "Texas"
        }
        
        // Sets last city and state search inputs from local storage
        window.localStorage.setItem("citySearchInput", citySearchInput);
    
        window.localStorage.setItem("stateSearchInput", stateSearchInput);
    
        // Execute ajax call functions
        getWeather();
        getFiveDay();
    
    });
    
    
    function getWeather() {
    
        // Store api key and url for weather ajax call
        var apiKeyOWM = "bcc2fd2eebd337186fd819184e5d5181";   
    
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "," + stateSearchInput + "&units=imperial&APPID=" + apiKeyOWM;
        
        // ajax call to request http data using get method
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            
            console.log(response);
            console.log(response.main.temp);
    
            var responseDiv = $("<div class='queryResult'>");
        
            // Create variables to store results of ajax call
            var tempResponse = response.main.temp;
    
            var windResponse = response.wind.speed;
    
            var humidityResponse = response.main.humidity;
    
            var longLocation = response.coord.lon; // Store city longitude to be used in uv index call
    
            var latLocation = response.coord.lat; // Store city latitude to be used in uv index call
    
            // Creates new p tags for ajax call results to be appended to browser elements later
            var pOne = $('<p id="cityTextStyle">').text(citySearchInput + ", " + stateSearchInput);
        
            var pTwo = $('<p>').text('Temperature: ' + tempResponse + "\xB0F");
    
            var pThree = $('<p>').text('Wind Speed: ' + windResponse + "m/s");
    
            var pFour = $('<p>').text('Humidity: ' + humidityResponse + "%");
    
            // Inserts horizontal rule and line break between weather search results sections
            var newDivBreak = $('<hr><br>');
        
            // Append ajax call p tags to div
            responseDiv.append(pOne);
    
            // $('pOne').css('font-size': '18px');
    
            responseDiv.append(pTwo);
    
            responseDiv.append(pThree);
    
            responseDiv.append(pFour);
    
            // responseDiv.append(pFive);
    
            responseDiv.append(newDivBreak);
            
            // $('#weatherSearchResult').append(responseDiv + pDate);

            // Append new div with p tags from ajax results to div in browser
            $('#weatherSearchResult').append(responseDiv);
    
            // Style search result div to create scroll bar on container overflow
            $('weatherSearchResult').css("overflow-y", "scroll");
            
            // Append new li with city and state inputs to browser ul element
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
                
                // For loop to iterate over list array
                for (let i = 0; i < forecast.list.length; i++) {
                    
                    var noon = "12:00:00";
    
                    // Variable stores date time for the ith element in the list array
                    var time = forecast.list[i].dt_txt;
    
                    // if statement that executes steps if dt_txt equals noon
                    if (time.includes(noon)) {
    
                        console.log(time);

                        console.log(forecast.list[0].weather[0].main);

                        // Create new div to hold p tag results from ajax call
                        var forecastWeatherDiv = $('<div class="col p-2 mx-2 rounded-sm text-white  weatherCard">');

                        // Store ajax call results in variable to be appeneded to browser
                        var forecastWeatherEl = forecast.list[i].weather[0].main;

                        // Create new p tag with text property 
                        var pForecastWeather = $('<p>').text('Weather: ' + forecastWeatherEl);

                        // Append p tag with ajax results to new div
                        forecastWeatherDiv.append(pForecastWeather);

                        // Store ajax call results in variable to be appeneded to browser
                        var forecastTempEl = forecast.list[i].main.temp;

                        // Create new p tag with text property 
                        var pForecastTemp = $('<p>').text('Temperature: ' + forecastTempEl + '\xB0F');

                        // Append p tag with ajax results to new div
                        forecastWeatherDiv.append(pForecastTemp);

                        // Store ajax call results in variable to be appeneded to browser
                        var forecastHumEl = forecast.list[i].main.humidity;

                        // Create new p tag with text property 
                        var pForecastHum = $('<p>').text('Humidity: ' + forecastHumEl + '%');

                        // Append p tag with ajax results to new div
                        forecastWeatherDiv.append(pForecastHum);

                        // Append div with p tag to div in browser
                        $('.fiveDayForecastDiv').append(forecastWeatherDiv);
                    }
                }
                console.log(JSON.stringify(forecast.list[0].main.temp));
            });
    }
})

