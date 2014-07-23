// regexReplaceStrArray.js
Ext.namespace ('dtb.functions');

/*
 * Replaces occurrence(s) of supplied regular expression with a value. If 'g' is
 * specified as a modifier, all occurrences will be replaced. Otherwise, only the
 * first occurence will be replaced. 
 * 
 * Examples:
 * 		dtbRegexReplace('ABC-123-123', '\\d{3}', 'XYZ') 
 * 		returns 'ABC-XYZ-123'
 * 
 * 		dtbRegexReplace('ABC-123-123', '\\d{3}', 'XYZ', 'g') 
 * 		returns 'ABC-XYZ-XYZ'
 */
dtb.functions.dtbRegexReplaceArrayStr = function (strArray, pattern, replacement, modifiers) {
	
	var strArrayCopy = strArray.slice(0); // copy by value, not reference

	// fix the backslashes coming from xCP
	pattern = pattern.replace(/\\{2}/g, "\\");
	var patt = new RegExp(pattern, modifiers);
	
	for (var i = 0; i < strArrayCopy.length; i++) {
		var str = strArrayCopy[i];
		strArrayCopy[i] = str.replace(patt, replacement);
		
	}
	
	return strArrayCopy;
	
};