const path = require( "path" );
const http = require( "http" );
const express = require( "express" );
const socketIO = require( "socket.io" );

const { generateMessage, generateLocationMessage } = require( "./utils/message.js" );
const { isRealString } = require( "./utils/validation.js" );
const { Users } = require( "./utils/users.js" );

const publicPath = path.join( __dirname, "/../public" );
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer( app );
const io = socketIO( server );
const users = new Users();

// Assignment:
// Setup express app
// configure express middleware to server up public folder
// call app.listen on port 3000, including callback to confirm that it's up on port 3000
// start it up, display index.html on the root route

app.use( "/", express.static( publicPath ) );

io.on( "connection", ( socket ) => {
  console.log( "new user connected" );

  // socket.emit( "newEmail", {
  //   from: "mike@example.com",
  //   text: "Hey, what is going on?",
  //   createdAt: 123
  // } );
  //
  // socket.on( "createEmail", ( newEmail ) => {
  //   console.log( "createEmail", newEmail );
  // } );


  // Socket.emit from Admin text should say "Welcome to the chat app"
  // also, socket.broadcast.emit from Admin text "New user joined".

  socket.on( "join", ( params, callback ) => {
    if ( !isRealString( params.name ) || !isRealString( params.room ) ) {
      return callback( "Name and room name are required" );
    }

    socket.join( params.room );
    // socket.leave( params.room ) -- leaves this Room

    // io.emit - sends message to every connected user
      // io.to( params.room ).emit - send message to every connected user IN THE SPECIFIED ROOM
    // socket.broadcast.emit - sends message to everyone connected to socket server except me
      // socket.broadcast.to( params.room ).emit - sends message to everyone IN THE SPECIFIED ROOM except me
    // socket.emit - sends message to one specific user

    users.removeUser( socket.id );
    users.addUser( socket.id, params.name, params.room );

    io.to( params.room ).emit( "updateUserList", users.getUserList( params.room ) );

    socket.emit( "newMessage", generateMessage( "Admin", "Welcome to the chat app!" ) );
    socket.broadcast.to( params.room ).emit( "newMessage", generateMessage( "Admin", `${params.name} has joined.` ) );

    callback();
  } );

  socket.on( "createMessage", ( message, callback ) => {

    console.log( "createMessage: ", message );
    io.emit( "newMessage", generateMessage( message.from, message.text ) );

    callback();

    // socket.broadcast.emit( "newMessage", {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime(),
    // } );

  } );

  socket.on( "createLocationMessage", ( coords ) => {
    io.emit( "newLocationMessage", generateLocationMessage( "Admin", coords.latitude, coords.longitude ) );
  } );

  socket.on( "disconnect", () => {
    var user = users.removeUser( socket.id );
    if ( user ) {
      io.to( user.room ).emit( "updateUserList", users.getUserList( user.room ) );
      io.to( user.room ).emit(  "newMessage", generateMessage( "Admin", `${user.name} has left.` ) );
    }
  } );
} );

server.listen( port, () => {
  console.log( `Started on port ${port}` );
} );
