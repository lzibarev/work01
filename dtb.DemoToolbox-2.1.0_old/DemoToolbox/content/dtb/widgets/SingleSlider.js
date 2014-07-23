
/**
 * I marked sections as either (required) or (custom) depending on whether
 * the code is mandatory for operation, or if it's something I added
 */

Ext.define('dtb.widgets.SingleSlider',  {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.dtb_single_slider',

    // (required)
    mixins : {
    	xcpFixedFieldWidthModelMixin : 'xcp.util.mixin.FixedFieldWidthModelMixin',
    	field: 'Ext.form.field.Field'
    },
    
    // (custom)
    config: {
    	debug: false, // set to 'true' when you want debug messages to show up in the JavaScript console
    	sliderComp: null, // reference to internal slider component
    	valueLabelComp: null, // reference to internal value label component
    },
    
    /** (required)
     * One of the three necessary sections of the code which allow the xCP page to know the
     * current value of the slider, so that its correct value will be sent via a button
     * click (such as "Save"). The other mandatory pieces of code are: the "fireEvent" call 
     * in setValue(), and the super.initComponent call in initComponent()
     */
    xcpeventconfig : [{
        event : 'change',
        data : function(field, newValue, oldValue, options) {
        	this.log('change called: ', arguments);
            return newValue;
        }
    }],

    // (required)
    constructor: function(config) {
    	this.log('constructor enter', config);

        this.callParent(arguments);

        try {
    		xcp.widget.form.Form.encodeFieldLabel(config); // this fails when running outside xCP
        } catch (err) {
        	this.log("we're not in Kansas anymore");
        }

        
        // this lets xCP take care of the width of the top-level widget (but not sub components)
        this.mixins.xcpFixedFieldWidthModelMixin.constructor.call(this, 'size');  // $NON-NLS-1$
        
    	// create an ExtJS single slider
        var slider = Ext.create('Ext.slider.Single', {
        	minValue: config.minValue, 
        	maxValue: config.maxValue,

        });
    	
        // create an ExtJS label to show the value of the slider
        var valueLabel = Ext.create('Ext.form.Label', {
        	text: config.minValue? config.minValue: '0',
        	margin: '0 0 0 10',
        });

        this.add(slider);
        this.add(valueLabel);
        
        this.setSliderComp(slider);
        this.setValueLabelComp(valueLabel);

        this.log('constructor exit');
    },
    
    
    /** (required)
     * If the super.initComponent call isn't made, the xCP page won't know to listen for
     * the 'change' event of this widget, and the page will not be aware of value updates
     */
    initComponent : function() {
    	this.log('initComponent enter', arguments);
        dtb.widgets.SingleSlider.superclass.initComponent.call(this);
        this.log('initComponent exit');
    },
   
    
    // (required)
    onRender: function() {
        this.log('onRender enter', arguments);
        
        this.callParent(arguments);
        
        // Add the 'change' handler for the internal slider
        this.getSliderComp().on('change', function(obj, newVal, thumb, eOpts) {

        	// Update top-level value. setValue() fires the change event at the top level also
        	var parent = this.findParentByType('dtb_single_slider');
        	parent.setValue(newVal, true);
        	
        });
        
        // Make sure evereything's sized properly (for now, this'll be called again
        // every time setValue() is called with a new value)
        this.resizeChildren();

        this.log('onRender exit');
    },
    
    /** (required)
     * This method is called one of two ways:
     *   1. Called via xCP, shortly after initialization of the component so that we
     *      may display the correct initial value for the component
     *   2. Called internally by the 'change' handler of the internal slider component,
     *      which executes when the user drags a thumb on the slider to change its value
     *       
     * @param val The new value.
     * @param dontUpdateSlider This is set to true when this method is called from
     *   the 'change' event of the internal slider component. It prevents us from
     *   needing to update the value of the internal slider component, as the internal
     *   slider component already reflects the current value.
     */
    setValue: function(val, dontUpdateSlider) {
    	this.log('setValue', val);
    	
    	// only process the new value if it's different from the old one
    	if (val != this.value) {
        	this.value = val;
        	
        	if (dontUpdateSlider != true) {
        		this.log('setValue', 'calling sliderComp.setValue');
        		this.getSliderComp().setValue(val);
        		
        	}
        	
        	this.getValueLabelComp().setText(val);
   			this.resizeChildren();
        	
        	// this is how the xCP page knows that the value of the widget has been updated.
   			// if this isn't fired, even though the getValue() and getValueFromWidget() methods
   			// will always supply the current value, those methods are NOT called when a "Save"
   			// button is clicked.
   			this.fireEvent('change', this, val);
    		
    	}
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

    // (required)
	getValue: function() {
    	this.log('getValue', arguments);
    	return this.value;
    },
/*    
    // (required)
    getValueFromWidget: function(evalContext, widgetId, propertyId) {
    	this.log('getValueFromWidget', arguments);
    	return this.getValue();
    },
*/    

    /** (custom. you can delete if you don't need "read only when" behavior)
     * @param {Boolean} readOnly True to prevent the user changing the field.
     */
    setReadOnly: function(readOnly) {
    	this.setDisabled(readOnly);
    },

    /******************************************************************************
     * (custom. not needed if you don't need/want to auto-resize)
     * The next three items allow for auto-sizing the top-level component and
     * sub-components when inside or outside a column box
     */
    
    layout: {type: 'hbox'},
    
    listeners: {
        resize: function() {
        	this.resizeChildren(arguments);
        }
    	
    },
    
    resizeChildren: function() {
    	this.log('resizeChildren', arguments);

    	// Don't do this before the components have finished rendering, otherwise you'll get an exception
    	if (this.rendered && this.getValueLabelComp().rendered && this.getSliderComp().rendered) {
        	var totalWidth = this.getWidth();
        	var labelWidth = Ext.get(this.id + '-labelCell').getWidth();
        	var valueLabelWidth = this.getValueLabelComp().getWidth() + 10; // 10 accounts for default margin
        	var sliderWidthCalc = totalWidth - labelWidth - valueLabelWidth;

        	this.log('labelWidth', labelWidth, 'valueLabelWidth', valueLabelWidth, 'calcWidth', sliderWidthCalc);
        	
        	// Change the slider's width to match the empty space
        	this.getSliderComp().setWidth(sliderWidthCalc);
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
