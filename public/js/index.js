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

socket.on( "newLocationMessage", ( newLocationMessage ) => {
  let li = jQuery( "<li></li>" );
  let a = jQuery( `<a target="_blank">My current location</a>` );
  li.text( `${newLocationMessage.from}: ` );
  a.attr( "href", newLocationMessage.url );
  li.append( a );
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

const locationButton = jQuery( "#send-location" );
locationButton.on( "click", function() {
  if ( !navigator.geolocation ) {
    return alert( "Geolocation not support by your browser" );
  }

  navigator.geolocation.getCurrentPosition( function( position ) {
    console.log( position );
    socket.emit( "createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    } );
  }, function() {
    alert( "Unable to fetch location" );
  } );
} );
