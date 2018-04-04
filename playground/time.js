const moment = require('moment');

// Jan 1st 1970 00:00:00 am ==> 0
// 1000 = 1 sec

// let date = new Date();
// let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
// console.log(months[date.getMonth()]);
let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1234;
let date = moment(createdAt);
// date.add(1,'year');
console.log(date.format('h:mm a'));
console.log(moment(someTimestamp).format('h:mm a'));