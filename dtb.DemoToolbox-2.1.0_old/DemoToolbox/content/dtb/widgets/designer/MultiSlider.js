/**
 * @class dtb.widgets.designer.MultiSlider
 * @extends xcp.designer.Component
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Slider
 * @param {cmp} runtime component.
 */
Ext.define('dtb.widgets.designer.MultiSlider', {
	extend: 'xcp.designer.Component',
	constructor: function(cmp){
		dtb.widgets.designer.MultiSlider.superclass.constructor.call(this, cmp);

		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{ 
								"name" : "basic",
								"label": "Basics",
								"properties": [{"name": "fieldLabel"},{"name": "minValue"},{"name": "maxValue"},{"name": "debug"}]
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
                                  {"name": "readOnly", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.BooleanExpressionPropertyEditor"}
                              ]
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

xcp.designer.ComponentMgr.registerType("dtb_multi_slider",dtb.widgets.designer.MultiSlider);

