// push.js
Ext.namespace ('dtb.functions');

dtb.functions.dtbPushBool = function (array, element) {
	return dtb.functions.dtbPushStr(array, element);
};

dtb.functions.dtbPushDate = function (array, element) {
	return dtb.functions.dtbPushStr(array, element);
};

dtb.functions.dtbPushFloat = function (array, element) {
	return dtb.functions.dtbPushStr(array, element);
};

dtb.functions.dtbPushInt = function (array, element) {
	return dtb.functions.dtbPushStr(array, element);
};

/*
 * Adds an element to the end of an array
 * 
 * Example:
 * 		dtbPushStr(['a', 'b', 'c'], 'd') 
 * 		returns ['a', 'b', 'c', 'd'] as an array
 */
dtb.functions.dtbPushStr = function (array, element) {

	if (array != undefined && Object.prototype.toString.call(array) === '[object Array]')
		array.push(element);
	
	return array;
	
};