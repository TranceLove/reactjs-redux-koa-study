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
"use strict"

const Koa = require("koa");
const Router = require("koa-router");
const serveStatic = require("koa-static");
const passport = require("koa-passport");
const session = require("koa-session");
const bodyParser = require('koa-bodyparser');
const jwt = require("koa-jwt");
const models = require(`${__dirname}/models`);

let app = new Koa();
let pubRouter = new Router();
let mainRouter = new Router();
//Why 2 routers? See https://stackoverflow.com/a/31908824/768633

require(`${__dirname}/resources/00auth`)(pubRouter);
require(`${__dirname}/resources/01user`)(pubRouter);
require(`${__dirname}/resources/02main`)(mainRouter);

app.keys = ["super coding monkeys"]
if(process.env["NODE_ENV"] === "development") app.use(require("@koa/cors")({origin:"http://localhost:3001"}))
app.use(bodyParser());
app.use(passport.initialize());
if(process.env["NODE_ENV"] === "production")
    app.use(serveStatic(`${__dirname}/public`))
else
    app.use(serveStatic(`${__dirname}/../client/build`))
app.use(pubRouter.routes());
app.use(jwt({ secret: 'super coding monkeys' }))
app.use(mainRouter.routes());

module.exports = app;
