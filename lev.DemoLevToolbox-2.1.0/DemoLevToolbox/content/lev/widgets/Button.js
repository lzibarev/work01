Ext.define("lev.widgets.Button", {
	extend : "Ext.grid.Panel",
	alias: "widget.lev_button",
	requires : [ 'Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*',
			'Ext.util.*', 'Ext.form.*' ],
		    xtype: 'cell-editing',
		    frame: true,
		    inputDataColumns: 'ДИТ,ДТЭ,ТехБлок,ЭкспФилиал',
	    	inputDataStore: "ПЗ-Пояснительная записка,true,true,false,true;2-ПЗ-Пояснительная записка,false,true,true,true;3-ПЗ-Пояснительная записка,true,false,true,false",
		    initComponent: function(){
		    	this.height = 90;
		    	this.width = 350;
			    this.columns = [ {
					header : '№',
					width : 50,
					dataIndex : 'number'
				}, {
					header : 'Шифр',
					dataIndex : 'code',
					width : 300,
					flex : 1
				}];
			    cNames = this.inputDataColumns.split(',');
			    
			    fields = ['number', 'code'];
				modelFields = [
				        {name: 'number',  type: 'string'},
				        {name: 'code', type: 'string'}
				    ];
				storeData = [];
				
				rows = this.inputDataStore.split(';');
				for(index = 0; index < cNames.length; index++){
			    	cName = cNames[index];
			    	if (cName.length === 0){
			    		continue;
			    	}
			    	this.columns.push({
						xtype : 'checkcolumn',
		    			header : cName,
						width : 120,
						dataIndex : cName});
			    	this.width += 120;
					fields.push(cName);
					modelFields.push({name: cName, type: 'boolean'});
			    }
				for(j = 0; j < rows.length; j++){
					row = rows[j];
			    	if (row.length === 0){
			    		continue;
			    	}
					rowFields = row.split(',');
					console.log(rowFields);
					storeRow = {'number': j+1, 'code': rowFields[0]}
					storeData.push(storeRow);
					this.height+=25;
					for(index = 0; index < cNames.length; index++){
				    	cName = cNames[index];
				    	storeRow[cName] = rowFields[1+index];
			    	}
			    	console.log(storeRow);
				}
				    
			    this.store = Ext.create('Ext.data.Store', {
					fields : modelFields,
					data : storeData
				});
				this.callParent(arguments);
		    },
		    
		    cellEditing: new Ext.grid.plugin.CellEditing({
		            clicksToEdit: 1
		        })
});
