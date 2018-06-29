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

test("With invalid email", async()=>{
    let response = await agent.post("/user/register").type("form").send({email:"foobar.com",username:"user1",password:"12345687"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("ValidationError")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email.length).toEqual(1)
    expect(response.body.data.attributes.email[0]).toEqual("Invalid email")
})

test("With too long email", async()=>{
    let response = await agent.post("/user/register").type("form").send({email:"abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde@ab.co",username:"user1",password:"12345687"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("ValidationError")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email.length).toEqual(1)
    expect(response.body.data.attributes.email[0]).toEqual("Email cannot be more than 50 characters")
})

test("With too long invalid email", async()=>{
    let response = await agent.post("/user/register").type("form").send({email:"abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeab.comz",username:"user1",password:"12345687"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("ValidationError")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email.length).toEqual(2)
    expect(response.body.data.attributes.email[0]).toEqual("Invalid email")
    expect(response.body.data.attributes.email[1]).toEqual("Email cannot be more than 50 characters")
})

test("With too short username", async()=>{
    let response = await agent.post("/user/register").type("form").send({email:"foobar@example.com",username:"use",password:"12345687"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("ValidationError")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.username.length).toEqual(1)
    expect(response.body.data.attributes.username[0]).toEqual("Username cannot be less than 4 characters")
})

test("With too long username", async()=>{
    let response = await agent.post("/user/register").type("form").send({email:"foobar@example.com",username:"user1234567890abcdefghi",password:"12345687"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("ValidationError")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.username.length).toEqual(1)
    expect(response.body.data.attributes.username[0]).toEqual("Username cannot be more than 20 characters")
})

test("With too short password", async()=>{
    let response = await agent.post("/user/register").type("form").send({email:"foobar@example.com",username:"user1",password:"123456"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("ValidationError")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.password.length).toEqual(1)
    expect(response.body.data.attributes.password[0]).toEqual("Password cannot be less than 8 characters")
})

test("With too long password", async()=>{
    let response = await agent.post("/user/register").type("form").send({email:"foobar@example.com",username:"user1",password:"1234567890134567890abcdef"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("ValidationError")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.password.length).toEqual(1)
    expect(response.body.data.attributes.password[0]).toEqual("Password cannot be more than 20 characters")
})

test("With completely invalid request", async() => {
    let response = await agent.post("/user/register").type("form").send({email:"abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeab.comz",username:"user1234567890abcdefghi",password:"1234567890134567890abcdef"})
    expect(response).toBeDefined()
    expect(response.status).toEqual(400)
    expect(response.body).toBeDefined()
    expect(response.body.data.type).toEqual("ValidationError")
    expect(response.body.data.id).toEqual(1)
    expect(response.body.data.attributes).toBeDefined()
    expect(response.body.data.attributes.email.length).toEqual(2)
    expect(response.body.data.attributes.email[0]).toEqual("Invalid email")
    expect(response.body.data.attributes.email[1]).toEqual("Email cannot be more than 50 characters")
    expect(response.body.data.attributes.username.length).toEqual(1)
    expect(response.body.data.attributes.username[0]).toEqual("Username cannot be more than 20 characters")
    expect(response.body.data.attributes.password.length).toEqual(1)
    expect(response.body.data.attributes.password[0]).toEqual("Password cannot be more than 20 characters")
})
