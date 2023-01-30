const express = require('express');
const {
  validateLogin,
  loginValidation,
} = require('../middleware/validation/inputValidation');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
        expiresIn: '2 days',
      });
      res.cookie(`todo_${user.name}`, token, {
        expires: new Date(Date.now() + 36000000),
        httpOnly: true,
        sameSite: 'lax',
      });

      res.redirect('/');
    }else {
        res.redirect('/user/signup')
      }
  }else {
    res.redirect('/user/signup')
  }
});

router
  .route('/signup')
  .get((req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({email})

    if(userExist) res.redirect('/user/login')

    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hash,
    };

    const user = new User(newUser);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
        expiresIn: '2 days',
      });
      res.cookie(`todo_${user.name}`, token, {
        expires: new Date(Date.now() + 36000000),
        httpOnly: true,
        sameSite: 'lax',
      });

    res.redirect('/');
  });

module.exports = router;
