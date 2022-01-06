const User = require('app/models/user');
const Middleware = require('./middleware');


class rememberLogin extends Middleware {
    handle(req, res, next) {
        if (!req.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_Token;
            if (rememberToken) {
                return this.userFind(rememberToken, req, next);
            }
        }
        next();
    }
    userFind(rememberToken, req, next) {
        User.findOne({ rememberToken })
            .then(user => {
                if (user) {
                    req.logIn(user, err => {
                        if (err) next(err);
                        next();
                    })
                } else
                    next();

            })
            .catch(err => next(err));
    }
}
module.exports = new rememberLogin();