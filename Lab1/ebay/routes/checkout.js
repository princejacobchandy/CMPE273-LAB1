
/*
 * GET home page.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

/*exports.redirectToCartpage = function(req, res){
  res.render("cartpage",{firstname:"Batman"});
};*/



//buyer_uname is email id and dont change it
exports.loadcheckoutpage = function(req,res)
{

			var getUser = " select * from shoppingcart where buyer_uname = '"+req.session.email+"' ";
			//var getUser = " select * from userdetails where email = '"+username+"' and pword = '"+signpassword+"' ";
			console.log("Query is:" + getUser);
			mysql.fetchData(function(err, results) {
			if (err) {
            throw err;
			} else {
            if (results.length > 0) {
                //console.log("shopping cart is not empty");
				console.log("in loadcheckoutpage function; cart not empty");
				

				var json_responses;
				//json_responses = {"itemsInCart": req.session.currentcart};
				json_responses = {"statusCode": 300, "itemsInCart": results};
				res.send(json_responses);
				console.log("pushed 300 and the cart info to client");	
				
						//var rows = results;
	                    var jsonString = JSON.stringify(results);
	                    //var jsonParse = JSON.parse(jsonString);
	                    //console.log("Results Type: " + (typeof results));
	                    //console.log("Result Element Type:" + (typeof rows[0].emailid));
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                    //console.log("Results Parse Type:" + (typeof jsString));
	                    //console.log("Results: " + (results));
	                    //console.log("Result Element: "+(rows[0].emailid));
                        console.log("Results Stringify:" + (jsonString)); 
                        //console.log("Results Parse:" + (jsonParse));
						//console.log("results_length is:" + results_length);
               
						
				
            } else {
                
			console.log("in loadcheckoutpage function; cart empty")
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": 301};
			res.send(json_responses);	
			console.log("pushed 301 client");	
            }
        }
    }, getUser);
		
};

exports.loadaddresspayment= function(req,res)
{
			var myaddress, mypayment;
			var getUser = " select * from userdetails where email = '"+req.session.email+"' ";
			//var getUser = " select * from userdetails where email = '"+username+"' and pword = '"+signpassword+"' ";
			console.log("Query is:" + getUser);
			mysql.fetchData(function(err, results) {
			if (err) {
            throw err;
			} else {
            if (results.length > 0) {
                //console.log("shopping cart is not empty");
				console.log("in loadaddresspayment function; cart not empty");
				var json_responses;
				
				console.log("results[0].addressline1 is: " + results[0].addressline1 + ',  results[0].ccard_info is: ' + results[0].ccard_info);
				
				if(results[0].addressline1==''){
					console.log("addressline1 is null");
				addressline1='';	
				addressline2='';
				addresscity='';
				addressstate='';
				addresspin='';
				}
				else{
					console.log("addressline1 is not null");
				addressline1=results[0].addressline1;	
				addressline2=results[0].addressline2;
				addresscity=results[0].addresscity;
				addressstate=results[0].addressstate;
				addresspin=results[0].addresspin;
				}	
				
				if(results[0].ccard_info==''){
					console.log("payment is null");
				mypayment='';
				}
				else {
					console.log("payment is not null");
				mypayment=results[0].ccard_info;	
				}
				
				
				
				json_responses = {"statusCode": 300, "mypayment": mypayment, "addressline1": addressline1, "addressline1": addressline1, "addressline2": addressline2, "addresscity": addresscity, "addressstate": addressstate, "addresspin": addresspin};
				res.send(json_responses);
				console.log("pushed 300 and address payment to client");	
	
				
            } else {
                
			console.log("in loadaddresspayment function; cart empty")
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": 301};
			res.send(json_responses);	
			console.log("pushed 301 client");	
            }
        }
    }, getUser);
		
};




exports.redirectToCheckout = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		
		console.log("first attempt to redirect to main page ");
		var getUser = " select fname from userdetails where email = '"+req.session.username+"' ";
		console.log("Query is:" + getUser);
		mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "checkoutpage" : ' +req.session.username+ '\n', function(err){});	
				
				//res.render("homepage",{username:req.session.username});
				res.render("checkout",{firstname:results[0].fname});
				//res.render("cartpage",{firstname:results[0].fname});
				//res.render("checkout",{firstname:results[0].fname});
                
            } else {
                console.log("second attempt to redirect to main page ");
				//res.redirect('/');
				var getUser = " select fname from userdetails where uname = '"+req.session.username+"' ";
				console.log("Query is:" + getUser);
				mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
						if (results.length > 0) {
						console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "checkoutpage" : ' +req.session.username+ '\n', function(err){});							
				
						//res.render("homepage",{username:req.session.username});
						res.render("checkout",{firstname:results[0].fname});
						//res.render("cartpage",{firstname:results[0].fname});
						//res.render("checkout",{firstname:results[0].fname});
                
						} else {
						console.log("redirectToProfile din't work");
						res.redirect('/');
				
			
					}
				}
			}, getUser);
			
            }
        }
		}, getUser);
		
	}
	else
	{
		res.redirect('/');
	}
};




