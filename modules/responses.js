exports.sendError=function(res,msg){
	var response={
		status:0,
		message:msg
	}
	res.send(response);
}
exports.success=function(result,res){
	var response={
		status:1,
		message:result[0]
	}
	res.send(response);
}

