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
"use strict"

let app = require(`${__dirname}/../app.js`)
let agent = require("supertest").agent(app.callback())
let models = require(`${__dirname}/../models`)
let jwt = require("jsonwebtoken")

afterAll(async() => {
    await models.User.destroy({where:{},truncate:true})
    models.sequelize.close()
})

test("Logout does nothing", async () => {
    let response = await agent.get("/logout")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
})

test("Login with nothing", async() => {
    let response = await agent.post("/login")
    expect(response).toBeDefined()
    expect(response.status).toEqual(401)
})

//By default, passport uses username/password param pair
test("Login with no user record in DB", async() => {
    let response = await agent.post("/login").type("form").send({username:"foobar@example.com", password: "123456"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(401)
})

test("Login with user record in DB", async() => {
    await models.User.build({email:"foobar@example.com",username:"user1",password:"abcdefgh"}).save()
    let response = await agent.post("/login").type("form").send({username:"foobar@example.com", password: "123456"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(401)

    response = await agent.post("/login").type("form").send({username:"foobaz@example.com", password: "abcdefgh"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(401)

    response = await agent.post("/login").type("form").send({username:"foobar@example.com", password: "abcdefgh"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("jwt-bearer-token")
    expect(response.body.data.attributes.token).toBeDefined()
    let token = jwt.verify(response.body.data.attributes.token, "super coding monkeys")
    expect(token.username).toEqual("user1")
    expect(token.email).toEqual("foobar@example.com")
})
