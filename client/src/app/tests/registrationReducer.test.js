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
import {registration} from "../reducers"
import {RegisterFormConstants,ResultConstants} from "../constants"

test("initial state", function(){
    let result = registration(null, {})
    expect(result.formError).toBeUndefined()
    expect(result.state).toEqual(RegisterFormConstants.NEW_FORM)
})

test("should only take action type = registration", function(){
    let result = registration(null, {type:"foobar"})
    expect(result.formError).toBeUndefined()
    expect(result.state).toEqual(RegisterFormConstants.NEW_FORM)
})

test("should still return default if action is not specified", function(){
    let result = registration(null, {type:"registration"})
    expect(result.formError).toBeUndefined()
    expect(result.state).toEqual(RegisterFormConstants.NEW_FORM)
})

test("should return validation failed", function(){
    let result = registration(null, {type:"registration",action:ResultConstants.FORM_ERROR,formError:"Form validation error"})
    expect(result.formError).toEqual("Form validation error")
    expect(result.state).toEqual(RegisterFormConstants.HAS_ERROR)
})

test("should only take action type = registration and the above state should be kept", function(){
    let result = registration(null, {type:"foobar"})
    expect(result.formError).toEqual("Form validation error")
    expect(result.state).toEqual(RegisterFormConstants.HAS_ERROR)
})

test("should return registration success", function(){
    let result = registration(null, {type:"registration",action:ResultConstants.SUCCESS})
    expect(result.formError).toBeUndefined()
    expect(result.state).toEqual(RegisterFormConstants.REGISTRATION_SUCCESSFUL)
})

test("should return go login", function(){
    let result = registration(null, {type:"registration",action:ResultConstants.GO_LOGIN})
    expect(result.formError).toBeUndefined()
    expect(result.state).toEqual(RegisterFormConstants.GO_LOGIN)
})

test("should return default if action is not specified now", function(){
    let result = registration(null, {type:"registration"})
    expect(result.formError).toBeUndefined()
    expect(result.state).toEqual(RegisterFormConstants.NEW_FORM)
})
