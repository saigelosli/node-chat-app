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

socket.on( "newMessage", ( message ) => {
  let formattedTime = moment( message.createdAt ).format( "h:mm a" );
  let li = jQuery( "<li></li>" );
  li.text( `${message.from} ${formattedTime}: ${message.text}` );
  jQuery( "#messages" ).append( li );
} );

socket.on( "newLocationMessage", ( message ) => {
  let formattedTime = moment( message.createdAt ).format( "h:mm a" );
  let li = jQuery( "<li></li>" );
  let a = jQuery( `<a target="_blank">My current location</a>` );
  li.text( `${message.from} ${formattedTime}: ` );
  a.attr( "href", message.url );
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

  const messageTextBox = jQuery( "[name=message]" );

  socket.emit( "createMessage", {
    from: "User",
    text: messageTextBox.val(),
  }, function() {
    messageTextBox.val( "" );
  } );

} );

const locationButton = jQuery( "#send-location" );
locationButton.on( "click", function() {
  if ( !navigator.geolocation ) {
    return alert( "Geolocation not support by your browser" );
  }

  locationButton.attr( "disabled", "disabled" ).text( "Sending Location..." );

  navigator.geolocation.getCurrentPosition( function( position ) {
    console.log( position );
    locationButton.removeAttr( "disabled" ).text( "Send Location" );
    socket.emit( "createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    } );
  }, function() {
    locationButton.removeAttr( "disabled" ).text( "Send Location" );
    alert( "Unable to fetch location" );
  } );
} );
