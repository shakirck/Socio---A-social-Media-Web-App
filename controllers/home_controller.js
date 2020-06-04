module.exports.home = function(req,res){
    // res.end( '<h1>SOCIO HOME<h1>');
    // res.cookies()
    console.log(req.cookies);
    return res.render('home',{
        title:'Home'
    });
}
module.exports.test = function(req,res){
    return res.render('test',{
        title:'test'
    })
}