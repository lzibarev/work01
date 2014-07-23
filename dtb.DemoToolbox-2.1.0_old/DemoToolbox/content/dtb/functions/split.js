// split.js
Ext.namespace ('dtb.functions');

dtb.functions.dtbSplitBoolColumn = function (column) {
	return dtb.functions.dtbSplitStr(column, null);
};

dtb.functions.dtbSplitDateColumn = function (column) {
	return dtb.functions.dtbSplitStr(column, null);
};

dtb.functions.dtbSplitFloatColumn = function (column) {
	return dtb.functions.dtbSplitStr(column, null);
};

dtb.functions.dtbSplitIntColumn = function (column) {
	return dtb.functions.dtbSplitStr(column, null);
};

dtb.functions.dtbSplitStrColumn = function (column) {
	return dtb.functions.dtbSplitStr(column, null);
};

/*
 * Splits a string using a delimiter and returns an array
 * 
 * Example:
 * 		dtbSplitStr('a|b|c', '|') 
 * 		returns {'a', 'b', 'c'} as an array
 */
dtb.functions.dtbSplitStr = function (str, delim) {
	
	if (!str)
		return str;
	
	// This is true when being called from the split-column methods above
	if (Object.prototype.toString.call(str) === '[object Array]') {
		str = String(str);
		delim = ',';
	}
	
	return str.split(delim);
	
};