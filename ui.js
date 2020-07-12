class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelsLike = document.getElementById('w-feels-like');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather) {
    this.location.textContent = geocode.locData.locName;
    const description = weather.current.weather[0].description;
    console.log(description);
    this.desc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    this.string.textContent = `${weather.current.temp.toFixed(1)} C`;
    this.icon.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
    );
    this.humidity.textContent = `Relative Humidity: ${weather.current.humidity.toFixed(
      1
    )}%`;
    this.feelsLike.textContent = `Feels Like: ${weather.current.feels_like.toFixed(
      1
    )} C`;
    this.dewpoint.textContent = `Dew point: ${weather.current.dew_point.toFixed(
      1
    )} C`;
    this.wind.textContent = `Wind: ${weather.current.wind_speed.toFixed(1)} m/s`;
  }
}
