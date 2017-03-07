sap.ui.jsview("city.index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf city.index
	*/ 
	getControllerName : function() {
		return "city.index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf city.index
	*/ 
	createContent : function(oController) {
				
        //Create an instance of the table control
        var oTable = new sap.ui.table.Table("CityTab", {
            title: "City Information",
            visibleRowCount: 7,
            firstVisibleRow: 3,
            selectionMode: sap.ui.table.SelectionMode.Single
        });
		
        //Define the columns and the control templates to be used
        var oColumn = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Country"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "COUNTRY_CODE"),
            sortProperty: "COUNTRY_CODE",
            filterProperty: "COUNTRY_CODE",
            editable :true,
            width: "100px"
        });
        oTable.addColumn(oColumn);

        //Define the columns and the control templates to be used
        var oColumn = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Name"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "CITY_NAME"),
            sortProperty: "CITY_NAME",
            filterProperty: "CITY_NAME",
            editable :true,            
            width: "100px"
        });
        oTable.addColumn(oColumn);
        
        //Define the columns and the control templates to be used
        var oColumn = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Population"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "POPULATION"),
            sortProperty: "POPULATION",
            filterProperty: "POPULATION",
            editable :true,
            width: "100px"
        });
        oTable.addColumn(oColumn);
		
        //Initially sort the table
        oTable.sort(oTable.getColumns()[2]);
        oTable.setEditable(true); 
        return oTable ;


	}

});