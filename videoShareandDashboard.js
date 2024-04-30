const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/new_video',(req,res)=>{
    model_view={
        action_url: '/new_video'
    }
    if(req.session.isAuthenticated == true){
        res.render('shareVideo.pug')
    }
   else{ res.send("You must be logged in to view this content.")
    res.redirect('./login')
}
});

router.post('/new_video', (req,res)=>{
    const{title, url} = req.body
    if(req.session.isAuthenticated == true ){
    const existingVideo = (videoData => videoData.url === url)
    if(!existingVideo &&(url.length > 0)&& (title.length>0)){
        new_video = {
            url: url,
            title: title 
        }
        db.model.videoData.push(new_video)
        db.update();
        var mainmessage = 'Video successfully uploaded!'
        res.render('sharevideo.pug',{mainmessage})
    }
    else if(url.length == 0){
        var message = 'Invalid or missing URL'
        res.send(message);
    }
    else if (title.length == 0){
        var message = 'Please give your video a title'
        res.send(message)
    }
}
    else {
        res.send('Please sign in to share this Video, <a href = "/login" > Please sign in </a>')
    }
});
//use case 4: video dashboard
router.get('/dashboard/:videofilter',(req,res)=>{
    let query = req.params['videofilter']
    model_view = {
        action_url: `/dashboard/${query}`
    }
    if(req.session.isAuthenticated == true){
        res.render('dashboard.pug')
    }
    else{
        res.send('Please log in to view this content, <a href = "/login"> Please login </a>')
    }
});
module.exports = router;

