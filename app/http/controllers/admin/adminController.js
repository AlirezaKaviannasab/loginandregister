const controller = require('app/http/controllers/controller');
class indexController extends controller {
    index(req, res) {
        res.json('admin page');
    }
    products(req, res) {
        res.json('products page');
    }
}
module.exports = new indexController();