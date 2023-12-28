const axios = require('axios');
const apiKey = "AIzaSyD3AjCFux3-Q7YoYo-v1OyjcOY0tabKUVc";
const location = require('../../location');
async function getMap(city) {
    const geocode = await location.getCoordinates(city);
    const geometry = geocode.results[0].geometry;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${geometry.location.lat},${geometry.location.lng}&key=${apiKey}&size=600x600&zoom=15`
}

module.exports = {
    getMap: getMap
}
