const datastore = require("./data/datastore.js");
const User = require("./model/user.js").User;

let args = process.argv.slice(2);
let username = args[0];
let password = args[1];

let user = new User();
user.username = username;
user.setPassword(password);

console.log("Username: "+user.username);
console.log("Password: "+password);
console.log("Hash: "+user.hash);
console.log("Salt: "+user.salt);

datastore.initialise()
.then(() => datastore.createUser(user.toSQL()));