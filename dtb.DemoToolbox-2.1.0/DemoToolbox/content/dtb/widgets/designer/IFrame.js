/**
 * @class dtb.widgets.designer.IFrame
 * @extends xcp.designer.Component
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time IFrame
 * @param {cmp} runtime component.
 */
Ext.define('dtb.widgets.designer.IFrame', {
	extend: 'xcp.designer.Component',
	constructor: function(cmp){
		dtb.widgets.designer.IFrame.superclass.constructor.call(this, cmp);

		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{
								"name" : "basic",
								"properties": [{"name": "title"}, {"name": "debug"}]
							},
							{
								"name" : "url",
								"label": "URL",
								"properties": [{"name": "url"}]
							}]
					},
					{
						  "name": "style",
						  "sections": [{
								"name" : "layout",
								"label": xcp.Strings.widget.form.designer.TextArea.layoutSectionLabel,
								"properties": [
								        {"name": "size", 
								    	 "label": xcp.Strings.widget.form.designer.TextArea.sizeGroupLabel, 
										 "children": [
										      {"name": "width", "editor": "com.emc.xcp.uitemplate.ui.property.linkpart.GenericWidthPropertyEditor","reCreateCmpOnChange": true},
										      {"name": "height", "editor": "com.emc.xcp.uitemplate.ui.property.linkpart.HeightPropertyEditor","reCreateCmpOnChange": true},
										{"name": "border"}
										]}       
								]
							}]
					},
                    {
                        "name": xcp.Strings.widget.button.designer.Button.behaviorTabLabel,
                        "sections":[{
                            "name": "behavior",
                            "label": xcp.Strings.widget.button.designer.Button.behaviorSectionLabel,
                            "properties": [
                                {"name": "hidden", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.BooleanExpressionPropertyEditor"},
                            ]
                        }]
                    }]
		};
	},
	updateComponent: function(propertiesJSONObject) {
		//javaLog("xcp.widget.designer.Plaintext", "updateComponent", "log");
        if (propertiesJSONObject && propertiesJSONObject.name === 'title') {
		    this.cmp.setTitle(propertiesJSONObject.value);
        }
	}
});

xcp.designer.ComponentMgr.registerType("dtb_iframe",dtb.widgets.designer.IFrame);
