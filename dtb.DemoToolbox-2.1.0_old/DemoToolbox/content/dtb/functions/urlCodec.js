// urlCodec.js
Ext.namespace ('dtb.functions');

/*
 * URL-encodes a string
 * 
 * Example:
 * 		dtbUrlEncode('Hello World! #twitterhashtag') 
 * 		returns 'Hello%20World!%20%23twitterhashtag'
 */
dtb.functions.dtbUrlEncode = function (str) {
	if (str)
		return encodeURIComponent(str);
	else
		return str;
	
};

/*
 * URL-decodes a string
 * 
 * Example:
 * 		dtbUrlDecode('Hello%20World!%20%23twitterhashtag') 
 * 		returns 'Hello World! #twitterhashtag'
 */
dtb.functions.dtbUrlDecode = function (str) {
	if (str)
		return decodeURIComponent(str);
	else
		return str;
	
};

