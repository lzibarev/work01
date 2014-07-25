Ext.define("lev.widgets.Button", {
	extend : "Ext.grid.Panel",
	alias: "widget.lev_button",
	requires : [ 'Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*',
			'Ext.util.*', 'Ext.form.*' ],
	xtype : 'cell-editing',
	title : 'Edit Plants',
	frame : true,

    store: Ext.create('Ext.data.Store', {
        fields:['name', 'email', 'phone','test'],
        data:{'items':[
            { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224" , "test": true },
            { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234", "test": false },
            { 'name': 'Homer', "email":"homer@simpsons.com",  "phone":"555-222-1244" , "test": true },
            { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254", "test": false  }
        ]},
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        }
    }),
	columns : [ {
		text : 'Name',
		dataIndex : 'name'
	}, {
		text : 'Email',
		dataIndex : 'email',
		flex : 1
	}, {
		text : 'Phone',
		dataIndex : 'phone'
	}, {
		xtype : 'checkcolumn',
		header : 'Indoor?',
		width : 90,
		dataIndex : 'test'
	} ],
	height : 200,
	width : 400,
	cellEditing : new Ext.grid.plugin.CellEditing({
		clicksToEdit : 1
	})
});


/*
 * Ext.define("lev.widgets.Button", { extend: "Ext.button.Button", alias:
 * "widget.lev_button",
 * 
 * config: { debug: false, },
 * 
 * constructor: function(config) {
 * lev.widgets.Button.superclass.constructor.apply(this, [config]); },
 * 
 * handler: function() { this.log("clicked", arguments);
 * 
 * if (this.runningInDesigner() == true) // don't perform button action if we're
 * inside Designer return;
 * 
 * switch (this.externalURL.toLowerCase()) { case 'back': this.goBack(); break;
 * 
 * case 'forward': this.goForward(); break;
 * 
 * case 'close': this.goClose(); break;
 * 
 * case 'reload': this.goReload(); break;
 * 
 * default: this.openURL(); }
 *  },
 * 
 * goBack: function() { var iframe = this.iframe;
 * 
 * if (iframe == null || iframe == undefined || iframe == "") history.back();
 * else window.frames[iframe].history.back(); },
 * 
 * goForward: function() { var iframe = this.iframe;
 * 
 * if (iframe == null || iframe == undefined || iframe == "") history.forward();
 * else window.frames[iframe].history.forward(); },
 * 
 * goClose: function() { self.open('', '_self', ''); self.close(); },
 * 
 * goReload: function() { var iframe = this.iframe;
 * 
 * if (iframe == null || iframe == undefined || iframe == "")
 * location.reload(true); else window.frames[iframe].location.reload(true); },
 * 
 * openURL: function() {
 * 
 * var url = this.externalURL; var iframe = this.iframe;
 * 
 * if (iframe == null || iframe == undefined || iframe == "") {
 * 
 * if (this.behavior == false) location.href = url; else
 * window.open(this.externalURL);
 *  } else {
 * 
 * window.frames[iframe].location.href = url;
 *  }
 *  },
 * 
 * getValue: function() { this.log("getValue"); return this.externalURL; },
 * 
 * setValue: function(url) { this.log("setValue", arguments); this.externalURL =
 * url;
 *  },
 * 
 * log: function() { if (this.getDebug() == true) { var id;
 * 
 * if (this.id) id = this.id; else id = this.alias[0];
 * 
 * console.log(id + ':', arguments); } },
 * 
 * runningInDesigner: function() { if
 * (location.href.match(/http:\/\/127\.0\.0\.1:\d+\/uicomp/) == null) return
 * false; else return true;
 *  } });
 */