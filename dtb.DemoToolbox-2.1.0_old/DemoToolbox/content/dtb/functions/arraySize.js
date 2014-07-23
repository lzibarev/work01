// arraySize.js
Ext.namespace ('dtb.functions');

dtb.functions.dtbArraySizeBool = function(boolArray) {
	return dtb.functions.dtbArraySizeStr(boolArray);
};

dtb.functions.dtbArraySizeDate = function(dateArray) {
	return dtb.functions.dtbArraySizeStr(dateArray);
};

dtb.functions.dtbArraySizeInt = function(intArray) {
	return dtb.functions.dtbArraySizeStr(intArray);
};

dtb.functions.dtbArraySizeFloat = function(floatArray) {
	return dtb.functions.dtbArraySizeStr(floatArray);
};

dtb.functions.dtbArraySizeStr = function(strArray) {
	if (Object.prototype.toString.call(strArray) === '[object Array]')
		return strArray.length;
	else
		return strArray;
	
};
