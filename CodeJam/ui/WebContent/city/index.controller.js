sap.ui.controller("city.index", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf city.index
*/
	onInit: function() {

      //Create a model and bind the table rows to this model
      var oModel = new sap.ui.model.json.JSONModel("/i321482/CodeJam/services/city.xsodata/city");
      var oTable = sap.ui.getCore().byId("CityTab") ;
      // sap.ui.getCore().byId("myview").getController().myMethod(); 获取对应的controller
      oTable.setModel(oModel);
      oTable.bindRows("/d/results");      
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf city.index
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf city.index
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf city.index
*/
//	onExit: function() {
//
//	}

});