// dtbGetFormatIconTag.js
Ext.namespace ('dtb.functions');

/*
 * Returns an HTML <img> tag with the appropriate URL for the format icon
 * 
 * Example:
 * 		dtbGetFormatIconTag('png', 16) 
 * 		returns '<img width="16" height="16" src="component/xcp-core/iconslib/lib/icons/format/f_png_16.gif"/>'
 */
dtb.functions.dtbGetFormatIconTag = function (format, size) {
	return '<img width="' + size + '" height="' + size + '" src="' + dtb.functions.dtbGetFormatIconURL(format, size) + '"/>';
};

/*
 * Returns the appropriate URL for the icon.
 * 
 * Example:
 * 		dtbGetFormatIconURL('png', 16) 
 * 		returns 'component/xcp-core/iconslib/lib/icons/format/f_png_16.gif'
 */
dtb.functions.dtbGetFormatIconURL = function (format, size) {
	return 'component/xcp-core/iconslib/lib/icons/format/f_' + format + '_' + size + '.gif';
};