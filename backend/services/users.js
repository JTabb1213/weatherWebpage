const db = require("../models");
const User = db.user;

async function findUser(username, password) {
    return User.findOne({ where: { username: username, password: password } });
}

async function createUser(username, password) {
    const now = new Date().toISOString();
    return User.create({username: username, password: password, createdAt: now, updatedAt: now});
}

module.exports = {
    findUser: findUser,
    createUser: createUser
}