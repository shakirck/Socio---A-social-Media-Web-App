const express = require('express');
const env = require('./config/env');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view_helpers')(app)

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//setup chat server 
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening to port 5000')
console.log(env.name)
// if(env.name=='development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.assetPath,'scss'),
        dest: path.join(__dirname,env.assetPath,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
// }
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

//logger

app.use(logger(env.morgan.mode,env.morgan.options));
app.use(express.static(env.assetPath));
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
     secret: env.sessionCookieKey,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
