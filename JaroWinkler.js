var JaroWinkler = (function () {

	var JaroWinkler = function () {

	};

	/**
	 * Takes two string values and returns a value d 
	 * between 0 and 1 indicating similarity
	 * @param a String to compare
	 * @param b String to compare
	 */
	JaroWinkler.prototype.Distance = function (a, b) {
		var s1 = a.length, 
			s2 = b.length,
			m = this._matching(a,b),
			t = this._transpositions(a,b),
			p = this._prefix(a,b);
	};

	/**
	 * Calculate matching characters between strings
	 * @param a String to compare
	 * @param b String to compare
	 */
	JaroWinkler.prototype._matching = function (a, b) {
		var matches = 0,	
			max = Math.max(a.length, b.length),
			bound = Math.floor(Math.max(a.length, b.length) / 2) - 1;

		for (var i = 0; i < a.length; i++)
		{
			for (var j = Math.max(0, i-bound); 
					j < Math.min(b.length, i+bound); 
					j++)
			{
				if (a[i] == b[j]) 
					matches++;
			}
		}

		return matches;
	};

	/**
	 * Calculate the number of transpositions between the two words
	 */
	JaroWinkler.prototype._transpositions = function (a, b) {
		var t = 0,
			max = Math.max(a.length, b.length),
			bound = Math.floor(Math.max(a.length, b.length) / 2) - 1;

		var amatch = "", bmatch = "";

		// get order of string matches between each word
		for (var i = 0; i < a.length; i++) 
		{
			for (var j = Math.max(0, i-bound); j < Math.min(b.length, i+bound); j++)
			{
				if (a[i] == b[j]) 
					amatch += a[i];
			}
		}

		for (var i = 0; i < b.length; i++)
		{
			for (var j = Math.max(0, i-bound); j < Math.min(a.length, i+bound); j++)
			{
				if (b[i] == a[j]) 
					bmatch += b[i];
			}
		}

		// get transpositions
		for (var i = 0; i < amatch.length; i++)
		{
			if (amatch[i] != bmatch[i])
				t++;
		}

		return Math.floor(t / 2);
	};

	/**
	 *
	 */
	JaroWinkler.prototype._prefix = function (a, b) {
		var p = 0;

		return p;
	};

	var jaroWinkler = new JaroWinkler();
	return jaroWinkler;
})();