exports.addaddresstodb = function(req,res)
{
			var address1 = req.param("address1");
			var address2 = req.param("address2");
			var address3 = req.param("address3");
			var address4 = req.param("address4");
			var address5 = req.param("address5");
			req.session.address=address1 + ', ' +  address2 + ', ' +  address3 + ', ' +  address4 + ', ' +  address5;
			
			var getUser = "UPDATE `ebay`.`userdetails` SET `addressline1`='"+address1+"', `addressline2`='"+address2+"', `addresscity`='"+address3+"', `addressstate`='"+address4+"', `addresspin`='"+address5+"' where email = '"+req.session.email+"' ";
			//var getUser = " select * from userdetails where email = '"+username+"' and pword = '"+signpassword+"' ";
			console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User updated his shipping address information : ' +req.session.username+ '\n', function(err){});												
							console.log("address info was added/updated properly;")
							var json_responses;
							json_responses = {"statusCode": 200};
							res.send(json_responses);	
							console.log("pushed result to client");
							
							}
						}, getUser);
		
};




exports.validate = function(req, res) {

    var cardno = req.param("cardno");
	cardno=cardno.toString();
	var cardno_string=cardno;
    var cvvno = req.param("cvvno");
	cvvno=cvvno.toString();
	var edate = req.param("edate");
	var exMonth = "";
    var exYear = "";
	var exDay = "";
	var cardnumber = "";
	
	console.log("cardno_string is: " + cardno_string);
	
	for(var i=0;i<=3;i++)
	{
	exYear+=edate[i];	
	}
	
	for(var i=5;i<=6;i++)
	{
	exMonth+=edate[i];		
	}
	
	for(var i=8;i<=9;i++)
	{
	exDay+=edate[i];		
	}
	
	for(var i=12;i<=15;i++)
	{
	cardnumber+=cardno_string[i];		
	}

	
	console.log(cardno + ', ' + cvvno + ', ' + edate + ', ' + exMonth + ', ' + exYear);
    
    var cardno1 = /^(?:[0-9]{16})$/;
    var cardno2 = /^(?:[0-9]{3})$/;
    var today;
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var results, result_code;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
	
	console.log(dd + ', ' + mm + ', ' + yyyy);
	

	
    if (cardno.match(/^(?:[0-9]{16})$/)) {
        if (cvvno.match(/^(?:[0-9]{3})$/)) {
            if ((exMonth > 0 && exMonth < 13 && (exYear.match(/^(?:[0-9]{4})$/)) )) {
                if ((mm <= exMonth) && (yyyy <= exYear) && (dd <= exDay)) {
                    results = "Valid Credit Card";
					result_code=200;
					req.session.payment='************'+cardnumber;
					var getUser ="UPDATE `ebay`.`userdetails` SET `ccard_info`='************"+cardnumber+"' WHERE email = '"+req.session.email+"'";
						//var getUser = "INSERT INTO `ebay`.`userdetails` (`uname`, ) VALUES ('"+uname+"');"
						console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User updated his payment information (credit card details) : ' +req.session.username+ '\n', function(err){});												
											
							console.log("card info was added/updated properly;")
							var json_responses;
							}
						}, getUser);
					
					
					
                } else {
                    results = "Invalid Credit Card: Card Expired";
					result_code=201;
                }
            } else {
                results = "Invalid Credit Card: Invalid Date";
				result_code=201;
            }
        } else {
            results = "Invalid Credit Card: Invalid CVV";
			result_code=201;
        }

    } else {
        results = "Invalid Credit Card: Invalid Card Number";
		result_code=201;
    }

			console.log("credit card checked; results is: " + results);
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": result_code, "results" : results};
			res.send(json_responses);	
			console.log("pushed result to client which is " + result_code);
};






