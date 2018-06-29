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

export async function doLogin(action, dispatch){
    try {
        let result = await userService.login(action.payload)
        dispatch({type:ActionTypeConstants.LOGIN,action:ResultConstants.LOGIN_RESULT,result:result})
    } catch(e){
        if(e.response && e.response.status === 401) {
            dispatch({type:ActionTypeConstants.LOGIN,action:ResultConstants.LOGIN_RESULT,result:false})
        } else {
            dispatch({type:ActionTypeConstants.LOGIN,action:ResultConstants.SERVER_UNREACHABLE})
        }
    }
}

export async function doLogout(action, dispatch){
    userService.logout()
}
