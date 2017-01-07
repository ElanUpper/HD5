var body;
var dest = $.net.http.readDestination("i321482.controller", "start");
var client = new $.net.http.Client();
var req = new $.web.WebRequest($.net.http.GET, "");
client.request(req, dest);
$.response.contentType = "application/json";
$.response.setBody("done");