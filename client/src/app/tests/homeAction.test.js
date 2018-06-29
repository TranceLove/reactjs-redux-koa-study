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
import {getProfile} from "../actions/home"
import { ActionTypeConstants, ResultConstants } from "../constants";

beforeEach(()=>{moxios.install()})

afterEach(()=>{moxios.uninstall()})

test("get user profile", async function(){
    moxios.install()
    moxios.stubOnce("GET", "http://localhost:3000/home", {
        status: 200,
        response: {
            data:{
                type:"User",
                id:100,
                attributes:{
                    username:"admin",
                    email:"admin@example.com"
                }
            }
        }
    })
    let assertion = function(action){
        expect(action.type).toEqual(ActionTypeConstants.HOME)
        expect(action.action).toEqual(ResultConstants.USER_PROFILE_RESULT)
        expect(action.profile.id).toEqual(100)
        expect(action.profile.username).toEqual("admin")
        expect(action.profile.email).toEqual("admin@example.com")
    }
    await getProfile({},assertion)
})
