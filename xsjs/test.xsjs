
//Implementation of GET call
function handleGet() {
    var stock = "SAP.DE"; //$.request.parameters.get("stock");
    var dest = $.net.http.readDestination("i321482.xsjs", "yahoo");
    var client = new $.net.http.Client();
    var req = new $.web.WebRequest($.net.http.GET, "&s=" + stock);
    client.request(req, dest);
    var response = client.getResponse();
    return "the price: "  + response.body.asString();
}

// Request process 
function processRequest(){
	try {
	    switch ( $.request.method ) {
	        //Handle your GET calls here
	        case $.net.http.GET:
	            $.response.contentType = "application/json";
	            $.response.setBody(handleGet());
	            break;
	            //Handle your POST calls here
	        case $.net.http.POST:
	            $.response.contentType = "application/json";
	            $.response.setBody("Post method");
	            break; 
	        //Handle your other methods: PUT, DELETE
	        default:
	            $.response.status = $.net.http.METHOD_NOT_ALLOWED;
	            $.response.setBody("Wrong request method, use:", $.request.method + ";");		        
	            break;
	    }
	} catch (e) {
	    $.response.setBody("Failed to execute action: " + e.toString());
	}
}
// Call request processing  
processRequest();
