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
"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require("jsonwebtoken");
const models = require(`${__dirname}/../models`);

passport.serializeUser(function(user, done) {
    done(null, user != null ? {id: user.id, email: user.email, username: user.username} : false);
});

passport.deserializeUser(async function(user, done) {
    done(null, models.User.find({where:{email:user.email}}));
});

passport.use(new LocalStrategy(
    async function(username, password, done) {
        let user = await models.User.find({where:{email:username}})
        if (!user || user == null)
        {
            return done(null, false, { message: 'Incorrect username.' });
        }
        else if (!user.validPassword(password))
        {
            return done(null, false, { message: 'Incorrect password.' });
        }
        else
        {
            return done(null, user);
        }
    }
));

module.exports = function(router){
    router.post('/login', ctx => {
        return passport.authenticate('local', (err, user, info, status) => {
            if(user)
            {
                ctx.login(user)
                ctx.status = 200
                ctx.response.body = {
                    data: {
                        type: "jwt-bearer-token",
                        id: user.id,
                        attributes: {
                            //FIXME: async callback seems not very friendly here
                            token: jwt.sign({id:user.id,username:user.username,email:user.email}, "super coding monkeys")
                        }
                    }
                }
            }
            else
            {
                ctx.status = 401
            }
        })(ctx)
    });

    router.all("/logout", async ctx => {
        ctx.logout();
        ctx.status = 200
    });
}
