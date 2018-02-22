var mysql = require('mysql');
var md5 = require('md5');
var connection = require('../modules/connection');
var comFunc = require('../modules/commonFunction');
var responses = require('../modules/responses');
exports.login = function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    var sql = "SELECT * FROM `mt_user` WHERE `email`=? AND `password`=?";
    var password = md5(password);

    var values = [email, password];

    connection.query(sql, values, function(err, result) {
        //console.log(result);
        if (err) {
            responses.sendError(res);
            return;
        } else {

            if (result.length > 0) {
                result[0].password = "";
                responses.success(result, res);
                return;
            } else {
                responses.invalidCredential(res);

            }
        }
    });
}
exports.signup = function(req, res) {
    // console.log('11111111')

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    password = password ? md5(password) : res.json({
        message: 'you have invalid password'
    });
    var sql = "SELECT * FROM `mt_user` WHERE `email`=?";
    var values = [email, password];

    connection.query(sql, values, function(err, result) {
        console.log({
            err,
            result
        })
        if (err) {
            responses.sendError(res);
            return;
        } else if (result.length > 0) {



            var msg = "Email is Already exist";
            responses.Alreadyexist(msg, res);
            return;

        } else {

            var user_id = md5(comFunc.generateRandomString());

            var sql = "INSERT INTO `mt_user` (`user_id`, `name`, `email`, `password`) VALUES (?,?,?,?)";
            var values = [user_id, name, email, password];

            connection.query(sql, values, function(err, result) {
                console.log({
                    err,
                    result
                })
                if (err) {
                    responses.sendError(res);
                    console.log(err);
                    return;
                } else {
                    var sql = "SELECT * from `mt_user` WHERE `user_id`=?";
                    var value = [user_id];
                    connection.query(sql, value, function(err, result) {
                        if (err) {
                            responses.sendError(res);
                            return;
                        } else {
                            responses.resultview(result, res);
                            console.log(result[0]);
                        }
                    });

                }

            });

        }
    });
}
exports.createprofile = function(req, res) {
    console.log(req.files);
    var user_id = req.body.user_id;
    var name = req.body.name;
    var gender = req.body.gender;
    var age = req.body.age;
    var description = req.body.description;

    var sql = "SELECT * FROM `mt_user` WHERE `user_id`=?";
    connection.query(sql, [user_id], function(err, result) {
        if (err) {
            responses.sendError(res);
            return;
        } else {
            if (result.length > 0) {
                console.log(age);
                if (age > 18) {

                    var update_sql = "";
                    var values = [];

                    if (req.files.length == 0) {
                        update_sql = "UPDATE `mt_user` SET `name`=?, `gender`=?, `age`=?, `description`=? , `is_verified`=? WHERE `user_id`=?";
                        values = [name, gender, age, description, 1, user_id];
                        connection.query(update_sql, values, function(err, userDetails) {
                            if (err) {
                                console.log(err);

                                responses.sendError(res);
                                return;
                            } else {
                                var sql = "SELECT * FROM `mt_user` WHERE `user_id`=?";
                                var value = [user_id];
                                connection.query(sql, value, function(err, result) {
                                    if (err) {
                                        responses.sendError(res);
                                        return;
                                    } else {
                                        responses.success(result, res);
                                        return;
                                    }
                                });
                            }
                        });

                        console.log(123456);
                    } else {
                        for (var i = 0; i < req.files.length; i++) {
                            if (req.files[i].fieldname == "profile_image") {
                                console.log(req.files[i]);
                                update_sql = "UPDATE `mt_user` SET `profile_image`=?, `name`=?, `gender`=?, `age`=?, `description`=? , `is_verified`=? WHERE `user_id`=?";
                                values = [req.files[i].filename, name, gender, age, description, 1, user_id];
                                connection.query(update_sql, values, function(err, userDetails) {
                                    if (err) {
                                        console.log(err);

                                        responses.sendError(res);
                                        return;
                                    } else {
                                        var sql = "SELECT * FROM `mt_user` WHERE `user_id`=?";
                                        var value = [user_id];
                                        connection.query(sql, value, function(err, result) {
                                            if (err) {
                                                responses.sendError(res);
                                                return;
                                            } else {
                                                responses.success(result, res);
                                                return;
                                            }
                                        });
                                    }
                                });

                            } else if (req.files[i].fieldname == "cover_image") {
                                update_sql = "UPDATE `mt_user` SET `cover_image`=?, `name`=?, `gender`=?, `age`=?, `description`=? , `is_verified`=? WHERE `user_id`=?";
                                values = [req.files[i].filename, name, gender, age, description, 1, user_id];
                                connection.query(update_sql, values, function(err, userDetails) {
                                    if (err) {
                                        console.log(err);

                                        responses.sendError(res);
                                        return;
                                    } else {
                                        var sql = "SELECT * FROM `mt_user` WHERE `user_id`=?";
                                        var value = [user_id];
                                        connection.query(sql, value, function(err, result) {
                                            if (err) {
                                                responses.sendError(res);
                                                return;
                                            } else {
                                                responses.success(result, res);
                                                return;
                                            }
                                        });
                                    }
                                });

                            }

                        }
                    }

                } else {
                    responses.agelimit(res);
                    return;
                }
            } else {
                var msg = "No Data Found";
                responses.NoDataFound(msg, res);
                return;
            }
        }
    });
}