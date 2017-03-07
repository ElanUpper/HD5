sap.ui.controller("ajax.index", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf ajax.index
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf ajax.index
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf ajax.index
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf ajax.index
*/
//	onExit: function() {
//
//	}

	CreateUser : function() { 	
		// 获取data model；
		var oModel = sap.ui.getCore().byId("userTbl").getModel(); 
		var oEntry = {}; 	
		
		// 获取最新的person number
        $.ajax({
		  type:"GET",
		  url: "/i321482/UserManagement/ui/WebContent/usermanage/GetPersonNum.xsjs",
		  dataType: "json",
		  async: false,
		  xhrFields: {
		    withCredentials: true
		  },
		  beforeSend: function (request) {
		    request.setRequestHeader("Access-Control-Allow-Origin", "*");
		  },
		  success: function(data, status){
			oEntry.PERS_NO = data ;
			// 如果第一次创建那么就是null  比如修改成1
			if (oEntry.PERS_NO == "null") {
				oEntry.PERS_NO = 1 ;
			} ;
		  } ,
		  error : function(data, status) {
			oEntry.PERS_NO = null ;		  
		    alert('failure' + status);
		    return ;
		  }
	    }) ;	
        
		oEntry.FIRSTNAME = sap.ui.getCore().byId("fName").getValue(); 
		oEntry.LASTNAME = sap.ui.getCore().byId("lName").getValue(); 
		oEntry.E_MAIL = sap.ui.getCore().byId("email").getValue(); 

		$.ajax({
			  url: '/i321482/UserManagement/xsodata/userxslib.xsodata/Users',
			  type: 'POST',
			  dataType: "json",
			  async: false,
			  xhrFields: {
			    withCredentials: true
			  },
			  beforeSend: function (request) {
				request.setRequestHeader("content-encoding", "gzip");
			    request.setRequestHeader("Access-Control-Allow-Origin", "*");
			  },
			  data: JSON.stringify(oEntry),
			  contentType: "application/json; charset=utf-8" ,
			  success: function() {
			    alert("ajax: update successful");
			    sap.ui.getCore().byId("userTbl").getModel().refresh(true);
			  },
			  error: function () {
			    alert("ajax: update failed");
			  }
		});
		
		// 创建完成后清空表格
		sap.ui.getCore().byId("fName").setValue(); 
		sap.ui.getCore().byId("lName").setValue(); 
		sap.ui.getCore().byId("email").setValue(); 
	},
	
	UpdateUser: function(Event) { 
		var oModel = sap.ui.getCore().byId("userTbl").getModel(); 
		var index = Event.getSource().oParent.getIndex();
		var oEntry = {}; 
		oEntry.PERS_NO = sap.ui.getCore().byId("__field0-col0-row"+index).getValue(); 
		// 依次获取所有的更细数据
		switch (Event.mParameters.id){ 
			case "__field1-col1-row"+index: oEntry.FIRSTNAME = Event.mParameters.newValue; 
			case "__field2-col2-row"+index: oEntry.LASTNAME  = Event.mParameters.newValue; 
			case "__field3-col3-row"+index: oEntry.E_MAIL 	 = Event.mParameters.newValue;
		} ;
		
		$.ajax({
			  url: '/i321482/UserManagement/xsodata/userxslib.xsodata/Users(' + oEntry.PERS_NO + ')',
			  type: 'PUT',
			  async: false,
			  dataType: "json",
			  contentType: "application/json; charset=utf-8" ,
			  xhrFields: {
			    withCredentials: true
			  },
			  beforeSend: function (request) {
				request.setRequestHeader("content-encoding", "gzip");
			    request.setRequestHeader("Access-Control-Allow-Origin", "*");
			  },	
			  data: JSON.stringify(oEntry),
			  success: function() {
			    alert("update successful");
			    sap.ui.getCore().byId("userTbl").getModel().refresh(true);
			  },
			  error: function () {
			    alert("update failed");
			  }
		});
	},
	
	DeleteUser: function(Event) {
		
        var oTable = sap.ui.getCore().byId("userTbl");
		var oModel = oTable.getModel(); 
		var index = oTable.getSelectedIndex();
        // 如果有选中一行
        if (index != -1) {
    		// PERS_NO 值存放在table中id的规则是 "__field0-col0-row"+ 1..  其他的情况一样
    		var PERS_NO = sap.ui.getCore().byId("__field0-col0-row"+index).getValue(); 
			$.ajax({
			  url: '/i321482/UserManagement/xsodata/userxslib.xsodata/Users(' + PERS_NO + ')',
			  type: 'DELETE',
			  xhrFields: {
			    withCredentials: true
			  },
			  beforeSend: function (request) {
			    request.setRequestHeader("Access-Control-Allow-Origin", "*");
			  },			  
			  success: function() {
			    alert("delete successful");
			    sap.ui.getCore().byId("userTbl").getModel().refresh(true);
			  },
			  error: function () {
			    alert("delete failed");
			  }
			});
        } else {
        	alert('Please select a row');
        } ;			
        
	},
	
	Refresh: function(){

//	   $.ajax({
//		  type: "GET",
//		  url: '/i321482/UserManagement/xsodata/userxslib.xsodata',
//		  dataType: "json",
//		  async: false,
//		  xhrFields: {
//		    withCredentials: true
//		  },
//		  beforeSend: function (request) {
//		    request.setRequestHeader("Access-Control-Allow-Origin", "*");
//		  },
//		  success: function(data, status) {
//
//          },
//		  error: function() {  
//            alert('Refresh failure');
//          }  
//	   });
	   
	   sap.ui.getCore().byId("userTbl").getModel().refresh(true); 
	   
	}
	
});