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
import { asyncMiddleware } from 'redux-async-await-middleware';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { login, registration, home } from "../reducers";
import { doLogin, doLogout } from "../actions/auth";
import { getProfile } from "../actions/home";
import { doRegister } from "../actions/register";
import { ActionTypeConstants, ActionConstants, ResultConstants } from "../constants";

const reducer = combineReducers({
    form: reduxFormReducer,
    login,
    registration,
    home
});

const errorHandler = (error, action, dispatch) => {
    switch(action.type) {
        case ActionConstants.ACTION_LOGIN:
            dispatch({type:ActionTypeConstants.LOGIN,action:ResultConstants.SERVER_UNREACHABLE})
            break;
    }
}

const middlewares = asyncMiddleware({
    "ACTION_LOGIN": doLogin,
    "ACTION_LOGOUT": doLogout,
    "ACTION_GET_PROFILE": getProfile,
    "ACTION_REGISTER": doRegister
}, errorHandler)

const store = createStore(reducer, applyMiddleware(middlewares));

export default store;
