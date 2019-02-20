const path = require( "path" );
const http = require( "http" );
const express = require( "express" );
const socketIO = require( "socket.io" );

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

  socket.on( "createMessage", ( newMessage ) => {
    newMessage.createdAt = new Date().getTime();
    console.log( "createMessage: ", newMessage );
    socket.emit( "newMessage", newMessage );
  } );

  socket.on( "disconnect", () => {
    console.log( "user disconnected" );
  } );
} );

server.listen( port, () => {
  console.log( `Started on port ${port}` );
} );
