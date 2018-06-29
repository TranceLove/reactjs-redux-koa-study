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
import {login} from "../reducers"
import {LoginFormConstants,ResultConstants} from "../constants"

test("initial state", function(){
    let result = login(null, {})
    expect(result.authErrorMessage).toBeNull()
    expect(result.state).toEqual(LoginFormConstants.NEW_FORM)
})

test("should only take action type = login", function(){
    let result = login(null, {type:"foobar"})
    expect(result.authErrorMessage).toBeNull()
    expect(result.state).toEqual(LoginFormConstants.NEW_FORM)
})

test("should still return default if action is not specified", function(){
    let result = login(null, {type:"login"})
    expect(result.authErrorMessage).toBeUndefined()
    expect(result.state).toEqual(LoginFormConstants.NEW_FORM)
})

test("should return server unreachable message", function(){
    let result = login(null, {type:"login",action:ResultConstants.SERVER_UNREACHABLE})
    expect(result.authErrorMessage).toEqual("Server unreachable. Please try again later.")
    expect(result.state).toEqual(LoginFormConstants.HAS_ERROR)
})

test("should return authentication failed", function(){
    let result = login(null, {type:"login",action:ResultConstants.LOGIN_RESULT,result:false})
    expect(result.authErrorMessage).toEqual("Incorrect email and/or password.")
    expect(result.state).toEqual(LoginFormConstants.HAS_ERROR)
})

test("should only take action type = login and the above state should be kept", function(){
    let result = login(null, {type:"foobar"})
    expect(result.authErrorMessage).toEqual("Incorrect email and/or password.")
    expect(result.state).toEqual(LoginFormConstants.HAS_ERROR)
})

test("should return authentication success", function(){
    let result = login(null, {type:"login",action:ResultConstants.LOGIN_RESULT,result:true})
    expect(result.authErrorMessage).toBeNull()
    expect(result.state).toEqual(LoginFormConstants.LOGIN_SUCCESSFUL)
})

test("should return default if action is not specified now", function(){
    let result = login(null, {type:"login"})
    expect(result.authErrorMessage).toBeUndefined()
    expect(result.state).toEqual(LoginFormConstants.NEW_FORM)
})
