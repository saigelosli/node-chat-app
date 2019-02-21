const path = require( "path" );
const http = require( "http" );
const express = require( "express" );
const socketIO = require( "socket.io" );

const { generateMessage } = require( "./utils/message.js" );

const publicPath = path.join( __dirname, "/../public" );
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer( app );
const io = socketIO( server );

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
  socket.emit( "newMessage", generateMessage( "Admin", "Welcome to the chat app!" ) );
  socket.broadcast.emit( "newMessage", generateMessage( "Admin", "A new user has joined" ) );

  socket.on( "createMessage", ( message, callback ) => {

    console.log( "createMessage: ", message );
    io.emit( "newMessage", generateMessage( message.from, message.text ) );

    callback( "This is from the server" );

    // socket.broadcast.emit( "newMessage", {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime(),
    // } );

  } );

  socket.on( "disconnect", () => {
    console.log( "user disconnected" );
  } );
} );

server.listen( port, () => {
  console.log( `Started on port ${port}` );
} );
