// dtbGetBrowserURL.js
Ext.namespace ('dtb.functions');

/*
 * Returns the current URL
 * 
 * Example:
 * 		dtbGetBrowserURL() 
 * 		returns 'http://nkxcp2:8000/Review_Assessment_Manager/#application/ramca_cases_browse'
 */
dtb.functions.dtbGetBrowserURL = function () {
	return location.href;
};

dtb.functions.dtbGetBrowserURLHash = function() {
	return window.location.hash.slice(1);
};

dtb.functions.dtbGetBrowserQueryString = function () {
	return location.search.slice(1);
};

dtb.functions.dtbGetBrowserQueryStringParam = function (paramName) {
    var result = {};
    var queryString = dtb.functions.dtbGetBrowserQueryString();
    var re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    
    if (result[paramName])
    	return result [paramName];
    else
    	return "";
};

/*
 * Returns the "user agent" (browser) being used by the client
 * 
 * Example:
 * 		dtbGetBrowserUserAgent() 
 * 		returns 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31'
 */
dtb.functions.dtbGetBrowserUserAgent = function () {
	return navigator.userAgent;
};
