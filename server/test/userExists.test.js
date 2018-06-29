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

afterAll(async() => {
    await models.User.destroy({where:{},truncate:true})
    models.sequelize.close()
})

test("Test user exists with empty request", async() => {
    let response = await agent.get("/user/exists")
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
})

test("Test user exists = false", async() => {
    let response = await agent.get("/user/exists?email=foobar@example.com&username=user1")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("boolean")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email).toEqual("foobar@example.com")
    expect(response.body.data.attributes.exists).toEqual(false)
})

test("Test user exists = true", async() => {
    await models.User.build({email:"foobar@example.com",username:"user1",password:"abcdefgh"}).save()
    let response = await agent.get("/user/exists?email=foobar@example.com&username=user1")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("boolean")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email).toEqual("foobar@example.com")
    expect(response.body.data.attributes.username).toEqual("user1")
    expect(response.body.data.attributes.exists).toEqual(true)

    response = await agent.get("/user/exists?email=foobar@example.com")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("boolean")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email).toEqual("foobar@example.com")
    expect(response.body.data.attributes.exists).toEqual(true)

    response = await agent.get("/user/exists?username=user1")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("boolean")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.username).toEqual("user1")
    expect(response.body.data.attributes.exists).toEqual(true)

    response = await agent.get("/user/exists?email=foobaz@example.com&username=user1")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("boolean")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email).toEqual("foobaz@example.com")
    expect(response.body.data.attributes.username).toEqual("user1")
    expect(response.body.data.attributes.exists).toEqual(true)

    response = await agent.get("/user/exists?email=foobar@example.com&username=user2")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("boolean")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email).toEqual("foobar@example.com")
    expect(response.body.data.attributes.username).toEqual("user2")
    expect(response.body.data.attributes.exists).toEqual(true)

    response = await agent.get("/user/exists?email=foobaz@example.com")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("boolean")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email).toEqual("foobaz@example.com")
    expect(response.body.data.attributes.exists).toEqual(false)

    response = await agent.get("/user/exists?username=user3")
    expect(response).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("boolean")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.username).toEqual("user3")
    expect(response.body.data.attributes.exists).toEqual(false)
})
