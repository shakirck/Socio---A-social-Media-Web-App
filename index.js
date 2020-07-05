const express = require('express');
const app = express();
const PORT = 5000;

const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

//session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

const mongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded({useNewUrlParser:true}));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'))
 const db = require('./config/mongoose');
app.use(expressLayouts);

//For fetching and placing sripts and styles in pages 
app.set('layout extractStyles',true);
app.set("layout extractScripts", true)


// setup view engine 
app.set('view engine', 'ejs');
app.set('views','./views')


app.use(session({
    name:'Socio',
    secret:'mykey',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'Setup Ok');
    }
    )

}));

app.use(passport.initialize())
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//flash

app.use(flash());
app.use(customMWare.setFlash);
// Uses an express router 
app.use('/',require('./routes'));



app.listen(PORT , function(err){
    if(err){
        console.log(`Error Running the Server ${err}`);
        return;
    }

    console.log(`Server is Running on  Port : ${PORT}`);
})