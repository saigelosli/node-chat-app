

// addUser( id, name, roomName )
// removeUser( id )
// getUser( id )
// getUserList( room )

// class Person {
//   constructor( name, age ) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person( "Saige", 55 );
// var description = me.getUserDescription();
// console.log( description );

class Users {
  constructor() {
    this.users = [];
  }

  addUser( id, name, room ) {
    let user = { id, name, room };
    this.users.push( user );
    return user;
  }

  removeUser( id ) {
    // return user that was removed
    let removedUser = this.users.filter( ( user ) => user.id == id )[0];
    let remainingUsers = this.users.filter( ( user ) => user.id != id );
    this.users = remainingUsers;
    return removedUser;
  }

  getUser( id ) {
    let user = this.users.filter( ( user ) => user.id == id )[0];
    return user;
  }

  getUserList( room ) {
    let users = this.users.filter( ( user ) => user.room == room );
    let namesArray = users.map( ( user ) => user.name );
    return namesArray;
  }
}

module.exports = { Users };
