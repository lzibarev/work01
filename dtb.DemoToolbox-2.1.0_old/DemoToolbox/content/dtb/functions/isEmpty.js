// isEmpty.js

Ext.namespace ('dtb.functions');

dtb.functions.dtbIsEmptyDate = function(date) {
	return dtb.functions.dtbIsEmptyStr(date);
};

dtb.functions.dtbIsEmptyStr = function(str) {
	if (str.length && str.length > 0)
		return false;
	else
		return true;
	
};
