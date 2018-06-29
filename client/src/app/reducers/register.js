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
import { RegisterFormConstants, ActionTypeConstants, ResultConstants } from "../constants";

let uiState = {
    state: RegisterFormConstants.NEW_FORM
}

export default function registration(state, action){
    if(action.type===ActionTypeConstants.REGISTRATION){
        switch(action.action){
            case ResultConstants.GO_LOGIN:
                uiState = {
                    state: RegisterFormConstants.GO_LOGIN
                }
                break;
            case ResultConstants.SUCCESS:
                uiState = {
                    state: RegisterFormConstants.REGISTRATION_SUCCESSFUL
                }
                break;
            case ResultConstants.FORM_ERROR:
                uiState = {
                    state: RegisterFormConstants.HAS_ERROR,
                    formError: action.formError
                }
                break;
            default:
                uiState = {
                    state: RegisterFormConstants.NEW_FORM
                }
        }
    }
    return uiState;
}
