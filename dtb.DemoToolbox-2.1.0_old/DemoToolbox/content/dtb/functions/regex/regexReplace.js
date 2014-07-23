// regexReplace.js
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
dtb.functions.dtbRegexReplace = function (str, pattern, replacement, modifiers) {

	// fix the backslashes coming from xCP
	pattern = pattern.replace(/\\{2}/g, "\\");
	
	var patt = new RegExp(pattern, modifiers);
	return str.replace(patt, replacement);
};