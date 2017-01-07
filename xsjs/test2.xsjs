var stock = $.request.parameters.get("stock");
var dest = $.net.http.readDestination("i321482.xsjs", "yahoo");
var client = new $.net.http.Client();
var req = new $.web.WebRequest($.net.http.GET, "&s=" + stock);
client.request(req, dest);
var response = client.getResponse();
$.response.contentType = "text/plain";
$.response.setBody("the price: "  + response.body.asString() );

