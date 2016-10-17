/**
 * Routes file for Login
 */
 
var ejs = require("ejs");
var mysql = require('./mysql');
var encryption = require('./encryption');
var fs=require("file-system");
var winston = require('winston');


exports.checklogin = function(req, res) {
    // check user already exists
	var username, signpassword, pwd_encrypted;
	username = req.param("username");
	signpassword = req.param("signpassword");
	
	pwd_encrypted = encryption.encrypt(signpassword);
	console.log("CONSOLELOG: pwd_encrypted is: " + pwd_encrypted);
	winston.log('info', "WINSTONLOG: pwd_encrypted is: " + pwd_encrypted);
	
	
	var login_time_stamp=new Date();
	//console.log(login_timestamp);
	
	
	console.log("first login attempt -checking username");
    var getUser = " select * from userdetails where uname = '"+username+"' and pword = '"+pwd_encrypted+"' ";
    console.log("Query is:" + getUser);
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log("valid Login");
				//fs.appendFile('public/logs/ebayLogs.txt', "my name is prince", function(err){});
                /*ejs.renderFile('./views/successLogin.ejs', {data: results}, function(err, result) {
		                    // render on success
		                    if (!err) {
		                        res.end(result);
		                    }
		                    // render or error
		                    else {
		                        res.end('An error occurred');
		                        console.log(err);
		                    }
		                });*/
					
						//Assigning the session
						req.session.username = username;
						req.session.handle = results[0].seller_handle;
						req.session.email = results[0].email;
						req.session.currentcart;
						req.session.address=results[0].addressline1 + ', ' + results[0].addressline2 + ', ' + results[0].addresscity + ', ' + results[0].addressstate + ', ' + results[0].addresspin;
						req.session.payment=results[0].ccard_info;
						req.session.lastlogin=results[0].lastlogin;
						console.log("Session initialized");
						
						
						
						
						
						//var getUser ="UPDATE `ebay`.`shoppingcart` SET `product_qty`='"+new_quantity+"' WHERE `cart_id`='"+results[0].cart_id+"' ";
						var getUser = "UPDATE `ebay`.`userdetails` SET `lastlogin`='"+login_time_stamp+"' WHERE `seller_handle`='"+results[0].seller_handle+"';";
						console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
											
							console.log("updated lastlogin information in the db");
							}
						}, getUser);
						
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User signed in succesfully : ' +req.session.email+ '\n', function(err){});
						
						
						
						
						//console.log("results[0].seller_handle is: "+  results[0].seller_handle);
						//console.log("results[0].seller_handle is: "+  results[0].seller_handle);
						json_responses = {"statusCode" : 200};
						res.send(json_responses);
						
            } else {
				
			console.log("second login attempt -checking email");
			var getUser = " select * from userdetails where email = '"+username+"' and pword = '"+pwd_encrypted+"' ";
			console.log("Query is:" + getUser);
			mysql.fetchData(function(err, results) {
			if (err) {
            throw err;
			} else {
            if (results.length > 0) {
                console.log("valid Login");
				
                /*ejs.renderFile('./views/successLogin.ejs', {data: results}, function(err, result) {
		                    // render on success
		                    if (!err) {
		                        res.end(result);
		                    }
		                    // render or error
		                    else {
		                        res.end('An error occurred');
		                        console.log(err);
		                    }
		                });*/
						//Assigning the session
						req.session.username = results[0].uname;
						req.session.handle = results[0].seller_handle;
						req.session.email = username;
						req.session.address=results[0].addressline1;
						req.session.payment=results[0].ccard_info;
						req.session.lastlogin=results[0].lastlogin;
						console.log("Session initialized");
						
						var getUser = "UPDATE `ebay`.`userdetails` SET `lastlogin`='"+login_time_stamp+"' WHERE `seller_handle`='"+results[0].seller_handle+"';";
						console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
											
							console.log("updated lastlogin information in the db");
							}
						}, getUser);			

var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User signed in succesfully : ' +req.session.email+ '\n', function(err){});						
						
						
						json_responses = {"statusCode" : 200};
						res.send(json_responses);
						//fs.appendFile('public/logs/ebayLogs.txt', "my name is prince..." +req.session.email+ " ..dsfsdfds", function(err){});
						
            } else {
                console.log("Invalid Login");
                /*ejs.renderFile('./views/failLogin.ejs', function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                    }
                    //render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });*/
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
            }
        }
    }, getUser);
				
		
				
            }
        }
    }, getUser);
}



