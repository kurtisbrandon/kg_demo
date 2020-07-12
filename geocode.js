class Geocode {
  constructor(locPt1, locPt2) {
    this.apiKey = 'AIzaSyAtKvmbW4kAFDNcbiigCXWVtoiJxNVLQ4w';
    this.locationPts = [locPt1, locPt2];
    this.location = '';
    let self = this;
    this.locationPts.forEach(function (locPt) {
      locPt = locPt.trim();
      self.location += locPt + '+';
    });
    this.location = this.location.split('');
    this.location.pop();
    this.location = this.location.join('');
    this.location = this.location.split(' ').join('+');
    this.locData;
  }

  // Fetch coordinates from API
  async getLocData() {
    console.log(this.location);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${this.apiKey}`
    );

    const responseData = await response.json();

    const city = responseData.results[0].address_components[0].short_name;
    const stateprov = responseData.results[0].address_components[2].short_name;

    const locData = {
      locName: `${city}, ${stateprov}`,
      locCoords: responseData.results[0].geometry.location,
    };

    return locData;
  }

  locDataToVar(data) {
    this.locData = data;
  }
  changeLocation(pt1, pt2) {
    let pts = [pt1, pt2];
    console.log(pts);
    let newLoc = '';
    pts.forEach(function (locPt) {
      locPt = locPt.trim();
      newLoc += locPt + '+';
    });
    newLoc = newLoc.split('');
    newLoc.pop();
    newLoc = newLoc.join('');
    newLoc = newLoc.split(' ').join('+');
    console.log('new location: ', newLoc)
    this.location = newLoc;
  }
}
