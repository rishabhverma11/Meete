exports.sendError=function(res){
	var response={
		status:0,
		message:"Error in excution"
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
exports.invalidCredentials=function(res){
	var response={
		status:0,
		message:"invalidCredentials"
	}
	res.send(response);

}
exports.Alreadyexist=function(msg,res){
	var response={
		status:0,
		message:msg
	}
	res.send(response);
}
exports.NoDataFound=function(msg,res){
	var response={
		status:0,
		message:msg
	}
	res.send(response);
}
exports.resultview=function(result,res){
	var response={
		status:1,
		message:result[0]
	}
	res.send(response);
}
exports.agelimit=function(res){
	var response={
		status:0,
		message:"Only for 18+"
	}
	res.send(response);
}
