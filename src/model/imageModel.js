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

        image_id: {                             
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        
        product_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },

        file_name: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        date_created: {
                type: DataTypes.STRING,
                allowNull: false
            },
        s3_bucket_path: { 
            type: DataTypes.STRING,
             allowNull: false
             }
    };

    
    return sequelize.define('Image', attributes, options);
}