// regexGroup.js
Ext.namespace ('dtb.functions');

/*
 * Returns the first grouping matched in parentheses.
 * 
 * Example:
 * 		dtbRegexGroup('ABC-123', '([A-Z]{3})-\d{3}') 
 * 		returns 'ABC'
 * 
 * 		dtbRegexGroup('111-222', '([A-Z][3})-\d{3}')
 * 		returns null
 */
dtb.functions.dtbRegexGroup = function (str, pattern, modifiers) {

	// fix the backslashes coming from xCP
	pattern = pattern.replace(/\\{2}/g, "\\");

	var patt = new RegExp(pattern, modifiers);
	var matcher = str.match(patt);
	
	if (matcher && matcher.length && matcher.length > 1)
		return matcher[1];
	else
		return null;
};