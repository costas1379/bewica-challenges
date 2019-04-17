const passwordCheck = require('./passwordCheck.js').passwordCheck;

let password = process.argv[2] || null;
if(!password){
	console.log("Please enter a password.");
	return;
}
console.log(passwordCheck(password));