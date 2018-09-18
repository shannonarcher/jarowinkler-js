const Distance = (a, b) => {
  const matches = _matching(a, b);
  if (matches > 0) {
    // calculate the jaro distance
    const m = matches;
    const t = _transpositions(a, b);
    const s1 = a.length;
    const s2 = b.length;
    const similarity = (m / s1 + m / s2 + (m - t) / m) / 3;

    // return jaro if less than boost
    const boost = 0.7;
    if (similarity < boost)
      return similarity;

    // transform to jaro winkler 
    // prefix scale gives more favorable ratings to strings that share common prefixes
    const prefixScale = 0.1;
    const prefix = _prefix(a, b);
    return (similarity + (prefix * prefixScale * (1 - similarity)));
  }

  return 0;
};

const _matching = (a, b) => {
  const bound = Math.floor(Math.max(a.length, b.length) / 2) - 1;
  const matched = [];
  let matches = 0;
  for (var i = 0; i < a.length; i++) {
    for (var j = Math.max(0, i - bound);
      j <= Math.min(b.length, i + bound);
      j++) {
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
const _transpositions = (a, b) => {
  let bound = Math.floor(Math.max(a.length, b.length) / 2) - 1;

  const matches = {
    a: "",
    b: "",
  };
  let matched = [];

  // get order of string matches between each word
  for (let i = 0; i < a.length; i++) {
    for (let j = Math.max(0, i - bound); j <= Math.min(b.length, i + bound); j++) {
      if (a[i] === b[j] && !matched[j]) {
        matches.a += a[i];
        matched[j] = true;
        break;
      }
    }
  }

  matched = [];
  for (let i = 0; i < b.length; i++) {
    for (let j = Math.max(0, i - bound); j <= Math.min(a.length, i + bound); j++) {
      if (b[i] === a[j] && !matched[j]) {
        matches.b += b[i];
        matched[j] = true;
        break;
      }
    }
  }

  // get transpositions
  let transpositions = 0;
  for (let i = 0; i < matches.a.length; i++) {
    if (matches.a[i] != matches.b[i])
      transpositions++;
  }

  return Math.floor(transpositions / 2);
};

/**
 * Counts the number of common characters at the beginning
 * of each word up to a maximum of 4
 * @param a String to compare
 * @param b String to compare
 */
const _prefix = (a, b) => {
  const prefixLimit = 4;
  let p = 0;

  for (; p < prefixLimit; p++) {
    if (a[p] != b[p])
      return p;
  }

  return ++p;
};

export default {
  Distance,
  _matching,
  _prefix,
  _transpositions,
};