/*
 * Copyright (C) 2018 Raymond Lai <airwave209gt@gmail.com>
 *
 * It is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
'use strict';

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
        email: {type: DataTypes.STRING(50), allowNull: false, unique: true, validate: {notEmpty: true, isEmail: true, len:[5,50]}},
        username: {type: DataTypes.STRING(20), allowNull: false, validate: {notEmpty: true, len:[4,20]}},
        password: {type: DataTypes.STRING(20), allowNull: false, validate: {notEmpty: true, len:[8,20]}}
    }, {});
    User.prototype.validPassword = function(givenPassword){
        return this.password === givenPassword;
    }
    return User;
};
