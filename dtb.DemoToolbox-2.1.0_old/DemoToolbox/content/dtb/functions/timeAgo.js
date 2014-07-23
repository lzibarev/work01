// timeAgo.js
Ext.namespace ('dtb.functions');

dtb.functions.dtbTimeAgo = function(date) {
	if (date == null)
		return date;
	
	var momentDate = moment(date);
	if (momentDate == null)
		return date;
	
	return momentDate.fromNow();
};
