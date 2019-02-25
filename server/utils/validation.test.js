const expect = require( "expect" );

const { isRealString } = require( "./validation.js" );

describe( "isRealString", () => {

  it( "Should reject non-string values", () => {

    const response = isRealString( 99 );
    expect( response ).toBe( false );
  } );

  it( "Should reject strings with only spaces", () => {

    const response = isRealString( "     " );
    expect( response ).toBe( false );
  } );

  it( "Should allow strings with non-space characters", () => {

    const response = isRealString( "  A" );
    expect( response ).toBe( true );
  } );

} );
