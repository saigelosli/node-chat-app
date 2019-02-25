const expect = require( "expect" );

const { Users } = require( "./users.js" );

describe( "Users", () => {

  var users;

  beforeEach( () => {
    users = new Users();
    users.users = [{
      id: 1,
      name: "Mike",
      room: "Node Course"
    },{
      id: 2,
      name: "Jen",
      room: "React Course"
    },{
      id: 3,
      name: "Julie",
      room: "Node Course"
    }]
  } );

  it( "Should add new user", () => {

    let users = new Users();
    let user = {
      id: "123",
      name: "Saige",
      room: "The office fans",
    }

    let responseUser = users.addUser( user.id, user.name, user.room );

    expect( users.users ).toEqual( [user] );
  } );

  it( "Should return names for node course", () => {
    let userList = users.getUserList( "Node Course" );
    expect( userList ).toEqual( [ "Mike", "Julie" ] );
  } );

  it( "Should return names for react course", () => {
    let userList = users.getUserList( "React Course" );
    expect( userList ).toEqual( [ "Jen" ] );
  } );

  it( "Should remove a user", () => {
    // take the id of a seed user, remove it, assert that it was removed
    let lengthBeforeRemoval = users.users.length;
    expect( lengthBeforeRemoval ).toBe( 3 );
    let removedUser = users.removeUser( 2 );
    expect( removedUser ).toEqual( { id: 2, name: "Jen", room: "React Course" } );
    let lengthAfterRemoval = users.users.length;
    expect( lengthBeforeRemoval - 1 ).toBe( lengthAfterRemoval );
    let userList = users.users.map( ( user ) => user.name );
    expect( userList ).toEqual( [ "Mike", "Julie" ] );
  } );

  it( "Should not remove a user", () => {
    // pass in non-existing id, make sure it doesn't remove one of the elements
    let user = users.removeUser( 5 );
    expect( user ).toNotExist();
    let userList = users.users.map( ( user ) => user.name );
    expect( userList ).toEqual( [ "Mike", "Jen", "Julie" ] );
  } );

  it( "Should find user", () => {
    // With valid id
    let user = users.getUser( 3 );
    expect( user ).toEqual( { id: 3, name: "Julie", room: "Node Course" } );
    expect( users.users.length ).toBe( 3 );
  } );

  it( "Should not find user", () => {
    // With invalid id
    let user = users.getUser( 5 );
    expect( user ).toNotExist();
  } );

} );
