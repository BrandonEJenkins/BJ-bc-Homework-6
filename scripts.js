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





// When #searcButton clicked run ajax call
$('#searchButton').click(function(event) {
    
    event.preventDefault();

    alert('Search button was clicked...DELETE MY SCRIPT');

    var citySearchInput = $('#citySearchInput').val();

    var stateSearchInput = $('#stateSearchInput').val();

    var apiKeyOWM = "bcc2fd2eebd337186fd819184e5d5181";    

    if (citySearchInput === "" || stateSearchInput === "") {
        alert('Must enter city AND state to get this bad boy rolling!  Otherwise, all you get is Houston, TX weather results!')
        citySearchInput = "Houston"
        stateSearchInput = "Texas"
    }

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

        // var pOne = $('<p>').text(citySearchInput + ", " + stateSearchInput);
        var pOne = $('<p id="cityTextStyle">').text(citySearchInput + ", " + stateSearchInput);
    
        var pTwo = $('<p>').text('Temperature: ' + tempResponse + "\xB0F");

        var pThree = $('<p>').text('Wind Speed: ' + windResponse + "m/s");

        var pFour = $('<p>').text('Humidity: ' + humidityResponse + "%");

        // var pFive = $('<p>').text(wind.speed.value + " " + wind.speed.unit + " " + wind.speed.name);

        var newDivBreak = $('<hr><br>');
    
        responseDiv.append(pOne);

        // $('pOne').css('font-size': '18px');

        responseDiv.append(pTwo);

        responseDiv.append(pThree);

        responseDiv.append(pFour);

        // responseDiv.append(pFive);

        responseDiv.append(newDivBreak);
        
        $('#weatherSearchResult').append(responseDiv);

        $('.list-group').append('<li class="list-group-item">' + citySearchInput + ", " + stateSearchInput + '</li>');
    
    });

    console.group('Search Results');
    console.log(citySearchInput + ", " + stateSearchInput);
    console.groupEnd();

});

