const validator = require('./validator');
const { check } = require('express-validator/check');

class registerValidator extends validator {
    handle() {
        return [
            check('name')
                .isLength({ min: 4 })
                .withMessage('نام و نام خانوادگی نمیتواند خالی بماند'),
            check('email')
                .isEmail()
                .withMessage('ایمیل معتبر نیست'),
            check('password')
                .isLength({ min: 8 })
                .withMessage('پسورد نمیتواند کمتر از 8 کاراکتر باشد'),
        ]
    }

}
module.exports = new registerValidator();