exports.registeruser = function(req,res)
{
	var fname, lname, uname, email, regpassword, bdate, ulocation, contact, uname_flag=0, email_flag=0, pwd_decrypted, pwd_encrypted;
	fname = req.param("fname");
	lname = req.param("lname");
	uname = req.param("uname");
	email = req.param("email");
	regpassword = req.param("regpassword");
	bdate = req.param("bdate");
	ulocation = req.param("location");
	contact = req.param("contact");
	
	console.log("typeof(bdate) is: " + typeof(bdate));
	console.log("bdate is: " + bdate);
	
	if(lname=='undefined')
	{
	lname=0;	
	}
	if(bdate=='undefined')
	{
	bdate=0;	
	}
	if(ulocation=='undefined')
	{
	ulocation=0;	
	}
	if(contact=='undefined')
	{
	contact=0;	
	}
	
	
	pwd_encrypted = encryption.encrypt(regpassword);
	console.log("pwd_encrypted is: " + pwd_encrypted);
	//pwd_decrypted = encryption.decrypt(pwd_encrypted);
	
	//console.log("regpasswordis: " + regpassword );
	//console.log("pwd_encrypted is: " + pwd_encrypted + "..........and pwd_decrypted is: " + pwd_decrypted );
	
	
	

	var getUser = "select * from userdetails where uname = '"+uname+"' ";  //is there this username
	console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log("uname already in use");
				//uname_flag=1;
                /*ejs.renderFile('./views/successLogin.ejs', {data: results}, function(err, result) {
		                    // render on success
		                    if (!err) {
		                        res.end(result);
		                    }
		                    // render or error
		                    else {
		                        res.end('An error occurred');
		                        console.log(err);
		                    }
		                });*/
						//Assigning the session
						//req.session.username = username;
						//console.log("Session initialized");
						console.log("Sending 500 1");
						json_responses = {"statusCode" : 500};
						res.send(json_responses);
						
            } else {
                console.log("uname not in use");
				//uname_flag=0;
				
	var getUser = "select * from userdetails where email = '"+email+"' ";  //is there this email
	console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log("email already in use");
				//email_flag=1;
                /*ejs.renderFile('./views/successLogin.ejs', {data: results}, function(err, result) {
		                    // render on success
		                    if (!err) {
		                        res.end(result);
		                    }
		                    // render or error
		                    else {
		                        res.end('An error occurred');
		                        console.log(err);
		                    }
		                });*/
						//Assigning the session
						//req.session.username = username;
						//console.log("Session initialized");
						console.log("Sending 500 2");
						json_responses = {"statusCode" : 500};
						res.send(json_responses);
						
            } else {
                console.log("email not in use; storing user information to db");
				//email_flag=0;
				
				
	var getUser = "INSERT INTO `ebay`.`userdetails` (`uname`, `pword`, `fname`, `lname`, `email`, `bday`, `location`, `contact`) VALUES ('"+uname+"', '"+pwd_encrypted+"', '"+fname+"', '"+lname+"', '"+email+"', '"+bdate+"', '"+ulocation+"', '"+contact+"');"
	console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            //if (results.length > 0) {
				console.log("results.length is " +results.length);
                console.log("data successfully entered to db");
				//db_flag=1;
                /*ejs.renderFile('./views/successLogin.ejs', {data: results}, function(err, result) {
		                    // render on success
		                    if (!err) {
		                        res.end(result);
		                    }
		                    // render or error
		                    else {
		                        res.end('An error occurred');
		                        console.log(err);
		                    }
		                });*/
						//Assigning the session
						//req.session.username = username;
						//console.log("Session initialized");
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'New user signed up succesfully : ' +email+ '\n', function(err){});
						
						console.log("Sending 501");
						json_responses = {"statusCode" : 501};
						res.send(json_responses);
						
            //} else {
            //    console.log("data couldn't be entered; some error; debug prince");
				//db_flag=0;
            }
        //}
    }, getUser);
            }
        }
    }, getUser);
            }
        }
    }, getUser);
	
};


