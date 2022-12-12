'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {}
    Course.init ({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please Provide A Value For Title"
                },
                notEmpty: {
                    msg: "Please Provide A Title"
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please Provide A Value For Description."
                }, 
                notEmpty: {
                    msg: "Please Provide A Description."
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING
        },
        materialsNeeded: {
            type: DataTypes.STRING
        }
    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: "user",
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            }
        });
    };

    return Course;
};