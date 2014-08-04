Ext.define('lev.widgets.designer.WfGrid', {
	extend: 'xcp.designer.Component',
	constructor: function(cmp){
		lev.widgets.designer.WfGrid.superclass.constructor.call(this, cmp);

		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{
								"name" : "basic",
								"properties": [{"name": "title"},{"name": "columns"},{"name": "storeTest"}, {"name": "debug"}]
							},
							{
								"name" : "store",
								"label": "STORE",
								"properties": [{"name": "store"}]
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
        if (propertiesJSONObject && propertiesJSONObject.name === 'storeTest') {
		    this.cmp.setInputDataStore(propertiesJSONObject.value);
        }
	}
});

xcp.designer.ComponentMgr.registerType("lev_wf_grid",lev.widgets.designer.WfGrid);
