//use case 1
//registering new user

const express = require('express');
const router = express.Router();
const session = require('express-session');


//specifying get route 
router.get('/register',(req,res)=>{
model_view={
    action_url: '/register'
}
res.render('signup.pug')
});

router.post('/register', (req,res)=>{
    const { username, password, firstName, lastName, email } = req.body;
    const existingUser = db.model.userData.find(user => user.username === username || user.email === email);
    if (existingUser) {
        var message = "User already exists. Please Try Again."
        return res.send(`${message} <a href="/auth/register">Back to Registration Page.</a>`);
    }
  
  if (password.length < 5) {
    var message = "Password must be at least 5 characters long. Please Try Again"
    return res.send(`${message} <a href="/auth/register">Back to Registration Page.</a>`);
  }

  // Create new user object
  const new_user = {
    firstName,
    lastName,
    username,
    password,
    email,
  };

  
  db.model.userData.push(new_user);
  db.update(); 
  var mainmessage = "Thank you for signing up!"
  res.send(`${mainmessage}, ${username}! <a href="/auth/login">Click to log in.</a>`);
    
});
// Use case 2:
// logging in existing user
router.get('/login',(req,res)=>{
  model_view={
    action_url: '/login',
}
  res.render('login.pug')
});

router.post('/login', (req,res)=>{
    const  {username, password} = req.body
    const existingUser = db.model.userData.find(user => user.username === username && user.password === password);
    if (existingUser){
        req.session.userID = username;
        req.session.isAuthenticated = true;
        res.redirect('/video/dashboard/all')
    }
})
module.exports= router;