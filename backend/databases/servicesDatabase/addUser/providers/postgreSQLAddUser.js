const sql = require('../../../SQLRoute');

module.exports = {

    addUser: async (username, password) => {
        const client = await sql.getClient();
        try {
            const data = await client.query(`INSERT INTO users(username, password, \"createdAt\", \"updatedAt\") VALUES ('${username}', '${password}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);
            if (data.rowCount === 0) {
                console.log('user not added');
            }

            else {
                console.log('user added');
            }
        } finally {
            await sql.closeConnection();
        }
    },
};