exports.finalcheckout = function(req,res)
{
			var noofitems = req.param("noofitems");
			var totalamount = req.param("totalamount"); 
			var i;
			var temp_cart;
 
			var getUser = " select * from shoppingcart where buyer_uname = '"+req.session.email+"' ";
			//var getUser = " select * from userdetails where email = '"+username+"' and pword = '"+signpassword+"' ";
			console.log("Query is:" + getUser);
			mysql.fetchData(function(err, results) {
			if (err) {
            throw err;
			} else {
            if (results.length > 0) {
				temp_cart=results;
                
				console.log("in finalcheckout function; cart not empty");
				for(i=0;i<results.length;i++)
					{
					var getUser =  "INSERT INTO `ebay`.`bill_table` (`product_id`, `product_name`, `product_qty`, `product_price`, `buyer_name`, `seller_name`, `totalamt`, `totalitems`, `buyer_address`, `bill_payment`) VALUES ('"+results[i].product_id+"', '"+results[i].product_name+"', '"+results[i].product_qty+"', '"+results[i].product_price+"', '"+results[i].buyer_uname+"', '"+results[i].seller_email+"', '"+totalamount+"', '"+noofitems+"', '"+req.session.address+"', '"+req.session.payment+"' )";
					console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
											
							console.log(" addition iteration no:" + i);
							}
						}, getUser);
							
					}
					
					
					console.log("ADDED CART INFO TO BILL TABLE");
				

				/*var json_responses;
				
				json_responses = {"statusCode": 300, "itemsInCart": results};
				res.send(json_responses);
				console.log("pushed 300 and the cart info to client");	
				
						//var rows = results;
	                    var jsonString = JSON.stringify(results);
	                    //var jsonParse = JSON.parse(jsonString);
	                    //console.log("Results Type: " + (typeof results));
	                    //console.log("Result Element Type:" + (typeof rows[0].emailid));
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                    //console.log("Results Parse Type:" + (typeof jsString));
	                    //console.log("Results: " + (results));
	                    //console.log("Result Element: "+(rows[0].emailid));
                        console.log("Results Stringify:" + (jsonString)); 
                        //console.log("Results Parse:" + (jsonParse));
						//console.log("results_length is:" + results_length);*/
               
					for(i=0;i<temp_cart.length;i++)
					{
					//var getUser =  "INSERT INTO `ebay`.`bill_table` (`product_id`, `product_name`, `product_qty`, `product_price`, `buyer_name`, `seller_name`, `totalamt`, `total items`, `buyer_address`, `bill_payment`) VALUES ('"+results[i].product_id+"', '"+results[i].product_name+"', '"+results[i].product_qty+"', '"+results[i].product_price+"', '"+results[i].buyer_uname+"', '"+results[i].seller_email+"', '"+totalamount+"', '"+noofitems+"', '"+req.session.address+"', '"+req.session.payment+"' )";
					//var getUser = "DELETE FROM `ebay`.`shoppingcart` WHERE `buyer_name`='23'";
					var getUser = "DELETE FROM `ebay`.`shoppingcart` WHERE `cart_id`='"+temp_cart[i].cart_id+"' ";


					console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
											
							console.log(" deletion iteration no:" + i);
							}
						}, getUser);
							
					}
					console.log("DELETED CART INFO FROM  CART TABLE");
					
					
					
					/*
					for(i=0;i<temp_cart.length;i++)
					{
					var getUser = " select * from product_table where product_id = '"+temp_cart[i].product_id+"' ";
					


					console.log("Query is:" + getUser);
					mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						if (results.length > 0) {
						temp_cart[i].product_qty=results[i].product_qty-temp_cart[i].product_qty;
						console.log(" updation temp_cart_cache iteration no:" + i);
						console.log("temp_cart[i].product_qty: " + temp_cart[i].product_qty);
						
						} else {
						console.log("SOME ERROR IN PRODUCT TABLE COUNT UPDATION");
								}
						}
					}, getUser);
							
					}
					console.log("UPDATED QUANTITY IN TEMP_CART");*/
					
					

					

					for(i=0;i<temp_cart.length;i++)
					{
					(temp_cart[i].product_totalqty)=(temp_cart[i].product_totalqty) - (temp_cart[i].product_qty);
					var getUser = "UPDATE `ebay`.`product_table` SET `product_qty`='"+temp_cart[i].product_totalqty+"' WHERE `product_id`='"+temp_cart[i].product_id+"' ";
					console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
											
							console.log(" updation product table iteration no:" + i);
							}
						}, getUser);
							
					}
					console.log("UPDATED PRODCT TABLE QUANTITY");
					
					
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User made a new purchase, checkout successful and bill have been generated : ' +req.session.username+ '\n', function(err){});												


					json_responses = {"statusCode": 200};
					res.send(json_responses);	
					console.log("pushed 200 success to client");	


					
				
            } else {
                
			console.log("in finalcheckoutpage function; cart empty")
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": 300};
			res.send(json_responses);	
			console.log("pushed 300 error to client");	
            }
        }
    }, getUser);
		
};


exports.successcheckout = function(req, res){
	
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "successcheckoutpage" : ' +req.session.username+ '\n', function(err){});							
	
  res.render('successcheckout');
};

exports.failcheckout = function(req, res){
	
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "failcheckoutpage" : ' +req.session.username+ '\n', function(err){});							
	
  res.render('failcheckout');
};

/*exports.confirmandpay = function(req, res) {

MAJOR PENDING TASKS
ACTUAL CONNPOOLING CODE
log classify info and error/debug; implement logging

SHOULD I FIX SESSION?
res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');


The Service should take care of exception that means validation is extremely important for this server. 
Good Exception Handling and validation would attract good marks.



*/

