var trs = 10 ;
var dt  = new Date();
var local  = dt.getTime(); 
var offset = dt.getTimezoneOffset() * 60000;
var utc    = local + offset; 
var china  = utc + (3600000*trs); 
var ndt    = new Date(china); 
$.response.setBody(dt.toLocaleString() + '<br>' + ndt.toLocaleString() + '<br>' );