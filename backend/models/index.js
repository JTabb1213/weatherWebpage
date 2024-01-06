const config = require('config');
const Sequelize = require("sequelize");
const pool = config.get('database.pool');
const sequelize = new Sequelize(
    config.get('database.db'),
    config.get('database.user'),
    config.get('database.password'),
    {
        host: config.get('database.host'),
        dialect: config.get('database.dialect'),
        pool: {
            max: pool.max,
            min: pool.min,
            acquire: pool.acquire,
            idle: pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);

module.exports = db;