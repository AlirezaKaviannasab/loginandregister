const express = require('express')
const app = express();
const http = require('http')
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('./helpers');
const rememberLogin = require('app/http/middleware/rememberLogin');
module.exports = class Application {
    constructor() {
        this.setupexpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouter();
    }
    setupexpress() {
        const server = http.createServer(app);
        server.listen(config.port, () => console.log(`listening on port ${config.port}`));
    }
    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url);

    };
    setConfig() {
        require('app/passport/passport-local');
        require('app/passport/passport-google')
        app.use(express.static(config.layout.public_dir));
        app.set('view engine', config.layout.view_engine);
        app.set('views', config.layout.view_dir);
        app.set("layout extractScripts", config.layout.ejs.extractScripts);
        app.set("layout extractStyles", config.layout.ejs.extractStyles);
        app.set("layout", config.layout.ejs.master);
        app.use(config.layout.ejs.expressLayouts);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(validator());
        app.use(session({ ...config.session }));
        app.use(cookieParser(config.cookie_secretkey));
        //secretkey must be strong
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);
        app.use((req, res, next) => {
            // app.locals = {
            //     auth : {
            //         user : req.user,
            //         check : req.isAuthenticated()
            //     }
            // };
            app.locals = new Helpers(req, res).getObjects();
            next();
        })
    }
    setRouter() {
        app.use(require('app/routes/web'));
        app.use(require('app/routes/api'));
    }
}
