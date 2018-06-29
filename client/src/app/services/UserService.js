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
import axios from 'axios';

class UserService {
    constructor(baseUrl){
        this.baseUrl = baseUrl || ""
    }

    async userExists(user){
        let result = await this.createAxios().get("/user/exists", {params:user})
        return result.data.data.attributes
    }

    async register(user){
        let result = await this.createAxios().post("/user/register", user)
        let retval = result.data.data.attributes
        retval.id = result.data.data.id
        return retval
    }

    async login(user){
        let result = await this.createAxios().post("/login", user)
        let data = result.data.data
        let token = data.attributes.token
        localStorage.setItem("bearer-token", token)
        return true
    }

    async profile(){
        let result = await this.createAxios().get("/home")
        let retval = result.data.data.attributes
        retval.id = result.data.data.id

        return retval
    }

    async logout(){
        this.createAxios().get(this.baseUrl+"/logout")
        localStorage.removeItem("bearer-token")
    }

    createAxios(){
        let http = axios.create({
            baseURL: this.baseUrl
        })
        let token = localStorage.getItem("bearer-token")
        if (token) {
            http.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${token}`
                return config
            }, function (error) {
                return Promise.reject(error)
            })
        }
        return http
    }
}

export default UserService
