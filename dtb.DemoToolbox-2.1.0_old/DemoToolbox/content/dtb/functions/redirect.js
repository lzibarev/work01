// redirect.js
Ext.namespace('dtb.functions');

dtb.functions.dtbRedirect = function (url) {
	
	if (url != null && url != undefined && url.length > 0) 
		location.href = url;

	return url;
};

dtb.functions.dtbRedirectIf = function(condition, url) {
	
	if (condition == true) {
		dtb.functions.dtbRedirect(url);
		return url;
		
	} else
		return '';
	
};