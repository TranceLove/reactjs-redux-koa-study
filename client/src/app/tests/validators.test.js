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
import {required,emailCheck,emailLengthCheck,usernameLengthCheck,passwordMatchCheck,passwordLengthCheck} from "../components/validators"

test("validate required", function(){
    expect(typeof(required("yes"))).toEqual("undefined")
    expect(required(null)).toEqual("Required")
    expect(required(undefined)).toEqual("Required")
    expect(required("")).toEqual("Required")
})

test("validate emailCheck", function(){
    expect(typeof(emailCheck("user@example.com"))).toEqual("undefined")
    expect(emailCheck(null)).toEqual("Invalid email")
    expect(emailCheck(undefined)).toEqual("Invalid email")
    expect(emailCheck("")).toEqual("Invalid email")
    expect(emailCheck("foobar.com")).toEqual("Invalid email")
    expect(emailCheck("a@b.c")).toEqual("Invalid email")
})

test("validate emailLengthCheck", function(){
    expect(typeof(emailLengthCheck("user@example.com"))).toEqual("undefined")
    expect(typeof(emailLengthCheck("abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde@a.co"))).toEqual("undefined")
    expect(emailLengthCheck("abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde@ab.co")).toEqual("Email cannot be more than 50 characters")
})

test("validate usernameLengthCheck", function(){
    expect(typeof(usernameLengthCheck("airwave"))).toEqual("undefined")
    expect(typeof(usernameLengthCheck("abcd"))).toEqual("undefined")
    expect(typeof(usernameLengthCheck("abcdefghijklmnopqrst"))).toEqual("undefined")
    expect(usernameLengthCheck("abc")).toEqual("Username cannot be less than 4 characters")
    expect(usernameLengthCheck("abcdefghijklmnopqrstu")).toEqual("Username cannot be more than 20 characters")
})

test("validate passwordLengthCheck", function(){
    expect(typeof(passwordLengthCheck("12345678"))).toEqual("undefined")
    expect(typeof(passwordLengthCheck("abcdefghi"))).toEqual("undefined")
    expect(typeof(passwordLengthCheck("abcdefghijklmnopqrst"))).toEqual("undefined")
    expect(passwordLengthCheck("abc")).toEqual("Password cannot be less than 8 characters")
    expect(passwordLengthCheck("abcdefg")).toEqual("Password cannot be less than 8 characters")
    expect(passwordLengthCheck("abcdefghijklmnopqrstu")).toEqual("Password cannot be more than 20 characters")
})

test("validate passwordMatchCheck", function(){
    expect(typeof(passwordMatchCheck(null, {password:"abcdefghij",passwordAgain:"abcdefghij"}))).toEqual("undefined")
    expect(passwordMatchCheck(null, {password:"abcdefghij",passwordAgain:"abcdefghijkl"})).toEqual("Password does not match")
})
