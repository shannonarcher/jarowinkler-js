'use strict';

require('colors');

var _JaroWinkler = require('./JaroWinkler');

var _JaroWinkler2 = _interopRequireDefault(_JaroWinkler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// unit tests
// matching 
// "not used", but mods string object 
var pairs = [["MARTHA", "MARHTA", 6, 1], ["DICKSONX", "DIXON", 4, 0], ["DWAYNE", "DUANE", 4, 0], ["CRATE", "TRACE", 3, 0]];

// matches
for (var i = 0; i < pairs.length; i++) {
	var output = pairs[i][0] + "-" + pairs[i][1] + " match: ";

	var result = _JaroWinkler2.default._matching(pairs[i][0], pairs[i][1]);
	if (result == pairs[i][2]) output += "PASSED";else output += "FAILED, expected " + pairs[i][2] + " actual " + result;

	output += "\n" + pairs[i][1] + "-" + pairs[i][0] + " match: ";

	result = _JaroWinkler2.default._matching(pairs[i][1], pairs[i][0]);
	if (result == pairs[i][2]) output += "PASSED";else output += "FAILED, expected " + pairs[i][2] + " actual " + result;

	if (output.indexOf("PASSED")) console.log(output.green);else console.log(output.red);
}

console.log();

// transpositions
for (var i = 0; i < pairs.length; i++) {
	var output = pairs[i][0] + "-" + pairs[i][1] + " transpositions: ";

	var result = _JaroWinkler2.default._transpositions(pairs[i][0], pairs[i][1]);
	if (result == pairs[i][3]) output += "PASSED";else output += "FAILED, expected " + pairs[i][3] + " actual " + result;

	output += "\n" + pairs[i][1] + "-" + pairs[i][0] + " transpositions: ";

	result = _JaroWinkler2.default._transpositions(pairs[i][1], pairs[i][0]);
	if (result == pairs[i][3]) output += "PASSED";else output += "FAILED, expected " + pairs[i][3] + " actual " + result;

	if (output.indexOf("PASSED") > -1) console.log(output.green);else console.log(output.red);
}

// values from paper
console.log();

var values = [["archer", "archer", 1], ["shackleford", "shackelford", .9848], ["cunningham", "cunnigham", .9833], ["nichleson", "nichulson", .9630], ["massey", "massie", .9444], ["abroms", "abrams", .9222], ["galloway", "calloway", .9167], ["lampley", "campley", .9048], ["dixon", "dicksonx", .8133], ["frederick", "fredric", .9630], ["michele", "michelle", .9792], ["jesse", "jessie", .9722], ["martha", "marhta", .9611], ["jonathon", "jonathan", .9583], ["julies", "juluis", .9222], ["jeraldine", "geraldine", .9259], ["yvette", "yevett", .9000], ["tanya", "tonya", .8800], ["dwayne", "duane", .8400]];

var passed = 0;
for (var i = 0; i < values.length; i++) {
	var output = "";
	var result = _JaroWinkler2.default.Distance(values[i][0], values[i][1]);

	if (CompareFloatWithDelta(result, values[i][2], 0.0001)) {
		output += "PASSED";
		passed++;
	} else output += "FAILED";
	output += " expected " + values[i][2] + " actual " + result.toFixed(4);

	if (output.indexOf("PASSED") > -1) console.log(values[i][0], output.green);else console.log(values[i][0], output.bgRed.white);
}
console.log();
console.log("Passed:".green + " " + passed);
console.log("Failed:".bgRed.white + " " + (values.length - passed));

function CompareFloatWithDelta(a, b, delta) {
	return a < b + delta && a > b - delta;
}