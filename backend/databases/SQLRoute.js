const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'weather',
    port: '5432',
});

client.connect();

module.exports = {
    getClient: () => client,
    closeConnection: async () => {
        await client.end();
    }
};