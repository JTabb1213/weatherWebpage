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

    addUser: async (username, password) => {
        const data = await client.query(`INSERT INTO users(username, password, \"createdAt\", \"updatedAt\") VALUES ('${username}', '${password}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);
        if (data.rowCount === 0) {
            console.log('user not added');
        }

        else {
            console.log('user added');
        }

    },

    endConnection: () => {
        client.end();
    }
};