// ifElse.js
Ext.namespace ('dtb.functions');

/*
 * Works as a tertiary operator.
 * 
 * Example:
 * 		dtbIfElseStr(35>36, 'foo', 'bar') 
 * 		returns 'bar'
 */

dtb.functions.dtbIfElse = function (condition, trueVal, falseVal) {
	if (condition)
		return trueVal;
	else
		return falseVal;
	
};

dtb.functions.dtbIfElseBool = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseBoolArray = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseDate = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseDateArray = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseFloat = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseFloatArray = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseInt = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseIntArray = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseStr = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};

dtb.functions.dtbIfElseStrArray = function (condition, trueVal, falseVal) {
	return dtb.functions.dtbIfElse(condition, trueVal, falseVal);
};
