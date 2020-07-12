// ****************************************************************STORAGE

// Init storage
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getStoredLocationData();
console.log(
  'Location set from local storage or set to default: ',
  weatherLocation
);

//*****************************************************************GEOCODING

// Init geocode object (prep for google api call)
const geocode = new Geocode(weatherLocation.city, weatherLocation.stateprov);
console.log(
  '"Geocode" object for fetching official location name & coordinates via Google Geocoding API initialized for specified location: ',
  geocode
);
// Change weather
// geocode.changeLocation('Bancroft', 'ON')

// Get coords on DOM Load, then get weather
document.addEventListener('DOMContentLoaded', getLocData);

// Change location listener
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const stateprov = document.getElementById('stateprov').value;
  console.log('Change location listener input values: ', city, stateprov);

  geocode.changeLocation(city, stateprov);

  // Store location data to local storage
  storage.storeLocationData(city, stateprov);

  // Get and display weather
  getLocData();

  // Close Modal
  $('#locModal').modal('hide');
});

// ******************************************************DOM LOAD FUNCTION
// ***************************************************GOOGLE GEOCODING API CALL

// Get coords (and location name)
// from Google API, then get weather
function getLocData() {
  console.log(
    'Document loaded, preparing to retrieve specified location name & coordinates...'
  );
  geocode
    .getLocData()
    .then((response) => {
      console.log("Google's API response: ");
      console.log('Retrieved location name: ', response.locName);
      console.log('Retrieved coordinates: ', response.locCoords);
      geocode.locDataToVar(response);
      initWeather(response.locCoords);
      getWeather();
    })
    .catch((err) => console.log(err));
}

// *************************************************************WEATHER

// Init weather object
let weather;
function initWeather(coords) {
  weather = new Weather(coords.lat, coords.lng);
  console.log(
    '"Weather" object initialized. Ready to fetch weather using specified coordinates via "Open Weather Map" API: ',
    weather
  );
}

// Init UI
const ui = new UI();

// *********************************************************OPEN WEATHER MAP API CALL

// Get weather from OpenWeatherMap API, then paint ui
function getWeather() {
  weather
    .getWeather()
    .then((response) => {
      console.log("OpenWeatherMap's API response: ", response);

      ui.paint(response);
    })
    .catch((err) => console.log(err));
}
