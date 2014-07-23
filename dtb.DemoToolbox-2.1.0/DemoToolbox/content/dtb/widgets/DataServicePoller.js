
Ext.define("dtb.widgets.DataServicePoller",  {
    extend: 'Ext.form.Text',
    alias: 'widget.dtb_data_service_poller',
    
    // (custom)
    config: {
    	debug: false, // set to 'true' when you want debug messages to show up in the JavaScript console
    	interval: 60000, // interval to update the data service
    	intervalId: -1,	// used internally, don't change
    },

    initComponent : function() {
    	this.log('initComponent enter', arguments);
        dtb.widgets.DataServicePoller.superclass.initComponent.call(this);
        this.log('initComponent exit');
    },
    
    xcpeventconfig : [{
        event : "change",
        data : function(field, newValue, oldValue, options) {
            return newValue;
        }
    }],

    constructor: function(config) {
        this.callParent(arguments);
        
        this.log('constructor enter', arguments);

        try {
    		xcp.widget.form.Form.encodeFieldLabel(config); // this fails when running outside xCP
        } catch (err) {
        	this.log("we're not in Kansas anymore");
        }
        
        // nothing else to do here, since setActive will be called automatically
        this._startInterval();
        
        this.log('constructor exit', arguments);
    },
    
    destroy: function() {
    	this.log('destroy enter', arguments);
    	this.callParent(arguments);
    	clearInterval(this.getIntervalId());
    	this.log('destroy exit');
    },
    
    change: function() {
    	this.log('change called');
    	this.setValue(new Date().getTime());
    	
    },
    
    _startInterval: function() {
    	this.log('startInterval called', arguments);
    	if (this.getIntervalId() == -1) {
    		this.log('startInterval', 'starting interval');
    		var intervalId = setInterval(Ext.bind(this.change, this), this.getInterval());
            this.setIntervalId(intervalId);
    		
    	}

    },
    
    _stopInterval: function() {
    	this.log('stopInterval called', arguments);
    	if (this.getIntervalId() != -1) {
    		this.log('stopInterval', 'stopping interval');
    		clearInterval(this.getIntervalId());
    		this.setIntervalId(-1);
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
