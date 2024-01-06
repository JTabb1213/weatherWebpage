const { Client } = require('pg');
let client = null;

async function getClient() {
    if (client === null) {
        client = new Client({
            host: 'localhost',
            user: 'admin',
            password: 'password',
            database: 'weather',
            port: '5432',
        });

        await client.connect();
    }
    return Promise.resolve(client);
}

function toQuerySql(queryObj) {
    const criteria = queryObj.criteria || {};
    const whereStack = [];
    for (const property in criteria) {
        whereStack.push(`${property} = ${quoteValue(criteria[property])}`);
    }
    const fields = queryObj.fields || ['*'];
    return `select ${fields.join(',')} from ${queryObj.table} where ${whereStack.join(' AND ')}`;
}

function quoteValue(value) {
    if (isNaN(value)) {
        return `'${value}'`;
    }
    return value;
}



function toInsertSql(insert) {
    const valuesMap = insert.values || {};
    const fields = [];
    const values = [];

    for (const property in valuesMap) {
        fields.push(`"${property}"`);
        values.push(`${quoteValue(valuesMap[property])}`)
    }
    return `INSERT into ${insert.table}(${fields.join(',')}) VALUES (${values.join(',')})`;
}

async function query(queryObj) {
    const c = await getClient();
    const sql = toQuerySql(queryObj);
    const data = await client.query(sql);
    if (data.rowCount === 0) {
        return false;
    }
    return data.rows[0];
}

async function insert(insertRequest) {
    const c = await getClient();
    const sql = toInsertSql(insertRequest);
    const data = await c.query(sql);
    return data.rowCount === 1;
}

module.exports = {
    query: query,
    insert: insert
}