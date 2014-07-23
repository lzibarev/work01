// join.js
Ext.namespace ('dtb.functions');

/*
 * Joins an array into a string using a delimiter
 * 
 * Example:
 * 		dtbJoinStr({'a', 'b', 'c'}, '|') 
 * 		returns 'a|b|c' as an array
 * 
 * (notice that in JavaScript, [] is used to denote an array, but {} is used in xCP)
 */

dtb.functions.dtbJoinBool = function(arr, delim) {
	return dtb.functions.dtbJoinStr(arr, delim);
};

dtb.functions.dtbJoinDate = function(arr, delim) {
	return dtb.functions.dtbJoinStr(arr, delim);
};

dtb.functions.dtbJoinFloat = function(arr, delim) {
	return dtb.functions.dtbJoinStr(arr, delim);
};

dtb.functions.dtbJoinInt = function(arr, delim) {
	return dtb.functions.dtbJoinStr(arr, delim);
};

dtb.functions.dtbJoinStr = function (arr, delim) {
	if (dtb.functions.dtbIsArray(arr))
		return arr.join(delim);
	else
		return arr;
	
};

dtb.functions.dtbIsArray = function(array) {
	if (array == undefined || Object.prototype.toString.call(array) !== '[object Array]')
		return false;
	else
		return true;
};