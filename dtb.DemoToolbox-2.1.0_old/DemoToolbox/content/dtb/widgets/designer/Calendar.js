/**
 * @class dtb.widgets.designer.Calendar
 * @extends xcp.designer.Component
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Button
 * @param {cmp} runtime component.
 */

Ext.define('dtb.widgets.designer.Calendar', {
	extend: 'xcp.designer.Component',
	constructor: function(cmp){
		this.callParent(arguments);

		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{
								"name" : "basic",
								"properties": [
								               {"name": "modelName","editor":"com.emc.xcp.uitemplate.ui.property.section.special.DataSourceSelector"}, 
								               {"name": "debug"}
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
                                {"name": "disabled", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.BooleanExpressionPropertyEditor"}
                            ]
                        }]
                    }]
		};
	},
});

xcp.designer.ComponentMgr.registerType("dtb_calendar",dtb.widgets.designer.Calendar);
