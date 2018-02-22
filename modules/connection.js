var mysql=require('mysql');
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'meete'
});
connection.connect(function(err){
	if(err){
		var error={
			status: 0,
			message:"Error in Execution"
		}
		//res.send(error);
	
	}else{
	
		console.log("database is Working");
	}
});

module.exports=connection;