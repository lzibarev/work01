
/**
 * @class dtb.widgets.designer.Heading
 * @extends xcp.designer.Component
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Heading
 * @param {cmp} runtime component.
 */
Ext.define('dtb.widgets.designer.Heading', {
	extend: 'xcp.designer.Component',

	constructor: function(cmp){
		dtb.widgets.designer.Heading.superclass.constructor.call(this, cmp);
		
		this.propertyConfig = {
		"tabs": [{
				"name": "general",
				"sections": [{ 
						"name" : "basic",
						"properties": [
						               {"name": "img", "editor" : "com.emc.xcp.uitemplate.ui.property.section.ImageResourcePropertyEditor","reCreateCmpOnChange": true},
						               {"name": "staticText"},
						               {"name": "debug"}
						               ]
					},{ 
						"name" : "value",
						"label": "Value",
						"properties": [{"name":"dynamicText"}]
					}]
			    },
            ]
		};
	},
	updateComponent: function(propertiesJSONObject) {
		//javaLog("xcp.widget.designer.Richtext", "updateComponent", "log");
		switch (propertiesJSONObject.name) {
/*		case "img":
			this.cmp.img = propertiesJSONObject.value;
			this.cmp.updateDisplay();
			break;			
		case "dynamicText":
			this.cmp.setValue(propertiesJSONObject.value);
			break;
*/
		case "staticText":
			this.cmp.staticText = propertiesJSONObject.value;
			this.cmp.updateDisplay();
			break;
		}
		return;
	}
});

xcp.designer.ComponentMgr.registerType("dtb_heading",dtb.widgets.designer.Heading);
