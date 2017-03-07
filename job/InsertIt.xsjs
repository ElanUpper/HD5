function DoIt(inputParm) {

    var i = 0, count;	 
    var conn ;
    var sqlstr ;
    var CurDate = new Date();
    var FormatDate = CurDate; // CurDate.getFullYear() + CurDate.getMonth() + CurDate.getDate();
    var INcount = inputParm.INcount ;
	// get batch size
    // it is not possible to call the $.request and $.response objects as part of an XS job.
    // var INcount = $.request.parameters.get("count");
	if(INcount === 0 || INcount === '' ||  INcount === null ||  INcount === undefined  ){
	  count = 100;
	}  else {
	  count = parseInt(INcount); 
	  // $.trace.alert('the count : '+count);
	}

	try{
	  conn  = $.db.getConnection();
	  var query = 'insert into "User"."i321482.job::Customers" values (?,?,?,?);';
 	  var pInrt = conn.prepareStatement(query);
	  pInrt.setBatchSize(count);
	  for(i=1; i<=count; i++){
	    pInrt.setString(1, "D"+i.toString());
	    pInrt.setString(2, "Elan"+i.toString());
	    pInrt.setString(3, "man");
	    pInrt.setInteger(4, i);
	    pInrt.addBatch();
	  }	 
	  // 暂且注释 如果需要可以释放出
	  conn.prepareStatement("delete from \"User\".\"i321482.job::Customers\"").execute(); 
	  conn.commit();
	  pInrt.executeBatch();
	  pInrt.close();
	  conn.commit();
	}
	catch(e){
	  // e.message
	  sqlstr = 'insert into "User"."i321482.job::ErrorInfos" values (\'' + FormatDate +
			  				'\', \'Error01\', \''+ inputParm.INcount + '\')';
	  conn.prepareStatement(sqlstr).execute();
	  conn.commit();
      //$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
      //$.response.setBody(e.message);
	}
	conn.close();	
}

//DoIt();
// http://10.131.118.82:8005/i321482/job/InsertIt.xsjs?&count=20

