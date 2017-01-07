sap.ui.jsview("helloworld.Index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf helloworld.Index
	*/ 
	getControllerName : function() {
		return "helloworld.Index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf helloworld.Index
	*/ 
	createContent : function(oController) {
      var myButton = new sap.ui.commons.Button("btn");
      // xx/index.html?sap-ui-language=de  tomodify the language
      myButton.setText(oBundle.getText("helloworld"));
      myButton.attachPress(function(){
    	 $("#btn").fadeOut(); 
      });
      return myButton ;
	}

});
