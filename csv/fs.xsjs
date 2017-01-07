//**** Example for basic REQUEST RESPONSE handling
var paramName; var paramValue; var headerName; var headerValue; var contentType;
//Implementation of GET call
function handleGet() {
    var stock = $.request.parameters.get("stock");
    var dest = $.net.http.readDestination("i321482.csv", "yahoo");
    var client = new $.net.http.Client();
    var req = new $.web.WebRequest($.net.http.GET, "&s=" + stock);
    client.request(req, dest);
    var response = client.getResponse();
    $.response.contentType = "application/json";
    $.response.setBody("the price: " + response.body.asString() );
}

// Request process 
function processRequest(){
	try {
	    switch ( $.request.method ) {
	        //Handle your GET calls here
	        case $.net.http.GET:
	            $.response.contentType = "application/json";
	            $.response.setBody(JSON.stringify(handleGet()));
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
