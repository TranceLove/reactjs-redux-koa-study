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

let token = null

afterAll(async() => {
    await models.User.destroy({where:{},truncate:true})
    models.sequelize.close()
})

afterEach(()=>{
    token = null
})

test("Get /home without login", async() => {
    let response = await agent.get("/home")
    expect(response).toBeDefined()
    expect(response.status).toEqual(401)
})

test("Get session user", async () => {
    await models.User.build({email:"foobar@example.com",username:"user1",password:"abcdefgh"}).save()
    await createSession(agent, {username:"foobar@example.com", password: "abcdefgh"})

    let response = await agent.get("/home").set("Authorization", "Bearer " + token)
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("User")
    expect(response.body.data.id).toBeGreaterThan(0)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email).toEqual("foobar@example.com")
    expect(response.body.data.attributes.username).toEqual("user1")
    expect(response.body.data.attributes.password).toBeUndefined()
})

//Reference: https://medium.com/@internetross/a-pattern-for-creating-authenticated-sessions-for-routing-specs-with-supertest-and-jest-until-the-baf14d498e9d
let createSession = function(agent, user) {
    return agent.post('/login').type("form").send({
        username: user.username,
        password: user.password
    }).expect(200)
    .then(res => {
        token = res.body.data.attributes.token
    });
}
