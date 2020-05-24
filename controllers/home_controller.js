module.exports.home = function(req,res){
    // res.end( '<h1>SOCIO HOME<h1>');
    return res.render('home',{
        title:'Home'
    });
}
module.exports.test = function(req,res){
    res.send('test');
}