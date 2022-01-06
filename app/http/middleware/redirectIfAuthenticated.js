const User = require('app/models/user');
const Middleware = require('./middleware');


class redirectIfAuthenticated extends Middleware {
    handle(req, res, next) {
        if ( req.isAuthenticated()) 
        return res.redirect('/');
        next();
    }}
module.exports = new redirectIfAuthenticated();