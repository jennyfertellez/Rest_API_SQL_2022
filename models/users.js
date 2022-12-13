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
                    msg: "A First Name is Required."
                },
                notEmpty: {
                    msg: "Please Provide A First Name."
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A Last Name is Required."
                }, 
                notEmpty: {
                    msg: "Please Provide A Last Name."
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "An Email is Required."
                }, 
                isEmail : {
                    msg: "Please Provide A Valid Email Address."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A Password is Required."
                },
            notEmpty: {
                msg: "Please Provide A Valid Password."
            },
            set(val) {
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue('password', hashedPassword);
            }
        },
    } }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Courses, {
            as: 'user',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return User;
};