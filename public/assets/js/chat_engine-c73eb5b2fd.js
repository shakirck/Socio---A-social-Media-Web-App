class ChatEngine{constructor(e,s){this.chatBox=$("#"+e),this.userEmail=s,this.socket=io.connect("http://52.54.97.43:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established"),e.socket.emit("join_room",{user_email:e.userEmail,chatRoom:"coeial"}),e.socket.on("user_joined",(function(e){console.log("user joined",e)}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&(console.log("clicked to send message",s),e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatRoom:"coeial"}))})),e.socket.on("receive_message",(function(s){console.log("messagerecieved",s);let o=$("<li>");console.log(o),o.append($("<span>",{html:s.message}));let n="other-messages";s.user_email==e.userEmail&&(n="self-messages"),o.addClass(n),$("#chat-messages-list").append(o)}))}}