'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

//Users Table
module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A first name is required."
                },
                notEmpty: {
                    msg: "Please provide a first name."
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A last name is required."
                }, 
                notEmpty: {
                    msg: "Please provide a last name."
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "An email is required."
                }, 
                isEmail : {
                    msg: "Please provide a valid email address."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A password is required."
                },
            notEmpty: {
                msg: "Please provide a valid password."
            },
            set(val) {
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue('password', hashedPassword);
            }
        },
    } }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'user',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return User;
};