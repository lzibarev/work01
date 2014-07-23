
Ext.define('dtb.widgets.Heading',  {
    extend: 'Ext.container.Container',
    requires: ['xcp.util.Utils'],
    alias: 'widget.dtb_heading',
    
    mixins : {
    	field: 'Ext.form.field.Field'
    },
    
    config: {
    	debug: false,
    },

    listeners: {
    	afterrender: function() {
    		this.updateDisplay();
    	}
    },
    
    // This event is how updates are communicated to data services
    xcpeventconfig : [{
        event : 'change',
        data : function(field, newValue, oldValue, options) {
        	this.log('change called: ', arguments);
            return newValue;
        }
    }],

    /**
     * Returns the {@link Ext.form.field.Field#name name} attribute of the field. This is used as the parameter name
     * when including the field value in a {@link Ext.form.Basic#submit form submit()}.
     * @return {String} name The field {@link Ext.form.field.Field#name name}
     */
	getName: function() {
		var name = this.name;
		if (Ext.isEmpty(name)) {
			name = this.id + "-spanEl";
		}
		return name;
	},

/*    
    initComponent : function() {
    
   		var img = this.img;
		
  		if (img) {
  			var test = img.match(/urn:xcpcomm:com.emc.xcp.artifact.resource.image:(.+)/);
  	  		if (test && test.length && test.length > 1) {
// 	  			img = test[1];
  				img = xcp.util.Utils.buildArtifactsUrl(img);
  				this.img = img;

  	  		}
  	  		
  		}

        this.callParent(arguments);
    },
*/    
    tpl: Ext.create('Ext.XTemplate', '<table border="0"><tr><td><img src="{img}"/></td><td style="font-size:20px;font-weight:bold"><span id="{id}" style="margin-left:10px">{text}</span></td></tr></table>'),
   
    getValue: function() {
		this.log("getValue");
		return this.dynamicText;
	},
	
	setValue: function(text) {
		this.log("setValue", arguments);
		this.dynamicText = text;
		
		this.updateDisplay();

	},
	
	updateDisplay: function() {
		this.log('updateDisplay');
		
		if (this.id == null || this.rendered == false)
			return;
		
		var img = this.img;
		
  		if (img) {
// 			var test = img.match(/^urn:xcpcomm:com.emc.xcp.artifact.resource.image:(.+)$/);
//  			var test2 = test = img.match(/^urn:[^:]+:com.emc.xcp.artifact.resource.image:(.+)$/);
  			var test = img.match(/^urn:(.+)$/);
  	  		if (test && test.length && test.length > 1) {
// 	  			img = test[1];
  				img = xcp.util.Utils.buildArtifactsUrl(img);

  	  		}
  			
  		}
  		
  		var text = this.staticText;
  		if (this.dynamicText) {
  			text = this.dynamicText;
  		}

  		this.update({
			"img": img,
			text: text,
			id: this.getName()
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
