const socket = io();

socket.on( "connect", function() {
  console.log( "connected to server" );

  // socket.emit( "createEmail", {
  //   to: "jen@example.com",
  //   text: "Hello there"
  // } );

} );

socket.on( "disconnect", function() {
  console.log( "disconnected from server" );
} );

// socket.on( "newEmail", function( email ) {
//   console.log( "new email", email );
// } );

socket.on( "newMessage", ( newMessage ) => {
  console.log( "new message: ", newMessage );
  let li = jQuery( "<li></li>" );
  li.text( `${newMessage.from}: ${newMessage.text}` );
  jQuery( "#messages" ).append( li );
} );

// socket.emit( "createMessage", {
//   from: "Frank",
//   text: "Hi",
// }, function( data ) {
//   console.log( "Got it. ", data );
// } );

$( "#message-form" ).on( "submit", function( e ) {
  // Prevent default behavior (form submission)
  e.preventDefault();

  socket.emit( "createMessage", {
    from: "User",
    text: jQuery( '[name=message]' ).val(),
  }, function() {

  } );

} );
