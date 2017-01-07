sap.ui.jsview("TableSample.Table", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf TableSample.Table
	*/ 
	getControllerName : function() {
		return "TableSample.Table";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf TableSample.Table
	*/ 
	createContent : function(oController) {
     
//    // dynamic json model
//	  var columnData = [{columnName: "firstName"}, {columnName: "lastName"}, {columnName: "department"}];
//	  var rowData = [{firstName:"elan1", lastName: "wang", department: "Beijing1"},
//	                 {firstName:"elan2", lastName: "wang", department: "Beijing2"},
//	                 {firstName:"elan3", lastName: "wang", department: "Beijing3"},
//	                 ];
//
//      oTable = new sap.ui.table.Table("Sample", {
//    	  tableId:  		"tableID",
//    	  visibleRowCount: 	3
//      });
//      oTable.setTitle("Business Partners");
//      
//      var oModel = new sap.ui.model.json.JSONModel() ;
//      oModel.setData({
//    	  rows: rowData,
//    	  columns: columnData
//      });
//
//	      oTable.bindColumns("/columns", function(sId, oContext){
//	     	 var columnName = oContext.getObject().columnName;
//	     	 return new sap.ui.table.Column({
//	     		 lable: new sap.ui.commons.Label({text: "hello"}),
//	     		 template: columnName
//	     	 })
//	       });
//
//	       oTable.bindRows("/rows");
//	       oTable.placeAt("content");
//      
      var oModel= new sap.ui.model.odata.ODataModel("/i321482/odata/businessPartners.xsodata");

	  oTable = new sap.ui.table.Table("Sample", {
		  tableId:  		"tableID",
		  visibleRowCount: 	10
	  });
	  oTable.setTitle("Business Partners");      
      
      oTable.setModel(oModel).bindRows("/BusinessPartner", function(sId, oContext){
	     	 var businessPartners = oContext.getObject().BusinessPartners;
	     	 return new sap.ui.table.Column({
	     		 lable: new sap.ui.commons.Label({text: "hello"}),
	     		 template: businessPartners
	     	 })
	  });
      
      oTable.placeAt("content");
	}

});
