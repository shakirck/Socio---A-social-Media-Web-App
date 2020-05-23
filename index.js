const express = require('express');


const app = express();

const PORT = 5000;

// Uses an express router 
app.use('/',require('./routes'));


// setup view engine 
app.set('view engine ', 'ejs');
app.set('views','./views')
app.listen(PORT , function(err){
    if(err){
        console.log(`Error Running the Server ${err}`);
        return;
    }

    console.log(`Server is Running on  Port : ${PORT}`);
})