'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

//Users Table
module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A First Name Is Required."
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
                    msg: "A Last Name Is Required."
                }, 
                notEmpty: {
                    msg: "Please Provide A Last Name."
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false;
            validate: {
                notNull: {
                    msg: "An Email Is Required."
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
                    msg: "A Password Is Required."
                };
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
        User.hasMany(models.Courses);
    };

    return User;
};