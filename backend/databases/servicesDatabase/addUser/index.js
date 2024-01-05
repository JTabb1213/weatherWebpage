const config = require('config');
let _delagate;
const PROVIDERS = {
    DATABASE: 'postgreSQL'
}

const provider = config.get("databases.userAndPassword");
_delagate = require('./providers/postgreSQLAddUser');
console.log(`Using ${provider} as the database`);
async function addUser(username, password) {
    return _delagate.addUser.apply(_delagate, arguments);
}

module.exports = {
    addUser: addUser
}