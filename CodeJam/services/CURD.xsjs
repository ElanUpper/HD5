//**** Example for basic REQUEST RESPONSE handling
var paramName; var paramValue; var headerName; var headerValue; var contentType;

function isEmpty(str) {
    return (!str || 0 === str.length);
}

//Implementation of GET call
function handleGet() {
	// Retrieve data here and return results in JSON/other format 
	$.response.status = $.net.http.OK;
	 return {"myResult":" GET success"};
}

//Implementation of POST call
function handlePost() {
	var bodyStr = $.request.body ? $.request.body.asString() : undefined;
	if ( bodyStr === undefined ){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 return {"myResult":"Missing BODY"};
	}
	// Extract body insert data to DB and return results in JSON/other format
	$.response.status = $.net.http.CREATED;
    return {"myResult":"POST success"};
}

function handlePUT() {
    var body = '';
    var GEONAME_ID = $.request.parameters.get('gid');
    var CITY_NAME = $.request.parameters.get('cname');
    var ASCII_NAME = $.request.parameters.get('aname');
    var LAT = $.request.parameters.get('lat');
    var LON = $.request.parameters.get('lon');
    var FEATURE_CODE = $.request.parameters.get('fcode');
    var COUNTRY_CODE = $.request.parameters.get('ccode');
    var POPULATION = $.request.parameters.get('pop');
    var TIMEZONE = $.request.parameters.get('tz');

    if ( isEmpty(GEONAME_ID) === true ){
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody('Geo Name ID cannot be empty');
        return;
    }
    
    if ( isEmpty(CITY_NAME) === true ){
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody('City name cannot be empty');
        return;
    }

    if ( isEmpty(LAT) === true ){
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody('Latitude cannot be empty');
        return;
    }
    
    if ( isEmpty(LON) === true ){
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody('Longitude cannot be empty');
        return;
    }

    if ( isEmpty(COUNTRY_CODE) === true ){
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody('Country Code cannot be empty');
        return;
    }

    if ( isEmpty(POPULATION) === true ){
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody('Population cannot be empty');
        return;
    }
    
    var conn = $.hdb.getConnection();
    var query;

    try {
        // Insert new record
        query = "UPSERT INTO \"city\".\"i321482.CodeJam.data::city.city\"  values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        conn.executeUpdate(query, GEONAME_ID, CITY_NAME, ASCII_NAME, LAT, LON, FEATURE_CODE, COUNTRY_CODE, POPULATION, TIMEZONE);
        conn.commit();
        conn.close();
        
    } catch (error) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(error.message);
        return;
    }

    body = 'Submission Successful'; // Success
    $.trace.debug(body);
    $.response.setBody(body);
    $.response.headers.set('access-control-allow-origin', '*');
    $.response.status = $.net.http.OK;
}

function handleDELETE() {
    var body = '';
    var GEONAME_ID = $.request.parameters.get('gid');

    if ( isEmpty(GEONAME_ID) === true ){
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody('Geo Name ID cannot be empty');
        return;
    }
    
    var conn = $.hdb.getConnection();
    var query;

    try {
        // Insert new record
        query = "delete from \"city\".\"i321482.CodeJam.data::city.city\" where GEONAME_ID = ?";
        conn.executeUpdate(query, GEONAME_ID);
        conn.commit();
        conn.close();
        
    } catch (error) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(error.message);
        return;
    }

    body = 'Submission Successful'; // Success
    $.trace.debug(body);
    $.response.setBody(body);
    $.response.headers.set('access-control-allow-origin', '*');
    $.response.status = $.net.http.OK;
}

function fillSessionInfo(){
    var body = '';
    body = JSON.stringify({
        "session" : [{"UserName": $.session.getUsername(), "Language": $.session.language}]
    });
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;
}

// Check Content type headers and parameters
function validateInput() {
	var i; var j;
	// Check content-type is application/json
	contentType = $.request.contentType;
	if ( contentType === null || contentType.startsWith("application/json") === false){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 $.response.setBody("Wrong content type request use application/json");
		return false;
	}
	// Extract parameters and process them 
	for (i = 0; i < $.request.parameters.length; ++i) {
	    paramName = $.request.parameters[i].name;
	    paramValue = $.request.parameters[i].value;
//      Add logic	    
	}
	// Extract headers and process them 
	for (j = 0; j < $.request.headers.length; ++j) {
	    headerName = $.request.headers[j].name;
	    headerValue = $.request.headers[j].value;
//      Add logic	    
	 }
	return true;
}
// Request process 
function processRequest(){
	if (validateInput()){
		try {
		    switch ( $.request.method ) {
		        //Handle your GET calls here
		        case $.net.http.GET:
		            $.response.setBody(handleGet());
		            break;
		            //Handle your POST calls here
		        case $.net.http.POST:
		            $.response.setBody(handlePost());
		            break; 
		        case $.net.http.PUT:
		            $.response.setBody(handlePUT());
		            break; 
		        case $.net.http.DELETE:
		            $.response.setBody(handleDELETE());
		            break; 
		        default:
		        	fillSessionInfo();		        
		            break;
		    }
		    $.response.contentType = "application/json";	    
		} catch (e) {
		    $.response.setBody("Failed to execute action: " + e.toString());
		}
	}
}
// Call request processing  
processRequest();
