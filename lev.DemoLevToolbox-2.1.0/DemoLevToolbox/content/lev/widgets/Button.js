Ext.define("lev.widgets.Button", {
	extend : "Ext.grid.Panel",
	alias: "widget.lev_button",
	requires : [ 'Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*',
			'Ext.util.*', 'Ext.form.*' ],
			xtype: 'cell-editing',
			title: 'Настройка согласования',
		    frame: true,
		    inputDataColumns: 'ДИТ,ДТЭ,ТехБлок,ЭкспФилиал',
		    inputDataStore: "ПЗ-Пояснительная записка,true,true,false,true;2-ПЗ-Пояснительная записка,false,true,true,true;3-ПЗ-Пояснительная записка,true,false,true,false",
		    
		    initComponent: function(){
			    cNames = this.inputDataColumns.split(',');
			    
			    fields = ['number', 'code'];
				modelFields = [
				        {name: 'number',  type: 'string'},
				        {name: 'code', type: 'string'}
				    ];
				storeData = [];
				
				rows = this.inputDataStore.split(';');
				tmpCount=0;
				for(index = 0; index < cNames.length; index++){
			    	this.width += 100;
			    	cName = cNames[index];
			    	this.columns.push({
						xtype : 'checkcolumn',
		    			header : cName,
						width : 100,
						dataIndex : cName});
					fields.push(cName);
					modelFields.push({name: cName, type: 'boolean'});
			    }
				for(j = 0; j < rows.length; j++){
					row = rows[j];
					rowFields = row.split(',');
					console.log(rowFields);
					storeRow = {'number': j+1, 'code': rowFields[0]}
					storeData.push(storeRow);
					for(index = 0; index < cNames.length; index++){
			    		tmpCount++;
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
		        
			columns : [ {
				header : 'Номер',
				width : 50,
				dataIndex : 'number'
			}, {
				header : 'Шифр',
				dataIndex : 'code',
				width : 200,
				flex : 1
			}],    
			height: 250,
		    width: 300,

	cellEditing : new Ext.grid.plugin.CellEditing({
		clicksToEdit : 1
	})
});
