// dirty include of jarowinkler
var fs = require('fs');
eval(fs.readFileSync('JaroWinkler.js')+'');

// unit tests
// matching 
var pairs = [
	["MARTHA", "MARHTA", 6, 1],
	["DICKSONX", "DIXON", 4, 0],
	["DWAYNE", "DUANE", 4, 0],
	["CRATE", "TRACE", 3, 0]
];

// matches
for (var i = 0; i < pairs.length; i++) 
{
	console.log(pairs[i][0] + "-" + pairs[i][1] + " match: ");
	var result = JaroWinkler._matching(pairs[i][0], pairs[i][1]);
	if (result == pairs[i][2])
		console.log("PASSED");
	else
		console.log("FAILED expected " + pairs[i][2] + " actual " + result);

	console.log(pairs[i][1] + "-" + pairs[i][0] + " match: ");
	result = JaroWinkler._matching(pairs[i][1], pairs[i][0]);
	if (result == pairs[i][2])
		console.log("PASSED");
	else
		console.log("FAILED expected " + pairs[i][2] + " actual " + result);
}

// transpositions
for (var i = 0; i < pairs.length; i++) 
{
	console.log(pairs[i][0] + "-" + pairs[i][1] + " transpositions: ");
	var result = JaroWinkler._transpositions(pairs[i][0], pairs[i][1]);
	if (result == pairs[i][3])
		console.log("PASSED");
	else
		console.log("FAILED expected " + pairs[i][3] + " actual " + result);

	console.log(pairs[i][1] + "-" + pairs[i][0] + " transpositions: ");
	result = JaroWinkler._transpositions(pairs[i][1], pairs[i][0]);
	if (result == pairs[i][3])
		console.log("PASSED");
	else
		console.log("FAILED expected " + pairs[i][3] + " actual " + result);
}