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
const RegisterFormConstants = {
    NEW_FORM: 0,
    SUBMITTING: 1,
    HAS_ERROR: 2,
    REGISTRATION_SUCCESSFUL: 3,
    GO_LOGIN: 4
}
const LoginFormConstants = {
    NEW_FORM: 0,
    SUBMITTING: 1,
    HAS_ERROR: 2,
    LOGIN_SUCCESSFUL: 3
}
const ActionTypeConstants = {
    HOME: "home",
    LOGIN: "login",
    REGISTRATION: "registration"
}
const ActionConstants = {
    ACTION_LOGIN: "ACTION_LOGIN",
    ACTION_LOGOUT: "ACTION_LOGOUT",
    ACTION_REGISTER: "ACTION_REGISTER",
    ACTION_GET_PROFILE: "ACTION_GET_PROFILE"
}
const ResultConstants = {
    LOGIN_RESULT: "LOGIN_RESULT",
    USER_PROFILE_RESULT: "USER_PROFILE_RESULT",
    SERVER_UNREACHABLE: "SERVER_UNREACHABLE",
    GO_LOGIN: "GO_LOGIN",
    SUCCESS: "SUCCESS",
    FORM_ERROR: "FORM_ERROR"
}

export { RegisterFormConstants, LoginFormConstants, ActionTypeConstants, ActionConstants, ResultConstants }
