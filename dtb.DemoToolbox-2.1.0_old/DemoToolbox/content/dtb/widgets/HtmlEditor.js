//HtmlEditor.js

/**
 * @class dtb.widgets.HtmlEditor
 * @extends Ext.form.HtmlEditor
 * Inline HTML editor
 * @xtype dtb_html_editor
 */
Ext.define("dtb.widgets.HtmlEditor", {
    extend: 'Ext.form.HtmlEditor',
    alias: 'widget.dtb_html_editor',
    mixins : {
        xcpFixedFieldWidthModelMixin : 'xcp.util.mixin.FixedFieldWidthModelMixin'
    },

    config: {
    	debug: false,
    },

    initComponent : function() {
    	this.log('initComponent called', arguments);
        dtb.widgets.HtmlEditor.superclass.initComponent.call(this);
    },

    xcpeventconfig : [{
        event : "change",
        data : function(field, newValue, oldValue, options) {
            return newValue;
        }}
    ],
    
    constructor: function(config) {
        this.callParent(arguments);
        this.log('constructor called', arguments);
        
        try {
    		xcp.widget.form.Form.encodeFieldLabel(config); // this fails when running outside xCP
        } catch (err) {
        	this.log("we're not in Kansas anymore");
        }

        this.mixins.xcpFixedFieldWidthModelMixin.constructor.call(this, "size");  // $NON-NLS-1$ 
    },

    onRender: function() {
    	this.callParent(arguments);
    	this.log('onRender called', arguments);
    	
    },
    
    /** (required)
     * Returns the {@link Ext.form.field.Field#name name} attribute of the field. This is used as the parameter name
     * when including the field value in a {@link Ext.form.Basic#submit form submit()}.
     * @return {String} name The field {@link Ext.form.field.Field#name name}
     */
	getName: function() {
		var name = this.name;
		if (Ext.isEmpty(name)) {
			name = this.getInputId();
			if (Ext.isEmpty(name)) {
				name = this.id + "-inputEl";
			}
		}
		return name;
	},

    
    /** (custom)
     * log messages to JavaScript console if debug==true
     */
    log: function() {
    	if (this.getDebug() == true) {
    		var id;
    		
    		if (this.id)
    			id = this.id;
    		else
    			id = this.alias[0];
    		
    		console.log(id + ':', arguments);
    	}
    },

});
