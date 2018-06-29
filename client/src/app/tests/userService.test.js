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
import axios from 'axios'
import moxios from 'moxios'
import UserService from '../services/UserService'

let userService = null

beforeEach(()=>{
    moxios.install()
    moxios.stubOnce("GET", "/user/exists?email=foobar@example.com&username=user1", {
        status: 200,
        response: {
            data: {
                type: "boolean",
                id: 1,
                attributes: {
                    email: "foobar@example.com",
                    username: "user1",
                    exists: true
                }
            }
        }
    })
    moxios.stubOnce("GET", "/user/exists?email=foobar@example.com", {
        status: 200,
        response: {
            data: {
                type: "boolean",
                id: 1,
                attributes: {
                    email: "foobar@example.com",
                    exists: true
                }
            }
        }
    })
    moxios.stubOnce("GET", "/user/exists?username=user1", {
        status: 200,
        response: {
            data: {
                type: "boolean",
                id: 1,
                attributes: {
                    username: "user1",
                    exists: true
                }
            }
        }
    })
    moxios.stubOnce("GET", "/user/exists?username=user2", {
        status: 200,
        response: {
            data: {
                type: "boolean",
                id: 1,
                attributes: {
                    username: "user2",
                    exists: false
                }
            }
        }
    })
    moxios.stubOnce("GET", "/user/exists?email=foobaz@example.com", {
        status: 200,
        response: {
            data: {
                type: "boolean",
                id: 1,
                attributes: {
                    email: "foobaz@example.com",
                    exists: false
                }
            }
        }
    })
    userService = new UserService("")
})

afterEach(()=>{
    moxios.uninstall()
})

test("userExists = true", async function(){
    expect((await userService.userExists({email:"foobar@example.com",username:"user1"})).exists).toBeTruthy()
    expect((await userService.userExists({email:"foobar@example.com"})).exists).toBeTruthy()
    expect((await userService.userExists({username:"user1"})).exists).toBeTruthy()
})

test("userExists = false", async function(){
    expect((await userService.userExists({username:"user2"})).exists).toBeFalsy()
    expect((await userService.userExists({email:"foobaz@example.com"})).exists).toBeFalsy()
})
