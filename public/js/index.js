const socket = io();

socket.on( "connect", function() {
  console.log( "connected to server" );

  socket.emit( "createMessage", {
    from: "Saige",
    text: "Hey, I just got on",
  } );
} );

socket.on( "disconnect", function() {
  console.log( "disconnected from server" );
} );

socket.on( "newMessage", ( newMessage ) => {
  console.log( "new message: ", newMessage );
} );
