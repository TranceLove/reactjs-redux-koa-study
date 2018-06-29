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
import {doLogin} from "../actions/auth"
import { ActionTypeConstants, ResultConstants } from "../constants";

beforeEach(()=>{moxios.install()})

afterEach(()=>{moxios.uninstall()})

test("login successful", async function(){
    moxios.install()
    moxios.stubOnce("POST", "http://localhost:3000/login", {
        status: 200,
        response: {
            data: {
                type: "jwt-bearer-token",
                id: 1,
                attributes: {
                    "token": "coding monkey's token"
                }
            }
        }
    })
    let assertion = function(action){
        expect(action.type).toEqual(ActionTypeConstants.LOGIN)
        expect(action.action).toEqual(ResultConstants.LOGIN_RESULT)
        expect(action.result).toBeTruthy()
    }
    await doLogin({username:"admin@example.com",password:"abcdefgh"},assertion)
})

test("login failed", async function(){
    moxios.install()
    moxios.stubOnce("POST", "http://localhost:3000/login", {
        status: 401
    })
    let assertion = function(action){
        expect(action.type).toEqual(ActionTypeConstants.LOGIN)
        expect(action.action).toEqual(ResultConstants.LOGIN_RESULT)
        expect(action.result).toBeFalsy()
    }
    await doLogin({username:"admin@example.com",password:"abcdefgh"},assertion)
})

test("server unreachable", async function(){
    moxios.install()
    moxios.stubOnce("POST", "http://localhost:3000/login", {
        status: 503
    })
    let assertion = function(action){
        expect(action.type).toEqual(ActionTypeConstants.LOGIN)
        expect(action.action).toEqual(ResultConstants.SERVER_UNREACHABLE)
        expect(action.result).toBeUndefined()
    }
    await doLogin({username:"admin@example.com",password:"abcdefgh"},assertion)
})
