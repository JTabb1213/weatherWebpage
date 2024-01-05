//import pkg from 'pg';
const { Client } = require('pg');


const client = new Client({
        host: 'localhost',
        user: 'admin',
        password: 'password',
        database: 'weather',
        port: '5432',
});

client.connect();

client.query(`INSERT INTO users(username, password, \"createdAt\", \"updatedAt\") VALUES ('test', 'test', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`, (err, res) => {
        if (!err) {
                if (res.rowCount === 0) {
                        console.log('no user added');
                }
                else {
                        console.log(res.rows);
                }
        } else {
                console.log(err.message);
        }

        client.end();
});

