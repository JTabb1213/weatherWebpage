const sql = require('../../../SQLRoute');

module.exports = {

    findUsernameAndPassword: async (username, password) => {
        const client = await sql.getClient();
        try {
            const userAndPass = `select * from users where username = '${username}' AND password = '${password}'`
            console.log("made it here: ", username, password)
            const data = await client.query(userAndPass);
            if (data.rowCount === 0) {
                return false;
            }

            else {
                console.log("successful search ", username, password)
                return data.rows[0];
            }
        } finally {
            await sql.closeConnection();
        }
    },
};