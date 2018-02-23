exports.generateRandomString=function(){

	var text = "";
    var possible = "123456789";

    for (var i = 0; i < 4; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
