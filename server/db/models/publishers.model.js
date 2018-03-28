const modelName = "Publishers";
const tableName = "Publishers";

module.exports = (db, Sequelize) => {
    const schema = {
        name: {
            type: Sequelize.STRING(256),
            allowNull: false
        },
        address: {
            type: Sequelize.STRING(2048),
            allowNull: false
        }
    };

    db.models[modelName] = db.pg.define(modelName, schema, {
        freezeTableName: true,
        tableName: tableName
    });

    db.models[modelName].associate = function (models) {
        models[modelName].hasMany(models.Books, {
            foreignKey: 'publisherId'
        })
    };

    return db;
};