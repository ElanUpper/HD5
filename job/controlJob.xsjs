
var ChoiceId = $.request.parameters.get("Id");
var myjob = new $.jobs.Job({uri:"ScheduleXSJS.xsjob"});

// 1: add a job
// 2: del all jobs

if(ChoiceId === null || ChoiceId === 1 || ChoiceId === undefined ){
	try{
		myjob.schedules.add({
		  description: "run every 10 seconds",
		  xscron: "* * * * * * */10",
		  parameter: {
			  "INcount": "20"
		}
      });	
	}catch(e){
		$.response.setBody(e.toString());
	}

} else {
	// delete a job schedule
	// myjob.schedules.delete( {id: id } );
	try{
		myjob.schedules.deleteAll();
	} catch(e){
		$.response.setBody(e.toString());
	}
}
