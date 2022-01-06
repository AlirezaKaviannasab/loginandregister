const MongoStore = require('connect-mongo');
const session = require('express-session');
const mongoose = require('mongoose');
module.exports = {
        secret: process.env.SESSION_SECRETKEY,
        resave: true,
        saveUninitialized: true,
        cookie: { expires: new Date(Date.now() + 6 * 60 * 60 * 1000)},
        //6 hours expire
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL })
}