'use strict';

const modelName = "Books";
const tableName = "Books";

module.exports = (db, Sequelize) => {
    const schema = {
        name: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(2048),
            allowNull: false
        },
        pages: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    };

    db.models[modelName] = db.pg.define(modelName, schema, {
        freezeTableName: true,
        tableName: tableName
    });

    db.models[modelName].associate = function (models) {
        models[modelName].hasMany(models.BooksAuthors, {
            foreignKey: 'bookId'
        }),
        models[modelName].belongsTo(models.Publishers, {
            foreignKey: 'publisherId'
        })
    };

    return db;
};