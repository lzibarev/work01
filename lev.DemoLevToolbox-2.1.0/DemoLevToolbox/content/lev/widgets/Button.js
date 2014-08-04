/*
		    inputDataColumns: 'ДИТ,ДТЭ,ТехБлок,ЭкспФилиал',
	    	inputDataStore: "ПЗ-Пояснительная записка,true,true,false,true;2-ПЗ-Пояснительная записка,false,true,true,true;3-ПЗ-Пояснительная записка,true,false,true,false",

 */
Ext.define("lev.widgets.Button", {
	extend : "Ext.grid.Panel",
	alias: "widget.lev_button",
	requires : [ 'Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*',
			'Ext.util.*', 'Ext.form.*' ],
		    xtype: 'cell-editing',
		    inputDataColumns: 'ДИТ,ДТЭ,ТехБлок,ЭкспФилиал',
	    	inputDataStore: "ПЗ-Пояснительная записка,true,true,false,true;2-ПЗ-Пояснительная записка,false,true,true,true;3-ПЗ-Пояснительная записка,true,false,true,false",
		    frame: true,
		    debug: true,
		    initComponent: function(){
		    	this.height = 90;

				this.setInputDataColumns(this.inputDataColumns);

			    this.store = Ext.create('Ext.data.Store', {
					fields : this.modelFields,
					data : []
				});

				this.setInputDataStore(this.inputDataStore);

				this.callParent(arguments);
		    },
		    
		    setInputDataColumns: function(value){
		    	this.log("setInputDataColumns "+value);
			    this.inputDataColumns = value;
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
			    
			    fields = ['number', 'code'];
				this.modelFields = [
				        {name: 'number',  type: 'string'},
				        {name: 'code', type: 'string'}
				    ];
			    cNames = this.inputDataColumns.split(',');
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
					this.modelFields.push({name: cName, type: 'boolean'});
			    }
		    },
		    
		    updateInputDataColumns: function(value){
			    this.log("updateInputDataColumns value="+value);
		    	this.setInputDataColumns(value);
		    	newStore = Ext.create('Ext.data.Store', {
					fields : this.modelFields,
					data : []
				});
		    	this.reconfigure(newStore, this.columns);
		    },
		    
		    setInputDataStore: function(value){
			    this.log("setInputDataStore value="+value);
			    this.inputDataStore = value;
				if (!this.inputDataStore){
					return;
				}	    
			    this.store.removeAll();
				rows = this.inputDataStore.split(';');
				
				for(j = 0; j < rows.length; j++){
					row = rows[j];
			    	if (row.length === 0){
			    		continue;
			    	}
					rowFields = row.split(',');

					storeRow = {'number': j+1}
					
					this.height+=25;
					for(index = 1; index < this.modelFields.length; index++){
				    	cName = this.modelFields[index].name;
				    	storeRow[cName] = rowFields[index-1];
				    	//console.log(cName+" "+(index-1)+" "+rowFields[index-1]);
			    	}
					this.store.add(storeRow);
				}
			    this.setHeight(this.height);
		    },
		    
		    
		    
		    
		    cellEditing: new Ext.grid.plugin.CellEditing({
		            clicksToEdit: 1
		    	}), 
		    
		    log: function(message){
		    	if (this.debug == true) {
		    		var id;
		    		if (this.id)
		    			id = this.id;
		    		else
		    			id = this.alias[0];
		    		console.log(id + ':', arguments);
		    	}
		    }
});
