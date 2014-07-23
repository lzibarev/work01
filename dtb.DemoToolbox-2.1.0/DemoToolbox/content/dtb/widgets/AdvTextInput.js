//AdvTextField.js

/**
 * @class dtb.widgets.AdvTextField
 * @extends Ext.form.Text
 * Text field widget capable of allowing user input
 * @xtype dtb_adv_text_input
 */
Ext.define("dtb.widgets.AdvTextInput", {
    extend: 'Ext.form.Text',
    alias: 'widget.dtb_adv_text_input',
    mixins : {
        xcpFixedFieldWidthModelMixin : 'xcp.util.mixin.FixedFieldWidthModelMixin'
    },

    config: {
    	caseSensitive: false,
    	debug: false,
    	matchAll: true,
    	modifiers: '',
        valid: false,
        regexXcp: null,
    },

    initComponent : function() {
    	this.log('initComponent called', arguments);
        dtb.widgets.AdvTextInput.superclass.initComponent.call(this);
    },

    xcpeventconfig : [{
        event : "change",
        data : function(field, newValue, oldValue, options) {
            return newValue;
        }},
    	{
    	event: 'validate',
    	data: function(field, newValue, oldValue, options) {
    		return newValue;
    	}}],
    
    constructor: function(config) {
        this.callParent(arguments);
        this.log('constructor called', arguments);
        
        try {
    		xcp.widget.form.Form.encodeFieldLabel(config); // this fails when running outside xCP
        } catch (err) {
        	this.log("we're not in Kansas anymore");
        }

        this.mixins.xcpFixedFieldWidthModelMixin.constructor.call(this, "size");  // $NON-NLS-1$ 

        if (this.getCaseSensitive() == false)
        	this.setModifiers('i');
        
        // Setup regex
        this.regex = new RegExp(this.getRegexXcp(), this.getModifiers());
        
    },

    onRender: function() {
    	this.callParent(arguments);
    	this.log('onRender called', arguments);
    	
    	this.on('validitychange', function(textField, e, eOpts) {
    		this.setValid(!this.hasActiveError());
    		this.fireEvent('validate', this, this.getValid());
    	});
   	
    },
    
    //private method
    _resetText: function() {
        var el = this.inputEl.dom;
        var inputVal = el.value;
        el.value = "";
        if(inputVal) {
            setTimeout(function(){el.value = inputVal;},0);
        }
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
