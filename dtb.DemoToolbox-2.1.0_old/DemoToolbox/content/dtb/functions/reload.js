// reload.js
Ext.namespace('dtb.functions');

dtb.functions.dtbReloadIf = function(condition) {
	
	if (condition == true)
		location.reload();
	
	return condition;
	
};