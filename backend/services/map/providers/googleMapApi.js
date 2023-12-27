const axios = require('axios');
const apiKey = "AIzaSyD3AjCFux3-Q7YoYo-v1OyjcOY0tabKUVc";

async function getCoordinates(city) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`).then(result => {
        console.log(result.data);

        return result.data;
    });

}

module.exports = {
    getCoordinates: getCoordinates
}
