const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = 5000;
app.use(express.urlencoded({useNewUrlParser:true}));
app.use(cookieParser());
app.use(express.static('./assets'));

 const db = require('./config/mongoose');
app.use(expressLayouts);

//For fetching and placing sripts and styles in pages 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Uses an express router 
app.use('/',require('./routes'));


// setup view engine 
app.set('view engine', 'ejs');
app.set('views','./views')
app.listen(PORT , function(err){
    if(err){
        console.log(`Error Running the Server ${err}`);
        return;
    }

    console.log(`Server is Running on  Port : ${PORT}`);
})