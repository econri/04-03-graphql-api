'use strict';

const modelName = "BooksAuthors";
const tableName = "BooksAuthors";

module.exports = (db, Sequelize) => {
    const schema = {};

    db.models[modelName] = db.pg.define(modelName, schema, {
        freezeTableName: true,
        tableName: tableName
    });

    db.models[modelName].associate = function (models) {
        models[modelName].belongsTo(models.Authors, {
            foreignKey: 'authorId'
        }),
        models[modelName].belongsTo(models.Books, {
            foreignKey: 'bookId'
        })
    };

    return db;
};