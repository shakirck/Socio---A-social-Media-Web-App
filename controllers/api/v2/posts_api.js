module.exports.index = function(req,res){

    return res.json(200,{
        version:'v2',
        message :'List of posts ',
        posts :[]
    })
}