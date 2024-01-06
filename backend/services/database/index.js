const config = require("config");
const provider = config.get("providers.database");
const _delegate = require(`./providers/${provider}`);
console.log(`Using ${provider} as the database provider`);
async function query() {
    return _delegate.query.apply(_delegate, arguments);
}

async function insert() {
    return _delegate.insert.apply(_delegate, arguments);
}
module.exports = {
    query: query,
    insert: insert
}