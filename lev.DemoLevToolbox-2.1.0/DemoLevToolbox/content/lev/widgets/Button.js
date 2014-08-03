Ext.define("lev.widgets.Button", {
	extend : "Ext.grid.Panel",
	alias: "widget.lev_button",
	requires : [ 'Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*',
			'Ext.util.*', 'Ext.form.*' ],
			xtype: 'cell-editing',
			title: 'Настройка согласования',
		    frame: true,
		    inputDataColumns: 'ДИТ,ДТЭ,Тех. блок,Эксп. филиал',
		    inputDataStore: "1,ПЗ-Пояснительная записка,true,true,false,true;2,2-ПЗ-Пояснительная записка,false,true,true,true",
		    
		    initComponent: function(){
			    cNames = this.inputDataColumns.split(',');
			    
			    fields = ['number', 'code'];
				modelFields = [
				        {name: 'number',  type: 'string'},
				        {name: 'code', type: 'string'},
				        {name: 'ДИТ', type: 'boolean'},
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
				for(j in rows){
					row = rows[j];
					rowFields = row.split(',');
					console.log(rowFields);
					storeRow = {'number': rowFields[0], 'code': rowFields[1]}
					storeData.push(storeRow);
					for(index = 0; index < cNames.length; index++){
			    		tmpCount++;
				    	cName = cNames[index];
				    	storeRow[cName] = rowFields[2+index];//tmpCount%3===0;
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
