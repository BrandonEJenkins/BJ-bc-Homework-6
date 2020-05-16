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
$('#searchButton').on('click', function() {
    alert("button was clicked");
});


var apiKeyOWM = "bcc2fd2eebd337186fd819184e5d5181";
var queryURL = "https//api.openweathermap.org/data/2.5/weather?q=" + London + "&APPID=" + apiKeyOWM;


