// Button.js

/**
 * @class dtb.widgets.Button
 * @extends Ext.button.Button
 * 
 * @xtype dtb_button_url
 */
Ext.define("dtb.widgets.Button", {
    extend: "Ext.button.Button",
    alias: "widget.dtb_button",
    
    config: {
    	debug: false,
    },

    constructor: function(config) {
        dtb.widgets.Button.superclass.constructor.apply(this, [config]);
    },

	handler: function() {
		this.log("clicked", arguments);
		
		if (this.runningInDesigner() == true) // don't perform button action if we're inside Designer
			return;
		
		switch (this.externalURL.toLowerCase()) {
		case 'back':
			this.goBack();
			break;
			
		case 'forward':
			this.goForward();
			break;
			
		case 'close':
			this.goClose();
			break;
			
		case 'reload':
			this.goReload();
			break;
			
		default:
			this.openURL();
		}
		
	},
	
	goBack: function() {
		var iframe = this.iframe;
		
		if (iframe == null || iframe == undefined || iframe == "")
			history.back();
		else
			window.frames[iframe].history.back();
	},
	
	goForward: function() {
		var iframe = this.iframe;
		
		if (iframe == null || iframe == undefined || iframe == "")
			history.forward();
		else
			window.frames[iframe].history.forward();
	},
	
	goClose: function() {
		self.open('', '_self', '');
		self.close();
	},
	
	goReload: function() {
		var iframe = this.iframe;
		
		if (iframe == null || iframe == undefined || iframe == "")
			location.reload(true);
		else
			window.frames[iframe].location.reload(true);
	},
	
	openURL: function() {
		
		var url = this.externalURL;
		var iframe = this.iframe;
		
		if (iframe == null || iframe == undefined || iframe == "") {
			
			if (this.behavior == false)
				location.href = url;
			else
				window.open(this.externalURL);
			
		} else {
			
			window.frames[iframe].location.href = url;
			
		}

	},
	
	getValue: function() {
		this.log("getValue");
		return this.externalURL;
	},
	
	setValue: function(url) {
		this.log("setValue", arguments);
		this.externalURL = url;
		
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
    
    runningInDesigner: function() {
    	if (location.href.match(/http:\/\/127\.0\.0\.1:\d+\/uicomp/) == null)
    		return false;
    	else
    		return true;

    }
});
