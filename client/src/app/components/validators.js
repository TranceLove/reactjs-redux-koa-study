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
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let emailCheck = function(value){
    return emailRegex.test(String(value).toLowerCase()) ? undefined : 'Invalid email'
}
let emailLengthCheck = function(value){
    return value.length <= 50 ? undefined : "Email cannot be more than 50 characters"
}
let usernameLengthCheck = function(value){
    if(value.length < 4)
        return "Username cannot be less than 4 characters"
    else if(value.length > 20)
        return "Username cannot be more than 20 characters"
    else
        return undefined
}
let passwordLengthCheck = function(value){
    if(value.length < 8)
        return "Password cannot be less than 8 characters"
    else if(value.length > 20)
        return "Password cannot be more than 20 characters"
    else
        return undefined
}
let passwordMatchCheck = function(value, allValues){
    return (allValues.password === allValues.passwordAgain) ? undefined :
        "Password does not match"
}
let required = function(value) {
    return (value === null || value === "" || typeof(value) === "undefined") ? 'Required' : undefined
}
export {
    emailCheck,
    emailLengthCheck,
    usernameLengthCheck,
    passwordLengthCheck,
    passwordMatchCheck,
    required
}
