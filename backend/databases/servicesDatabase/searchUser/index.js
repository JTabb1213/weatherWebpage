const config = require('config');
let _delagate;
const PROVIDERS = {
    DATABASE: 'postgreSQL'
}

const provider = config.get("databases.userAndPassword");
_delagate = require('./providers/search');
console.log(`Using ${provider} as the database for the search`);
async function findUsernameAndPassword(username, password) {
    return _delagate.findUsernameAndPassword.apply(_delagate, arguments);
}

module.exports = {
    findUsernameAndPassword: findUsernameAndPassword
}