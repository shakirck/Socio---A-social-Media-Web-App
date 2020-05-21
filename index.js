const express = require('express');


const app = express();

const PORT = 5000;

// Uses an express router 
app.use('/',require('./routes'));

app.listen(PORT , function(err){
    if(err){
        console.log(`Error Running the Server ${err}`);
        return;
    }

    console.log(`Server is Running on  Port : ${PORT}`);
})