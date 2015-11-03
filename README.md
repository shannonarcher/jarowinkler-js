#Jaro-Winkler Distance
**[From Wikipedia](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)**

The Jaro–Winkler distance (Winkler, 1990) is a measure of similarity between two strings. 
It is a variant of the Jaro distance metric (Jaro, 1989, 1995), a type of string edit distance, 
and was developed in the area of record linkage (duplicate detection) (Winkler, 1990). 
The higher the Jaro–Winkler distance for two strings is, the more similar the strings are. 
The Jaro–Winkler distance metric is designed and best suited for short strings such as person names. 
The score is normalized such that 0 equates to no similarity and 1 is an exact match.

##How to use?
```Javascript
var a = "Jaro", b = "Jarro";
var distance = JaroWinkler.Distance(a, b);

// Prints "Distance: 0.9533"
console.log("Distance:", distance);
```
Returns a value between 0 and 1 where 0 is no similarity and 1 is an exact match.

##Tests
Using the values found in the paper by Jaro-Winkler[1] and the wikipedia page examples, a 
script to unit test the matching, transposition and distance formula's can be found in 
test/JaroWinklerTest.js. It will output the following:

```
> node test/JaroWinklerTest.js

MARTHA-MARHTA match: PASSED
MARHTA-MARTHA match: PASSED
DICKSONX-DIXON match: PASSED
DIXON-DICKSONX match: PASSED
DWAYNE-DUANE match: PASSED
DUANE-DWAYNE match: PASSED
CRATE-TRACE match: PASSED
TRACE-CRATE match: PASSED

MARTHA-MARHTA transpositions: PASSED
MARHTA-MARTHA transpositions: PASSED
DICKSONX-DIXON transpositions: PASSED
DIXON-DICKSONX transpositions: PASSED
DWAYNE-DUANE transpositions: PASSED
DUANE-DWAYNE transpositions: PASSED
CRATE-TRACE transpositions: PASSED
TRACE-CRATE transpositions: PASSED

archer PASSED expected 1 actual 1.0000
shackleford PASSED expected 0.9848 actual 0.9848
cunningham PASSED expected 0.9833 actual 0.9833
nichleson PASSED expected 0.963 actual 0.9630
massey PASSED expected 0.9444 actual 0.9444
abroms PASSED expected 0.9222 actual 0.9222
galloway PASSED expected 0.9167 actual 0.9167
lampley PASSED expected 0.9048 actual 0.9048
dixon PASSED expected 0.8133 actual 0.8133
frederick PASSED expected 0.963 actual 0.9630
michele PASSED expected 0.9792 actual 0.9792
jesse PASSED expected 0.9722 actual 0.9722
martha PASSED expected 0.9611 actual 0.9611
jonathon PASSED expected 0.9583 actual 0.9583
julies PASSED expected 0.9222 actual 0.9222
jeraldine PASSED expected 0.9259 actual 0.9259
yvette PASSED expected 0.9 actual 0.9000
tanya PASSED expected 0.88 actual 0.8800
dwayne PASSED expected 0.84 actual 0.8400

Passed: 19
Failed: 0
```
**Note:** The values used to test the implementation of this formula from the paper 
have been adjusted to be inline with the formula described by the paper without use 
of an adjustment table.

##Source
[[1] String Comparator Metrics and Enhanced Decision Rules in the Fellegi-Sunter Model of Record Linkage](http://www.amstat.org/sections/srms/Proceedings/papers/1990_056.pdf) 

[[2] Wikipedia](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance) 
