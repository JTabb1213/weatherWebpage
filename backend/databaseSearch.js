/*

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

    findUsernameAndPassword: async (username, password) => {
        const userAndPass = `select * from users where username = '${username}' AND password = '${password}'`
        const data = await client.query(userAndPass);
        if (data.rowCount === 0) {
            return false;
        }

        else {
            return data.rows[0];
        }
    },

    closeConnection: () => {
        client.end();
    }
};

*/