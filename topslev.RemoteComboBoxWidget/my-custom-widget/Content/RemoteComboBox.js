
Ext.define("RemoteComboBox",  {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.levtops_remotecombobox',

    initComponent : function() {
    	
        RemoteComboBox.superclass.initComponent.call(this);
    },

    xcpeventconfig : [{
        event : "change",
        data : function(field, newValue, oldValue, options) {
            return newValue;
        }
    }],

    constructor: function(config) {
    	xcp.widget.form.Form.encodeFieldLabel(config); // comment this out when testing outside xCP
		console.log("constructor:");
		config.displayField= 'title';
		config.valueField= 'ISBN';
		config.width= 500;
		config.labelWidth= 130;
		
		config.store= new Ext.data.Store({
										proxy: {
											type: 'jsonp',
											startParam: 'startIndex',
											limitParam: 'maxResults',
											url: 'https://www.googleapis.com/books/v1/volumes',
											reader: {
												type: 'json',
												totalProperty: 'totalItems',
												root: 'items'
											}
										},
										fields: [{
											name: 'title',
											mapping: function(raw) {
												var result = raw.volumeInfo.title;
												if (raw.volumeInfo.subtitle) {
													result = result + ' - ' + raw.volumeInfo.subtitle;
												}
												return result;
											}
										}, {
											name: 'ISBN',
											mapping: function(raw) {
												var ids = raw.volumeInfo.industryIdentifiers;
												return ids ? ids[0].identifier : 'No identifier for this book';
											}
										}]
									});
		config.queryParam= 'q';
		config.queryMode= 'remote';

		config.triggerAction = 'query';

		config.listConfig = {
			getInnerTpl: function() {
				return '{%var value = this.field.getRawValue().replace(/([.?*+^$[\\]\\\\(){}|-])/g, "\\\\$1");%}' + 
					'{[values.title.replace(new RegExp(value, "i"), function(m) {return "<b>" + m + "</b>";})]}';
			}
		};
		
		/*
		config.listeners ={
			select: function() {
				Ext.Msg.alert('Chosen book', 'Buying ISBN: ' + this.getValue());
			}
		};
		*/
		
		config.tpl = Ext.create('Ext.XTemplate',
								'<tpl for=".">',
									'<div class="x-boundlist-item">{title} - {ISBN}</div>',
								'</tpl>'
							);
		
		
        this.callParent(arguments);
    }


});
