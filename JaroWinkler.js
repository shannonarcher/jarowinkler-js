var JaroWinkler = (function () {

	var JaroWinkler = function () {
		this.p = 0.1;
		this.l = 4;
		this.bt = 0.7;
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

		if (m > 0)
		{
			// calculate the jaro distance
			var dj = (m / s1 + m / s2 + (m-t) / m) / 3;

			// return jaro if less than boost
			if (dj < this.bt) 
				return dj;

			// transform to jaro winkler 
			return (dj + (p * this.p * (1 - dj)));
		}
		return 0;
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

		var matched = [];

		for (var i = 0; i < a.length; i++)
		{
			for (var j = Math.max(0, i-bound); 
					j <= Math.min(b.length, i+bound); 
					j++)
			{
				if (a[i] == b[j] && !matched[j]) 
				{
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
	JaroWinkler.prototype._transpositions = function (a, b) {
		var t = 0,
			max = Math.max(a.length, b.length),
			bound = Math.floor(Math.max(a.length, b.length) / 2) - 1;

		var amatch = "", bmatch = "";
		var matched = [];

		// get order of string matches between each word
		for (var i = 0; i < a.length; i++) 
		{
			for (var j = Math.max(0, i-bound); j <= Math.min(b.length, i+bound); j++)
			{
				if (a[i] == b[j] && matched[j] == null) {
					amatch += a[i];
					matched[j] = true;
					break;
				}
			}
		}

		matched = [];
		for (var i = 0; i < b.length; i++)
		{
			for (var j = Math.max(0, i-bound); j <= Math.min(a.length, i+bound); j++)
			{
				if (b[i] == a[j] && matched[j] == null) {
					bmatch += b[i];
					matched[j] = true;
					break;
				}
			}
		}

		// get transpositions
		for (var i = 0; i < amatch.length; i++)
		{
			if (amatch[i] != bmatch[i]) 
				t++;
		}

		return t / 2;
	};

	/**
	 *
	 * @param a String to compare
	 * @param b String to compare
	 */
	JaroWinkler.prototype._prefix = function (a, b) {
		var p = 0;

		for (p = 0; p < this.l; p++)
		{
			if (a[p] != b[p])
				return p;
		}

		return ++p;
	};

	var jaroWinkler = new JaroWinkler();
	return jaroWinkler;
})();