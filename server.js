var express = require('express');
const session = require('express-session')
const app = express();
app.set('views','./views');
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
//session middlewear
app.use(session({
    secret: 'SomeSecretCode##LoadFromEnvironmentVariable',
    saveUninitialized: true,
    resave: false,
    cookie:{maxAge:60000}
}))

db_conn = '/Users/admin/Desktop/CUS1172_moorti/data/project3.json';
db_schema = {
    userData:[],
    videoData:[]

}
 
const loadDatabase = require("server_db.js"); // Require the correct file

global.db = loadDatabase(db_conn, db_schema);
//testing to see if it is reading the json file 
console.log(db);

const videoCredentials = require('./videoShareandDashboard')
app.use('/video', videoCredentials);

const userCredentials = require('./userAuthandReg')
app.use('/auth', userCredentials);

app.use('/resources', express.static('resources'));

app.listen(3000, function(){
    console.log('App listening on port 3000');
})

