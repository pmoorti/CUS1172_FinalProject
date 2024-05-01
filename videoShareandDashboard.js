// use case 3: share a video 
const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/new_video',(req,res)=>{
    model_view={
        action_url:'/new_video'
    }
    if(req.session.isAuthenticated == true){
        res.render('shareVideo.pug')
    }
   else{ 
     var message ="You must be logged in to share this content."
    res.send(`${message} <a href ="/auth/login"> Please Login.</a>`)
}
});
router.post('/new_video', (req,res)=>{
    if(req.session.isAuthenticated == true ){
    const {url, title} = req.body
    const existingVideo = db.model.videoData.find(video => video.url === url)
    if(existingVideo){
        var message = "Video already exists. Please Try Again."
        return res.send(`${message} <a href="/video/new_video">Back to Video Share.</a>`);
        }
    if(url.length == 0) {
        var message = "Please enter video URL."
        return res.send(`${message} <a href = "/video/new_video">Back to Video Share.</a>`);
    }
    
    const new_video = {
        url,
        title,
    };

    db.model.videoData.push(new_video)
    db.update();
    var mainmessage = 'Video successfully uploaded!'
    res.send(`${mainmessage}<a href ="/video/dashboard/all">Click to go to dashboard</a>`)
    }
});
//use case 4: video dashboard
router.get('/dashboard/:videofilter',(req,res)=>{
    let query = req.params['videofilter']
    model_view = {
        action_url: `/dashboard/${query}`
    }
    if(req.session.isAuthenticated == true){
        if(query === 'all')
        res.render('dashboard.pug',{ videofilter: 'all' });
        if(query === 'mine'){
        res.render('dashboard.pug',{videofilter:'mine'});
        }
    }
    else{
        res.send('Please log in to view this content, <a href = "/auth/login"> Please login </a>')
    }
});
module.exports = router;

