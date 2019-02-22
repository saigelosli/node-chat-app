const expect = require( "expect" );

const { generateMessage, generateLocationMessage } = require( "./message.js" );
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

describe( "generateLocationMessage", () => {

  it( "Should generate correct location object", () => {
    // pass in from, latitude, longitude
    // assert from is correct
    // createdAt is a number
    // latitude and longitude are the correct (although contrived) values

    const sender = "theSender";
    const latitude = 29.43;
    const longitude = 43.29;
    const response = generateLocationMessage( sender, latitude, longitude );

    expect( response.from ).toBe( sender );
    expect( response.url ).toBe( `https://www.google.com/maps?q=${latitude},${longitude}` );
    expect( response.createdAt ).toBeA( "number" );

  } );
} );
