const express = require( "express" );

const path = require( "path" );
const publicPath = path.join( __dirname, "/../public" );

const app = express();

const port = process.env.PORT || 3000;

// Assignment:
// Setup express app
// configure express middleware to server up public folder
// call app.listen on port 3000, including callback to confirm that it's up on port 3000
// start it up, display index.html on the root route

app.use( "/", express.static( publicPath ) );

app.listen( port, () => {
  console.log( `Started on port ${port}` );
} );

module.exports = { app };
