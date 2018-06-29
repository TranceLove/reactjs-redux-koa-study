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
"use strict";

const models = require(`${__dirname}/../models`)
const validators = require(`${__dirname}/../validators`)
const Op = models.Sequelize.Op;

let findUser = async function(username, email) {
    let condition = {}, responseAttributes = {}
    if(email != "" && username != "" && typeof(email) != "undefined" && typeof(username) != "undefined") {
        condition = { [Op.or]: [{email:email},{username:username}]}
        responseAttributes.email = email
        responseAttributes.username = username
    } else if(email != "" && typeof(username) == "undefined") {
        condition = {email:email}
        responseAttributes.email = email
    } else {
        condition = {username:username}
        responseAttributes.username = username
    }
    let user = await models.User.find({where:condition})
    responseAttributes.exists = user != null

    return responseAttributes
}

let validateRequestForErrors = function(requestData){
    let emailError = [], usernameError = [], passwordError = []
    emailError.push(validators.emailCheck(requestData.email))
    emailError.push(validators.emailLengthCheck(requestData.email))
    usernameError.push(validators.usernameLengthCheck(requestData.username))
    passwordError.push(validators.passwordLengthCheck(requestData.password))

    emailError = emailError.filter(v => typeof(v) !== "undefined")
    usernameError = usernameError.filter(v => typeof(v) !== "undefined")
    passwordError = passwordError.filter(v => typeof(v) !== "undefined")

    if(emailError.length>0 || usernameError.length>0 || passwordError.length>0){
        let errors = {}
        if(emailError.length>0) errors.email = emailError
        if(usernameError.length>0) errors.username = usernameError
        if(passwordError.length>0) errors.password = passwordError
        return errors
    } else
        return null;
}

module.exports = function(router){
    router.get("/user/exists", async ctx => {
        let email = ctx.query.email
        let username = ctx.query.username
        //OK, this gets complicated without a utility library...
        if((email == null || email == "" || typeof(email) == "undefined")
            && (username == null || username == "" || typeof(username) == "undefined")) {
            ctx.status = 400;
        } else {
            let responseAttributes = await findUser(username, email)
            let responseObj = {
                data: {
                    type: "boolean",
                    id: 1,
                    attributes: responseAttributes
                }
            }
            /* Not setting JSONAPI's official content type application/vnd.api+json to prevent browsers from acting strange.
               ReactJS should have handled this, but never say never...
               Same as below */
            //ctx.response.type = "application/vnd.api+json"
            ctx.response.body = responseObj;
            ctx.status = 200;
        }
    });
    router.post("/user/register", async ctx => {
        let data = ctx.request.body
        let username = data.username
        let email = data.email
        let password = data.password
        if((email == null || email == "" || typeof(email) == "undefined")
            || (username == null || username == "" || typeof(username) == "undefined")
            || (password == null || password == "" || typeof(password) == "undefined")) {
            ctx.status = 400;
        } else {
            let errors = validateRequestForErrors(data)
            if(errors != null){
                ctx.response.body = {
                    data: {
                        type: "ValidationError",
                        id: 1,
                        attributes: errors
                    }
                }
                ctx.status = 400
            } else {
                let response = await findUser(username, email)
                if(response.exists) {
                    ctx.response.body = {
                        data: {
                            type: "boolean",
                            id: 1,
                            attributes: response
                        }
                    }
                    ctx.status = 409
                } else {
                    let newUser = await models.User.build({email:email,username:username,password:password}).save()
                    ctx.response.body = {
                        data: {
                            type: "User",
                            id: newUser.id,
                            attributes: {
                                username: newUser.username,
                                email: newUser.email
                            }
                        }
                    }
                    //ctx.response.type = "application/vnd.api+json"
                    ctx.status = 206
                }
            }
        }
    });
};
