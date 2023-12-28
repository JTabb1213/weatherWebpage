const axios = require('axios');
const apiKey = "AIzaSyD3AjCFux3-Q7YoYo-v1OyjcOY0tabKUVc";
const location = require('../../location');
async function getMapUrl(city) {
    const geocode = await location.getCoordinates(city);
    return geocode && `https://maps.googleapis.com/maps/api/staticmap?center=${geocode.location.lat},${geocode.location.lng}&key=${apiKey}&size=600x600&zoom=15`
}

module.exports = {
    getMapUrl: getMapUrl
}
