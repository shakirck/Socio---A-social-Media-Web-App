class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000");
    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("connection established");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatRoom: "coeial",
      });

      self.socket.on("user_joined", function (data) {
        console.log("user joined", data);
      });


    });

    //send message when click on button
    $('#send-message').click(function(){
        let msg = $('#chat-message-input').val();
        
        if(msg!=''){
            console.log('clicked to send message',msg);
            self.socket.emit('send_message',{
                message:msg,
                user_email:self.userEmail,
                chatRoom:'coeial'
            });
        }
    });
     self.socket.on("receive_message",function(data){
        console.log('messagerecieved',data);
        let newMessage = $('<li>');
        console.log(newMessage);
        newMessage.append($('<span>',{
            'html':data.message
        }));
        let messageType = 'other-messages';
        if(data.user_email==self.userEmail){
            messageType = 'self-messages';
        }
         newMessage.addClass(messageType);
        $('#chat-messages-list').append(newMessage);
    });


  }
}
