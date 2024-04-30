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
  
    const isExistingUser = (userData) => {
        return userData.email === email || userData.username === username;
      };
      if (isExistingUser(userData)) {
        return res.render('User already exists. Please try again.', 'signup.pug')
      }
  /*if (existingUser) {
    return res.send('Username or email already exists');
  } */
  //attempted to check array with a for-loop for similarities
 /* for(let i=0; i< userData.length; i++){
    if (existingUser.email == email || existingUser.username == username){
        return res.render('User already exists. Please try again.', 'signup.pug')
    }
  }
*/
  
  if (password.length < 5) {
    return res.send('Password must be at least 5 characters long');
  }


  // Create new user object
  const new_user = {
    firstName,
    lastName,
    username,
    password,
    email,
  };

  
  db.userData.push(new_user);
  db.update(); 
  res.send(`Thank you for signing up, ${username}! <a href="/login">Click to log in.</a>`);
    
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

    const isExistingUser = (userData) => {
        return userData.email === email || userData.username === username;
      };
  if (isExistingUser(userData)) {
         req.session.userID = username;
        req.session.isAuthenticated = true;
        res.redirect('/video/dashboard')
      }
    
})
module.exports= router;
