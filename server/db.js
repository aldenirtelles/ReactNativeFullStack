const Sequelize = require('sequelize');

const sequelize = new Sequelize("urbtech", "root", "teste",{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function()
{
    console.log("rodou");
}).catch(function()
{
    console.log("erro");
});

module.exports = sequelize;