const Sequelize = require('sequelize');
const db = require('./db');

const Usuario = db.define('usuario', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    legenda: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

//Usuario.sync();

module.exports = Usuario;