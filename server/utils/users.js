[{
    id: 'lksjf',
    name: 'Shawn',
    room: 'A'
}]

// addUser (id, name, room)
// removeUser(id)
// getUser(id)
// getUserList

// class Person {

//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

// let me = new Person('shawn', 38);
// console.log(me.getUserDescription());

class Users {

    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        let user = {id, name, room}
        this.users.push(user);
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    removeUser(id) {
        // let found = this.users.find((id) => id === id);
        // this.users.splice(this.users.indexOf(found), 1);
        // return found;
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id)
        }
        return user;
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room)
        let namesArray = users.map((user) => user.name);
        // let list = []
        // for(let user of this.users) {
        //     if (user.room === room) {
        //         list.push(user.name)
        //     }
        // }
        return namesArray;
    }
}

module.exports = {Users};

let shawn = new Users();
shawn.addUser(1, 'shawn', 'B');
console.log(shawn);
shawn.addUser(2, 'bree', 'A');
shawn.addUser(3, 'Evee', 'A');
console.log(shawn);
shawn.removeUser(1);
console.log(shawn);
let users = shawn.getUserList('A');
console.log(users);

console.log('getUser()', shawn.getUser(2));

