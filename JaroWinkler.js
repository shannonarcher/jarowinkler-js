var JaroWinkler = (function () {

	var JaroWinkler = function () {

	};

	/**
	 * Takes two string values and returns a value d 
	 * between 0 and 1 indicating sameness
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
			matchWindow = Math.floor(Math.max(a.length, b.length) / 2) - 1;

		for (var i = 0; i < a.length; i++)
		{
			for (var j = Math.max(0, i-matchWindow); 
					j < Math.min(b.length, i+matchWindow); 
					j++)
			{
				if (a[i] == b[j]) 
				{
					matches++;
				}
			}
		}

		return matches;
	};

	/**
	 *
	 */
	JaroWinkler.prototype._transpositions = function (a, b) {
		var t = 0,
			max = Math.max(a.length, b.length),
			matchWindow = Math.floor(Math.max(a.length, b.length) / 2) - 1;

		for (var i = 0; i < a.length; i++)
		{
			for (var j = Math.max(0, i-matchWindow); 
					j < Math.min(b.length, i+matchWindow); 
					j++)
			{
				if (a[i] == b[j] && i != j) 
				{
					console.log(a[i],b[j],i,j);
					t++;
				}
			}
		}

		t = Math.floor(t / 2);

		return t;
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