const axios = require('axios');
const apiKey = "AIzaSyD3AjCFux3-Q7YoYo-v1OyjcOY0tabKUVc";

async function getCoordinates(city) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`).then(result => {
        if (result.data.results.length !== 1) {
            // The above call requires that there is 1 and only 1 candidate match
            // Either city could not be found, or more than 1 result came back
            return null;
        }
        return result.data.results[0].geometry;

    });

}

module.exports = {
    getCoordinates: getCoordinates
}

