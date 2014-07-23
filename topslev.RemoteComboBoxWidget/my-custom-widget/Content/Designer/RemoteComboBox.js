/**
 * @class designer.RemoteComboBox
 * @extends xcp.designer.Component
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time RemoteComboBox
 * @param {cmp} runtime component.
 */
Ext.define('designer.RemoteComboBox', {
	extend: 'xcp.designer.Component',
	constructor: function(cmp){
		designer.RemoteComboBox.superclass.constructor.call(this, cmp);

		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{ 
								"name" : "basic",
								"label": "Basics",
								"properties": [{"name": "fieldLabel"}]
							}, {
								"name" : "value",
								"label": "Value",
								"properties": [{"name": "value"}]
							}]
					  }]
		};
		//this.cmp.setValue(this.addCanvasDisplayText(this.cmp.getValue()));
		
	},
	addCanvasDisplayText : function (value){
		if ((value == null) || (value =="")){
			return "";
		}
		return "<".concat(value,">");
	},
	updateComponent: function(propertiesJSONObject) {
		if(propertiesJSONObject.name === 'fieldLabel') {
            this.cmp.setFieldLabel(Ext.htmlEncode(propertiesJSONObject.value));
		} else if(propertiesJSONObject.name === 'value') {
			//this.cmp.setValue(this.addCanvasDisplayText(propertiesJSONObject.value));
			fireJavaEvent(CONSTANTS.WIDGET_UPDATED, this.cmp.getId(), '{"states" : [{"name": "fieldLabel"}]}');
		}
	},
    getEventPublishingData: function() {
        return [{
            event: "valuechanged",
            eventLabel: xcp.Strings.widget.form.designer.NumberField.valueChangeEventLabel,
            data: [
                {
                    name: "value",
                    type: "INTEGER"
                }
            ]
        }];
    }
});

xcp.designer.ComponentMgr.registerType("cburnett_remotecombobox",designer.RemoteComboBox);

