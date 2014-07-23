
Ext.define("dtb.widgets.ProgressBar",  {
    extend: 'Ext.ProgressBar',
    alias: 'widget.dtb_progress_bar',

    mixins : {
        xcpFixedFieldWidthModelMixin : 'xcp.util.mixin.FixedFieldWidthModelMixin'
    },

    config: {
    	debug: false, // set to 'true' when you want debug messages to show up in the JavaScript console
    	appendText: '',
    },

    initComponent : function() {
        dtb.widgets.ProgressBar.superclass.initComponent.call(this);
    },
    
    xcpeventconfig : [{
        event : "change",
        data : function(field, newValue, oldValue, options) {
            return newValue;
        }
    }],

    constructor: function(config) {
        this.callParent(arguments);

        try {
    		xcp.widget.form.Form.encodeFieldLabel(config); // this fails when running outside xCP
        } catch (err) {
        	this.log("we're not in Kansas anymore");
        }

        this.mixins.xcpFixedFieldWidthModelMixin.constructor.call(this, "size");  // $NON-NLS-1$ 
    },
    
    /******************************************************************************
     * (custom. not needed if you don't need/want to auto-resize)
     * The next three items allow for auto-sizing the top-level component and
     * sub-components when inside or outside a column box
     */
    
    layout: {type: 'hbox'},

    setValue: function(val) {
    	this.log('setValue', val);
    	
    	// only process the new value if it's different from the old one
    	if (val != this.valueXcp) {
        	this.valueXcp = val;
        	
        	this.updateDisplay();
        	
        	// this is how the xCP page knows that the value of the widget has been updated.
   			// if this isn't fired, even though the getValue() and getValueFromWidget() methods
   			// will always supply the current value, those methods are NOT called when a "Save"
   			// button is clicked.
   			this.fireEvent('change', this, val);
    		
    	}
    },
    
    getValue: function() {
    	this.log('getValue');
    	return this.valueXcp;
    },
    
    updateDisplay: function() {
    	this.log('updateDisplay');
    	var val = this.valueXcp;
    	var newFrac = val[0]/val[1];
    	var newText = val[0] + '/' + val[1] + ' ' + this.getAppendText();
    	
    	this.updateProgress(newFrac, newText, true);
    },
    
    setHidden: function(bool) {
    	if (bool) {
    		this.hide();
    	} else {
    		this.show();
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
    }


});
