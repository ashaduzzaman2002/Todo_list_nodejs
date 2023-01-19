const jwt = require('jsonwebtoken')

exports.isLogin = async (req, res, next) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    let day = d.getDay();

    const cookie = req.headers.cookie
    if(!cookie) return res.render('list', {
        title: weekday[day]
    })
    const token = cookie.split('=')[1]
    if(!token) return res.render('list', {
        title: weekday[day]
    })

    const user = jwt.decode(token)
    req.user = user.id
    res.locals.isLogin = true
    next()
}