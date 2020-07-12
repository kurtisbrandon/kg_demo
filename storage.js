class Storage {
  constructor() {
    this.city;
    this.stateprov;
    this.defaultCity = 'Toronto';
    this.defaultStateprov = 'ON';
  }

  getStoredLocationData() {
    if(localStorage.getItem('city') === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem('city');
    }
    if(localStorage.getItem('stateprov') === null) {
      this.stateprov = this.defaultStateprov;
    } else {
      this.stateprov = localStorage.getItem('stateprov');
    }

    return {
      city: this.city,
      stateprov: this.stateprov
    };
  }

  storeLocationData(city, stateprov) {
    localStorage.setItem('city', city);
    localStorage.setItem('stateprov', stateprov);
  }
}