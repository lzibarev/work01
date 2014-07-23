
Ext.define("dtb.widgets.GeoLocation",  {
    extend: 'Ext.form.Text',
    alias: 'widget.dtb_geo_location',

    // (custom)
    config: {
    	debug: false, // set to 'true' when you want debug messages to show up in the JavaScript console
    	latitude: null,
    	longitude: null,
    },

    initComponent : function() {
    	this.log('initComponent called', arguments);
        dtb.widgets.GeoLocation.superclass.initComponent.call(this);
    },
    
    xcpeventconfig : [{
        event : "change",
        data : function(field, newValue, oldValue, options) {
            return newValue;
        }
    }],

    constructor: function(config) {
        this.callParent(arguments);
        
        this.log('constructor called', arguments);

        try {
    		xcp.widget.form.Form.encodeFieldLabel(config); // this fails when running outside xCP
        } catch (err) {
        	this.log("we're not in Kansas anymore");
        }
        
        try {
    		if (geo_position_js.init()) {
    			
    			this.log("location services apparently enabled in the browser");

    			geo_position_js.getCurrentPosition(
    					Ext.bind(this._success_callback, this),
    					Ext.bind(this._error_callback, this),
    					{enableHighAccuracy:true}
    			);
    			
    		} else {
    			this.log("geolocation not available or enabled in browser: " + navigator.userAgent);
    			
    		}
        } catch (err) {
        	this.log("geolocation not available or enabled in browser: " + navigator.userAgent);
        	
        }

        //        if (navigator.userAgent != 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.16) Gecko' &&
       
    },
    
    _success_callback: function(p) {
    	this.log('success_callback called', arguments);

    	var lat = p.coords.latitude.toFixed(2);
    	var lon = p.coords.longitude.toFixed(2);
		
    	this.log('latitude: ' + lat + ', longitude: ' + lon);
		this.setValue(lat + ',' + lon);
		
		this.setLatitude(lat);
		this.setLongitude(lon);

    },
    
    _error_callback: function(p) {
    	this.log('error_callback called', arguments);
		this.log('error: ' + p.message);
   	
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
