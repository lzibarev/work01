// dtbGetLabelFromPicklist.js
Ext.namespace ('dtb.functions');

/*
 * Gets the label for a provided picklist value
 * 
 * Example:
 * 		dtbGetLabelFromPicklist('idcmobi_object_types', 'idcmobi_credit_report') 
 * 		returns 'Credit Report'
 */
dtb.functions.dtbGetLabelFromPicklist_picklistJson = null;
dtb.functions.dtbGetLabelFromPicklist_appPropsArray = null;

dtb.functions.dtbGetLabelFromPicklist = function (picklistName, value) {
	
	var picklistJson = dtb.functions.dtbGetLabelFromPicklist_picklistJson;
	var appPropsArray = dtb.functions.dtbGetLabelFromPicklist_appPropsArray;
	
	if (picklistJson == null || appPropsArray == null) {
		
		var request = new XMLHttpRequest();
		request.open('GET', 'picklist/picklist_data.json', false);
		request.send(null);
		
		dtb.functions.dtbGetLabelFromPicklist_json = picklistJson = JSON.parse(request.responseText);
		
		// TODO: get locale-specific application.properties
		
		request.open('GET', 'locales/application.properties', false);
		request.send(null);
		
		dtb.functions.dtbGetLabelFromPicklist_appPropsArray = appPropsArray = dtb.functions.dtbGetLabelFromPicklist_parseProps(request.responseText);
		
	}
	

	var picklist = picklistJson[picklistName].data;
	
	for (var i = 0; i < picklist.length; i++) {
		var obj = picklist[i];
		if (obj.value == value) {
			var label = obj.label;
			return appPropsArray[label];
		}
	}
	

	return null;
}

dtb.functions.dtbGetLabelFromPicklist_parseProps = function (text) {
	
	var lines = text.split('\n');
	var pattern = new RegExp(/([^=]+)=(.+)/);
	var aarray = {};
	
	for (var i = 0; i < lines.length; i++) {
		
		var line = lines[i];
		var matcher = line.match(pattern);
		
		if (!matcher) // not a key=value line
			continue;
		
		var key = "${" + matcher[1] + "}";
		var value = matcher[2];
		
		aarray[key] = value;
		
	}
	
	return aarray;

}
