const express = require('express')
const { validateLogin, loginValidation } = require('../middleware/validation/inputValidation')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user){
        const isMatched = await bcrypt.compare(password, user.password)
        if(isMatched){
            const token = jwt.sign({id: user._id}, 'dasduhasdjac50', {expiresIn: '2 days'})
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 36000000),
                httpOnly: true,
                sameSite: 'lax'
            })

            res.redirect('/')
        }
    }
})


router.route('/signup')
    .get((req, res) => {
        res.render('signup')
    })
    .post(async (req, res) => {
        const {name, email, password} = req.body

        const salt = 10;
        const hash = await bcrypt.hash(password, salt)

        const newUser = {
            name, 
            email,
            password: hash
        }
        
        const user = new User(newUser)
        await user.save()
        res.redirect('/user/login')
    })
module.exports = router