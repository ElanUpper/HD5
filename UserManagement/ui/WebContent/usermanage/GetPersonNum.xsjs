var conn = $.db.getConnection();
var statement = 'select max("PERS_NO")+1 as perno from "User"."USERDETAILS"' ;
var query = conn.prepareStatement(statement);
var rs = query.executeQuery() ;
var output = '';

while (rs.next()) {
  output = output + rs.getInteger(1) ;
}

// clean 
rs.close();
query.close();
conn.close();

// output
$.response.contentType = "text/html; charset=utf-8";
$.response.status = $.net.http.OK;
$.response.setBody(JSON.stringify(output));
