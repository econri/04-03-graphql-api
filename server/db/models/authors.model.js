'use strict';
const modelName = "Authors";
const tableName = "Authors";

module.exports = (db, Sequelize) => {
    const schema = {
        name: {
            type: Sequelize.STRING(256),
            allowNull: false
        },
        biography: {
            type: Sequelize.STRING(2048),
            allowNull: true
        }
    };

    db.models[modelName] = db.pg.define(modelName, schema, {
        freezeTableName: true,
        tableName: tableName
    });

    db.models[modelName].associate = function (models) {
        models[modelName].hasMany(models.BooksAuthors, {
            foreignKey: 'authorId'
        });
    };
    return db;
};