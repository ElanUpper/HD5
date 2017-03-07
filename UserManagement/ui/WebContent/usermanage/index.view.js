sap.ui.jsview("usermanage.index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf usermanage.index
	*/ 
	getControllerName : function() {
		return "usermanage.index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf usermanage.index
	*/ 
	createContent : function(oController) {
		
		var oLayout = new sap.ui.commons.layout.MatrixLayout(); 

		// 初始化下层部件
		oTable = new sap.ui.table.Table("userTbl",{tableId: "tableID", visibleRowCount: 10,
										cellClick: function(oEvent) {
											oController.GetClickCell(oEvent) 
										 }} ); 
		// 设置Table标题名
		oTable.setTitle("Users"); 
		oTable.setEditable(true);
		// 动态创建table列
		this.oModel = new sap.ui.model.odata.ODataModel("/i321482/UserManagement/xsodata/userxslib.xsodata", true, 'I32482', 'Abcd1234');
		var oMeta = this.oModel.getServiceMetadata(); 
		var oControl; 
		for ( var i = 0; i < oMeta.dataServices.schema[0].entityType[0].property.length; i++) { 
			var property = oMeta.dataServices.schema[0].entityType[0].property[i]; 
			// 给每一个格子添加change事件(UpdateUser)
			oControl = new sap.ui.commons.TextField({change: oController.UpdateUser } ).bindProperty("value",property.name); 
			// 如果列(技术名称)是PERS_NO 就不能编辑
			if(property.name == 'PERS_NO') { 
				oControl.setEditable(false); 
			} 
			// 修改列名
			var ColumnName ;
			switch(property.name) {
  			  case 'PERS_NO':   ColumnName = 'PersonNumber'; break;
	   		  case 'FIRSTNAME': ColumnName = 'FirstName'; break;
			  case 'LASTNAME':  ColumnName = 'LastName'; break;
			  case 'E_MAIL':    ColumnName = 'EMail'; break;
			}
			oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: ColumnName}), 
					template: 		oControl, 
					sortProperty: 	property.name, 
					filterProperty: property.name, 
					filterOperator: sap.ui.model.FilterOperator.EQ, flexible: true, width: "125px" })); 
		} 
		// 绑定数据
		oTable.setModel(this.oModel); 
		oTable.bindRows("/Users"); 

		// 初始化上层部件
		var updatePanel = new sap.ui.commons.Panel("updPanel").setText('New User Record Details'); 
		var layoutNew = new sap.ui.commons.layout.MatrixLayout({width:"auto"}); 
		var oVal1 = new sap.ui.commons.TextField("fName",{tooltip: "First Name", width: "200px", editable:true}); 
		var oVal2 = new sap.ui.commons.TextField("lName",{tooltip: "Last Name",  width: "200px", editable:true}); 
		var oVal3 = new sap.ui.commons.TextField("email",{tooltip: "Email",  	 width: "200px", editable:true});  
		var oExcButton = new sap.ui.commons.Button({ text : "Create Record", press : oController.CreateUser }); 
		var oDelButton = new sap.ui.commons.Button({ text : "Delete Record", press : [oController.DeleteUser, oController] }); 
		var oRefButton = new sap.ui.commons.Button({ text : "Refresh", press : oController.Refresh }); 
		
		// 拼接上层部件
		layoutNew.createRow(new sap.ui.commons.Label({text: "First Name: "}), oVal1 ); 
		layoutNew.createRow(new sap.ui.commons.Label({text: "Last Name: "}), oVal2 ); 
		layoutNew.createRow(new sap.ui.commons.Label({text: "Email: "}), oVal3, oExcButton, oDelButton, oRefButton);		
		updatePanel.addContent(layoutNew); 
		oLayout.createRow(updatePanel); 
		
		// 拼接下层部件
		oLayout.createRow(oTable); 
		return oLayout;

	}

});
