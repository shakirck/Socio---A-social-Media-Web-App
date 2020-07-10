module.exports.chatSockets=function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('New connection recieved',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected!!!!');
        })

        socket.on('join_room',function(data){
            console.log('joining request recieved',data);
            socket.join(data.chatRoom);

            io.in(data.chatRoom).emit('user_joined',data);
        });
        //detect message send 
        socket.on('send_message',function(data){
            console.log('message recieved server' ,data)
            
            io.in(data.chatRoom).emit('receive_message',data);
        });

    })
}