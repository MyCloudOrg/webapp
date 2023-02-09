const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {

    const options = {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: { attributes: {}, }
        }
    };

    const attributes = {
        name: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        description: {
             type: DataTypes.STRING, 
             allowNull: false
             },
        sku: { 
            type: DataTypes.STRING,
             allowNull: false },
        manufacturer: { 
            type: DataTypes.STRING,
             allowNull: false
             },
        quantity: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        date_added: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_last_updated: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_user_id: { 
            type: DataTypes.STRING, 
            allowNull: false 
        }
    };

    
    return sequelize.define('Product', attributes, options);
}