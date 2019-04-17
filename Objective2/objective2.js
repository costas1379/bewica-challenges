'use strict';

const express = require('express');
const bodyParser = require('body-parser');

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

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var app = express();
app.use(bodyParser.json());
app.get('/password_check', (req, res) => {
  let password = req.body ? req.body.password : null
  if(!password){
  	res.send("Please send a password in data.\n");
  }else{
  	res.send(passwordCheck(password)+"\n");
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);