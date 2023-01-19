const {check, validationResult} = require('express-validator')

exports.validateLogin = [
    check('email').normalizeEmail().isEmail().withMessage('Ivalid email format'),
    check('password').trim().not().isEmpty().withMessage('Ivalid password'),

]


exports.loginValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if(!result.length) return next();

    const error = result[0].msg
    res.render('login', {
        error
    })
}