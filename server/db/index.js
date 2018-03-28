const fs = require('fs');
const path = require("path");
const Sequelize = require('sequelize');
let connect = require(path.join(__dirname, '../configs/config.js')).connectionString;
const _ = require('lodash');

let db = {
    pg: {},
    models: {}
};

db.pg = new Sequelize(process.env.DATABASE_URL || connect);

//создание таблиц
fs.readdirSync(path.join(__dirname, './models/')).forEach(model => {
    if (model.indexOf('.model.')) {
        require('./models/' + model)(db, Sequelize);
    }
});

//создание связец между таблицами
_.each(db.models, (model) => {
    if ('associate' in model) {
        model.associate(db.models);
    }
})

console.info('database connected.');

module.exports = db;