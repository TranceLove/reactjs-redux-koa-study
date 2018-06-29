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
import UserService from '../services/UserService';
import { ActionTypeConstants, ResultConstants } from "../constants";

let userService = new UserService()

export async function doRegister(action, dispatch){
    let result = await userService.register(action.payload)
    dispatch({type:ActionTypeConstants.REGISTRATION,action:ResultConstants.SUCCESS})
}

export function usernameUsedCheck(values, dispatch, props, blurredField){
    return new Promise(async (resolve, reject) => {
        let request = {username:values.username,email:values.email}
        let result = await userService.userExists(request)
        if(result && !result.exists) {
            props.dispatch({type:ActionTypeConstants.REGISTRATION})
            resolve(true)
        }
        else {
            let error = {}
            if(request.email !== "" && request.username !== "")
                error.formError = "Username or email already exist"
            else if(request.username)
                error.username = "Username already exists"
            else if(request.email)
                error.email = "Email already exists"

            if(error.formError) props.dispatch({type:ActionTypeConstants.REGISTRATION,action:ResultConstants.FORM_ERROR,formError:error.formError})
            reject(error)
        }
    })
}
