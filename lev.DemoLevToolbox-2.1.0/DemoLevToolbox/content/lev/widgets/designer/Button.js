/**
 * @class lev.widgets.designer.Button
 * @extends xcp.designer.Component
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Button
 * @param {cmp} runtime component.
 */
Ext.define('lev.widgets.designer.Button', {
	extend: 'xcp.designer.Component',
	constructor: function(cmp){
		lev.widgets.designer.Button.superclass.constructor.call(this, cmp);

		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{
								"name" : "basic",
								"properties": [{"name": "title"},{"name": "columns"},{"name": "store"}, {"name": "debug"}]
							},
							{
								"name" : "url",
								"label": "URL",
								"properties": [{"name": "externalURL"}]
							}]
					},
                    {
                        "name": xcp.Strings.widget.button.designer.Button.behaviorTabLabel,
                        "sections":[{
                            "name": "behavior",
                            "label": xcp.Strings.widget.button.designer.Button.behaviorSectionLabel,
                            "properties": [
                                {"name": "hidden", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.BooleanExpressionPropertyEditor"},
                                {"name": "disabled", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.BooleanExpressionPropertyEditor"}
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
        if (propertiesJSONObject && propertiesJSONObject.name === 'columns') {
		    this.cmp.updateInputDataColumns(propertiesJSONObject.value);
        }
        if (propertiesJSONObject && propertiesJSONObject.name === 'store') {
		    this.cmp.setInputDataStore(propertiesJSONObject.value);
        }
	}
});

xcp.designer.ComponentMgr.registerType("lev_button",lev.widgets.designer.Button);
