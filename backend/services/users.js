const database = require('./database');

async function findUser(username, password) {
    return database.query({table: 'users', criteria: {username: username, password: password}});
}

async function createUser(username, password) {
    const now = new Date().toISOString();
    return database.insert({table: 'users', values: {username: username, password: password, createdAt: now, updatedAt: now}});
}

module.exports = {
    findUser: findUser,
    createUser: createUser
}