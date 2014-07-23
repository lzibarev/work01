
Ext.define('dtb.widgets.MultiSlider',  {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.dtb_multi_slider',

    mixins : {
    	xcpFixedFieldWidthModelMixin : 'xcp.util.mixin.FixedFieldWidthModelMixin',
    	field: 'Ext.form.field.Field'
    },
    
    config: {
    	debug: false,
    	sliderComp: null,
    	valueLabelComp: null,
    },
    

    listeners: {
        resize: function() {
        	this.resizeChildren(arguments);
        }
    	
    },
    
    resizeChildren: function() {
    	this.log('resizeChildren', arguments);

    	// Don't do this if the widget hasn't been rendered yet
    	if (!this.rendered)
    		return;
    	
    	var totalWidth = this.getWidth();
    	var labelWidth = Ext.get(this.id + '-labelCell').getWidth();
    	var valueLabelWidth = this.getValueLabelComp().getWidth() + 10; // 10 accounts for margin
    	var sliderWidthCalc = totalWidth - labelWidth - valueLabelWidth;

    	this.log('labelWidth', labelWidth, 'valueLabelWidth', valueLabelWidth, 'calcWidth', sliderWidthCalc);
    	
    	// Change the slider's width to match the empty space
    	this.getSliderComp().setWidth(sliderWidthCalc);
    	
    },
    
    layout: {type: 'hbox'},
    
    /**
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
    
    getValue: function() {
    	this.log('getValue', arguments);
    	return this.value;
    },
/*   
    getValueFromWidget: function(evalContext, widgetId, propertyId) {
    	this.log('getValueFromWidget', arguments);
    	return this.getValue();
    },
*/    
    /**
     * Sets the read-only state of this field. 
     * @param {Boolean} readOnly True to prevent the user changing the field and click the trigger.
     */
    setReadOnly: function(readOnly) {
    	this.log('setReadOnly', arguments);
    	
    	if (readOnly == true)
    		this.setDisabled(true);
    	else
    		this.setDisabled(false);
    },

    setValue: function(val, dontUpdateSlider) {
    	this.log('setValue', arguments);
    	
    	this.value = val;
    	
    	if (dontUpdateSlider != true) {
        	if (val.length != this.getSliderComp().thumbs.length) {
        		var newThumbCount = val.length;
        		var oldThumbCount = this.getSliderComp().thumbs.length;
        		
        		if (newThumbCount > oldThumbCount) {
        			
        			for (var i = oldThumbCount; i < newThumbCount; i++) {
        				this.getSliderComp().addThumb(this.getSliderComp().maxValue);
        			}
        			
        			// this resolves a bug where thumbs added after a slider has been disabled
        			// aren't actually disabled themselves
        			if (this.isDisabled() == true) {
        				this.setDisabled(false);
        				this.setDisabled(true);
        			}
        			
        		} else {
        			this.log('setValue', 'reducing thumb count not supported');
        		}

        	}
        	
            for (var i = 0; i < val.length; i++)
            	this.getSliderComp().setValue(i, val[i]);
            	
            this.getSliderComp().syncThumbs();
    		
    	}
    	
    	this.syncLabelValue();
    	this.fireEvent('change', this, this.value);

    },
    
    syncLabelValue: function() {
    	this.log('syncLabelValue', arguments);

    	// Update label
    	this.getValueLabelComp().setText(this.getSliderComp().getValues().join(','));

    	// Resize everything based on new label value (width may be different)
    	this.resizeChildren();
    },

    // This event is how updates are communicated to data services
    xcpeventconfig : [{
        event : 'change',
        data : function(field, newValue, oldValue, options) {
        	this.log('change called: ', arguments);
            return newValue;
        }
    }],

    constructor: function(config) {
    	this.log('constructor enter');

        this.callParent(arguments);
        
        try {
    		xcp.widget.form.Form.encodeFieldLabel(config); // this fails when running outside xCP
        } catch (err) {
        	this.log("we're not in Kansas anymore");
        }
        
        // This lets xCP take care of our width
        this.mixins.xcpFixedFieldWidthModelMixin.constructor.call(this, 'size');  // $NON-NLS-1$
        
    	var slider = Ext.create('Ext.slider.Multi', {
        	minValue: config.minValue, 
        	maxValue: config.maxValue 

        });
    	
        var valueLabel = Ext.create('Ext.form.Label', {
        	text: config.minValue? config.minValue: '0',
        	margin: '0 0 0 10'
        });

        this.add(slider);
        this.add(valueLabel);
        
        this.setSliderComp(slider);
        this.setValueLabelComp(valueLabel);

        this.log('constructor exit');
    },
    
    
    initComponent : function() {
    	this.log('initComponent enter');
        dtb.widgets.MultiSlider.superclass.initComponent.call(this);
        this.log('initComponent exit');
    },
   
    
    onRender: function() {
        this.log('onRender enter');
        this.callParent(arguments);
        
        var sliderComp = this.getSliderComp();
        
        // Any time the slider's value is changed
        sliderComp.on('change', function(obj, newVal, thumb, eOpts) {
        	
        	console.log('sliderComp change', arguments);

        	// Update top-level value
        	var dtbMultiSlider = obj.findParentByType('dtb_multi_slider');
        	dtbMultiSlider.setValue(obj.getValues(), true); // true = dontUpdateSlider 
        													// (since it fired the event in the first place)

        });

        this.log('onRender exit');
    },
    
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
