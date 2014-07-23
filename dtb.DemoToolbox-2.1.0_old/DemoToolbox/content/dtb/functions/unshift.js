// push.js
Ext.namespace ('dtb.functions');

dtb.functions.dtbUnshiftBool = function (element, array) {
	return dtb.functions.dtbUnshiftStr(element, array);
};

dtb.functions.dtbUnshiftDate = function (element, array) {
	return dtb.functions.dtbUnshiftStr(element, array);
};

dtb.functions.dtbUnshiftFloat = function (element, array) {
	return dtb.functions.dtbUnshiftStr(element, array);
};

dtb.functions.dtbUnshiftInt = function (element, array) {
	return dtb.functions.dtbUnshiftStr(element, array);
};

/*
 * Adds an element to the beginning of an array
 * 
 * Example:
 * 		dtbUnshiftStr('a', ['b', 'c', 'd']) 
 * 		returns ['a', 'b', 'c', 'd'] as an array
 */
dtb.functions.dtbUnshiftStr = function (element, array) {

	if (array != undefined && Object.prototype.toString.call(array) === '[object Array]')
		array.unshift(element);
	
	return array;
	
};