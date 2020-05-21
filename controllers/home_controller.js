module.exports.home = function(req,res){
    res.end( '<h1>SOCIO HOME<h1>');
}
module.exports.test = function(req,res){
    res.send('test');
}