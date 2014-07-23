// IFrame.js

/**
 * @class dtb.widgets.IFrame
 * @extends Ext.ux.IFrame
 * 
 * @xtype dtb_iframe
 */
Ext.define("dtb.widgets.IFrame", {
    extend: "Ext.panel.Panel",
    alias: "widget.dtb_iframe",
    
    config: {
    	debug: false,
    },
    
    listeners: {
    	afterrender: function() {
    		this.updateIFrame();
    	}
    },
    
    tpl: Ext.create('Ext.XTemplate', '<iframe id="{id}-iframeEl" name="{name}" src="{src}" width="100%" height="100%" frameBorder="{border}"/>'),
   
    getValue: function() {
		this.log("getValue");
		return this.url;
	},
	
	setValue: function(url) {
		this.log("setValue", arguments);
		this.url = url;
		
		this.updateIFrame();

	},
	
	updateIFrame: function() {
		this.log('updateIFrame');
		
		var match = this.id.match(/([^-]+)-/);
		
		if (this.rendered == false || match == null)
			return;

		this.update({
			id: this.id,
			name: match[1],
			src: this.url,
			border: this.border
		});
			
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
