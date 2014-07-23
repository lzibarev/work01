// trim.js
Ext.namespace ('dtb.functions');

/*
 * Removes leading and/or trailing whitespace from a string
 * 
 * Example:
 * 		dtbTrim(' hello ') 
 * 		returns 'hello'
 */
dtb.functions.dtbTrim = function (str) {
	if (str)
		return Ext.String.trim();
	else
		return str;
	
}