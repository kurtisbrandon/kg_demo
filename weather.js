class Weather {
  constructor(lat, lon) {
    this.apiKey = '3ed33afe04177b19c9aa17bea87b638c';
    this.lat = lat;
    this.lon = lon;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`
    );

    const responseData = await response.json();

    return responseData;
  }

  // Change location (Call from a function which first changes the coordinates)
  changeLocation(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
}
