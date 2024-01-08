const db = require("../models");
const User = db.user;
const City = db.city;

async function findUser(username, password) {
    return User.findOne({ where: { username: username, password: password } });
}

async function createUser(username, password) {
    const now = new Date().toISOString();
    return User.create({ username: username, password: password, createdAt: now, updatedAt: now });
}

async function getWeather(city) {
    console.log("city: ", city);
    return City.findOne({ where: { name: city } });
}

module.exports = {
    findUser: findUser,
    createUser: createUser,
    getWeather: getWeather
}