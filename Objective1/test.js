var passwordCheck = require('./passwordCheck.js').passwordCheck
const testCases = [
	{pass: "", expected:"false"},
	{pass:"abcdefghi", expected:"false"},
	{pass:"asdfasdfasdf1", expected:"false"},
	{pass:"Asdfasdfasdf1",expected:"true"}
]
for(let i in testCases){
	console.log(`Checking against password ${testCases[i].pass} : expected result : ${testCases[i].expected}`)
	console.log(`Output : ${passwordCheck(testCases[i].pass)}`)
	console.log(`Test ${(passwordCheck(testCases[i].pass).match(testCases[i].expected)) ? 'passed' : 'failed'}\n`)
	// console.log(pc.passwordCheck(testCases[i].pass))
}