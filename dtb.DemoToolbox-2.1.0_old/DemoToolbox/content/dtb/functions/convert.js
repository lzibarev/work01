// convert.js
Ext.namespace ('dtb.functions');

/*
 * bool to x
 */

dtb.functions.dtbConvertBoolToFloat = function(bool) {
	if (bool == false)
		return 0.0;
	else
		return 1.0;
};

dtb.functions.dtbConvertBoolToInt = function(bool) {
	if (bool == false)
		return 0;
	else
		return 1;
};

dtb.functions.dtbConvertBoolToStr = function (bool) {
	return bool.toString();
};

/*
 * date to x
 */

dtb.functions.dtbConvertDateToStr = function (date, format) {
	if (date == null)
		return date;
	
	if (format != null && format != undefined && format.length > 0) {
		var momentDate = moment(date);
		if (momentDate != null)
			return moment(date).format(format);
		else
			return date;
	} else
		return date.toString();
};

/*
 * float to x
 */

dtb.functions.dtbConvertFloatToBool = function(floatVal) {
	if (floatVal == null || floatVal == undefined || floatVal == 0.0)
		return false;
	else
		return true;
};

dtb.functions.dtbConvertFloatToInt = function(floatVal) {
	return parseInt(floatVal);
};

dtb.functions.dtbConvertFloatToStr = function (floatVal, precision) {
	if (precision == null || precision == undefined)
		precision = 2;
	
	return floatVal.toFixed(precision);
};

/*
 * int to x
 */

dtb.functions.dtbConvertIntToBool = function(intVal) {
	if (intVal == null || intVal == undefined || intVal == 0)
		return false;
	else
		return true;
};

dtb.functions.dtbConvertIntToFloat = function(intVal) {
	return praseFloat(intVal);
};

dtb.functions.dtbConvertIntToStr = function (intVal) {
	return intVal.toString();
};

/*
 * string to x
 */

dtb.functions.dtbConvertStrToBool = function(str) {
	if (str == null || str == undefined || str == "" || str.toLowerCase() == "false")
		return false;
	else
		return true;
};

dtb.functions.dtbConvertStrToFloat = function(str) {
	if (isNaN(parseFloat(str)))
		return '';
	else
		return parseFloat(str);
};

dtb.functions.dtbConvertStrToInt = function(str) {
	if (isNaN(parseInt(str)))
		return '';
	else
		return parseInt(str);
};
