// regexMatch.js
Ext.namespace ('dtb.functions');

/*
 * Returns true if str contains pattern.
 * 
 * Example:
 * 		regexMatch('ABC-123', '[A-Z]{3}-\d{3}') 
 * 		returns true
 */
dtb.functions.dtbRegexMatch = function (str, pattern, modifiers) {

	// fix the backslashes coming from xCP
	pattern = pattern.replace(/\\{2}/g, "\\");
	
	var patt = new RegExp(pattern, modifiers);
	return patt.test(str);
};