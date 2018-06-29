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
import { LoginFormConstants } from "../constants";
import { ResultConstants, ActionTypeConstants } from "../constants";

//As redux-form is constantly dispatching actions to our reducer, need to keep our own state
let uiState = {
    state: LoginFormConstants.NEW_FORM,
    authErrorMessage: null
}

export default function login(state, action){
    if(action.type===ActionTypeConstants.LOGIN){
        switch(action.action){
            case ResultConstants.LOGIN_RESULT:
                uiState = {
                    state: action.result ? LoginFormConstants.LOGIN_SUCCESSFUL : LoginFormConstants.HAS_ERROR,
                    authErrorMessage: (!action.result) ? "Incorrect email and/or password." : null
                };
                break;
            case ResultConstants.SERVER_UNREACHABLE:
                uiState = {
                    state: LoginFormConstants.HAS_ERROR,
                    authErrorMessage: "Server unreachable. Please try again later."
                }
                break;
            default:
                uiState = {
                    state: LoginFormConstants.NEW_FORM
                }
        }
    }
    return uiState;
}
