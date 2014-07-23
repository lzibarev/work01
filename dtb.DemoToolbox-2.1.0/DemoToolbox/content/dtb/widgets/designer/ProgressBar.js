/**
 * @class dtb.widgets.designer.ProgressBar
 * @extends xcp.designer.Component
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Progress Bar
 * @param {cmp} runtime component.
 */
Ext.define('dtb.widgets.designer.ProgressBar', {
	extend: 'xcp.designer.Component',
	constructor: function(cmp){
		dtb.widgets.designer.ProgressBar.superclass.constructor.call(this, cmp);

		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{ 
								"name" : "basic",
								"label": "Basics",
								"properties": [{"name": "appendText"},{"name": "debug"}]
							}, {
								"name" : "value",
								"label": "Value",
								"properties": [{"name": "value"}]
							}]
					  },
  					  {
						  "name": "style",
						  "sections": [{
								"name" : "layout",
								"label": "Layout",
								"properties": [{"name": "size", "editor": "genericWidth","reCreateCmpOnChange": true}]
							}]
					  },
					  {
						  "name": "behavior",
						  "label": "Behavior",
                          "sections":[{
                              "name": "behavior",
                              "properties": [
                                  {"name": "hidden", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.BooleanExpressionPropertyEditor"},
                              ]
                          }]
					  }]
		};
		//this.cmp.setValue(this.addCanvasDisplayText(this.cmp.getValue()));
		this.cmp.setValue([1,4]);
		
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
		} else if(propertiesJSONObject.name === 'appendText') {
			this.cmp.setAppendText(propertiesJSONObject.value);
			this.cmp.updateDisplay();
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

xcp.designer.ComponentMgr.registerType("dtb_progress_bar",dtb.widgets.designer.ProgressBar);

