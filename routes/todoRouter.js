const express = require('express');
const { isLogin } = require('../middleware/isLogin');
const router = express.Router()
const Todo = require('../models/Todo')

router.get('/', isLogin, async (req, res) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    let day = d.getDay();

    const todos = await Todo.find({user: req.user})
    res.render('list', { title: weekday[day], todos })
})

router.post("/", isLogin, async (req, res) => {

    const itemName = req.body.newItem;
    console.log(itemName);
  
    const todo = new Todo({
        title: itemName,
        user: req.user
    });
  
      await todo.save();
      res.redirect("/");
  });


  
router.post("/delete", isLogin, async (req, res) => {
    const checkedItemId = req.body.checkbox;
    
      Todo.findByIdAndRemove(checkedItemId, function(err){
        if (!err) {
          console.log("Successfully deleted checked item.");
          res.redirect("/");
        }
      })
  });

router.get('/logout', isLogin, async (req, res) => {
    
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  res.redirect('back');
})
  

module.exports = router