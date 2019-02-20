const expect = require( "expect" );

const { generateMessage } = require( "./message.js" );
const { app } = require( "./../server.js" );

describe( "generateMessage", () => {

  it( "Should generate correct message object", () => {
    // store response in variable
    // assert from field matches
    // assert text field matches
    // assert createAt is a number

    const sender = "theSender";
    const message = "theMessage";
    const response = generateMessage( sender, message );

    expect( response.from ).toBe( sender );
    expect( response.text ).toBe( message );
    expect( response.createdAt ).toBeA( "number" );

  } );
} );
