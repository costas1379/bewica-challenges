const params = {
  "length": 10,
  "must_have_numbers": true,
  "must_have_caps": true
}

const  passwordCheck = (pass)=>{
	let message = "";
	let validLength = (pass.length >= params.length) ? true : false;
	let validNumbers = (!params.must_have_numbers || pass.match(/\d/gm)) ? true : false;
	let validCaps = (!params.must_have_caps || pass.match(/[A-Z]/gm)) ? true : false;
	message = (!validLength) ? `${message} : Minimum password length is ${params.length}` : message
	message = (!validNumbers) ? `${message} : Password must contain at least one number` : message
	message = (!validCaps) ? `${message} : Password must contain at least one capital letter` : message
	return `${validLength && validNumbers && validCaps} ${message}`
}
module.exports.passwordCheck = passwordCheck