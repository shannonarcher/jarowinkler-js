"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Distance = function Distance(a, b) {
  var matches = _matching(a, b);
  if (matches > 0) {
    // calculate the jaro distance
    var m = matches;
    var t = _transpositions(a, b);
    var s1 = a.length;
    var s2 = b.length;
    var similarity = (m / s1 + m / s2 + (m - t) / m) / 3;

    // return jaro if less than boost
    var boost = 0.7;
    if (similarity < boost) return similarity;

    // transform to jaro winkler 
    // prefix scale gives more favorable ratings to strings that share common prefixes
    var prefixScale = 0.1;
    var prefix = _prefix(a, b);
    return similarity + prefix * prefixScale * (1 - similarity);
  }

  return 0;
};

var _matching = function _matching(a, b) {
  var bound = Math.floor(Math.max(a.length, b.length) / 2) - 1;
  var matched = [];
  var matches = 0;
  for (var i = 0; i < a.length; i++) {
    for (var j = Math.max(0, i - bound); j <= Math.min(b.length, i + bound); j++) {
      if (a[i] === b[j] && !matched[j]) {
        matched[j] = true;
        matches++;
        break;
      }
    }
  }
  return matches;
};

/**
 * Calculate the number of transpositions between the two words	 
 * @param a String to compare
 * @param b String to compare
 */
var _transpositions = function _transpositions(a, b) {
  var bound = Math.floor(Math.max(a.length, b.length) / 2) - 1;

  var matches = {
    a: "",
    b: ""
  };
  var matched = [];

  // get order of string matches between each word
  for (var i = 0; i < a.length; i++) {
    for (var j = Math.max(0, i - bound); j <= Math.min(b.length, i + bound); j++) {
      if (a[i] === b[j] && !matched[j]) {
        matches.a += a[i];
        matched[j] = true;
        break;
      }
    }
  }

  matched = [];
  for (var _i = 0; _i < b.length; _i++) {
    for (var _j = Math.max(0, _i - bound); _j <= Math.min(a.length, _i + bound); _j++) {
      if (b[_i] === a[_j] && !matched[_j]) {
        matches.b += b[_i];
        matched[_j] = true;
        break;
      }
    }
  }

  // get transpositions
  var transpositions = 0;
  for (var _i2 = 0; _i2 < matches.a.length; _i2++) {
    if (matches.a[_i2] != matches.b[_i2]) transpositions++;
  }

  return Math.floor(transpositions / 2);
};

/**
 * Counts the number of common characters at the beginning
 * of each word up to a maximum of 4
 * @param a String to compare
 * @param b String to compare
 */
var _prefix = function _prefix(a, b) {
  var prefixLimit = 4;
  var p = 0;

  for (; p < prefixLimit; p++) {
    if (a[p] != b[p]) return p;
  }

  return ++p;
};

exports.default = {
  Distance: Distance,
  _matching: _matching,
  _prefix: _prefix,
  _transpositions: _transpositions
};