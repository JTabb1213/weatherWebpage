module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("cities", {
        name: {
            type: Sequelize.STRING
        },
        tempActual: {
            type: Sequelize.FLOAT
        },
        humidity: {
            type: Sequelize.FLOAT
        },
        windSpeed: {
            type: Sequelize.INTEGER
        },
        tempFeelsLike: {
            type: Sequelize.FLOAT
        },
        skies: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });

    return City;
};
