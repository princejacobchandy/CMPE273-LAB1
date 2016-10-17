var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		
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
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "homepage" : ' +req.session.username+ '\n', function(err){});				
				
				//res.render("homepage",{username:req.session.username});
				res.render("homepage",{firstname:results[0].fname, lastLogin: req.session.lastlogin});
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
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "homepage" : ' +req.session.username+ '\n', function(err){});						
				
						//res.render("homepage",{username:req.session.username});
						res.render("homepage",{firstname:results[0].fname,lastLogin: req.session.lastlogin});
						//res.render("cartpage",{firstname:results[0].fname});
						//res.render("checkout",{firstname:results[0].fname});
                
						} else {
						console.log("redirectToHompage din't work");
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


/*
//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{firstname:"Batman"});
	}
	else
	{
		res.redirect('/');
	}
};
*/



//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User signed out : ' +req.session.username+ '\n', function(err){});
	
	req.session.destroy();
	res.redirect('/');
	console.log("session destroyed");
	console.log("logging out");
	//console.log("redirecting to '/' ");
	
	};
	
	
	
	
	
exports.gettheads = function(req,res)
{
	//Checks before redirecting whether the session is valid
	/*if(req.session.username && req.session.para4)
	{
		console.log("SESSION & TABLE EXISTS!");
		var json_responses;
		json_responses = {"statusCode" : req.session.para1, "totalInCart" : req.session.para2, "totalPrice": req.session.para3, "itemsInCart": req.session.para4};
		//res.render("homepage",{username:req.session.username, tableCount:req.session.para2, totalPrice:req.session.para3});
		res.send(json_responses);
	}
	else
	{
		console.log("INVALID SESSION!");
		res.redirect('/');
	}*/
	if(req.session.username)
	{	
		var results_length;
	
		console.log("reading all the ads from the products_table in the database");
		var getUser = " select * from product_table where seller_email != '"+req.session.email+"' and product_qty!= '0'";
		console.log("Query is:" + getUser);
		mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
				results_length=results.length;
				console.log("results.length is " + results.length);
				console.log("results is " + results);
				
						var rows = results;
	                    var jsonString = JSON.stringify(results);
	                    var jsonParse = JSON.parse(jsonString);
	                    console.log("Results Type: " + (typeof results));
	                    //console.log("Result Element Type:" + (typeof rows[0].emailid));
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                    console.log("Results Parse Type:" + (typeof jsString));
	                    console.log("Results: " + (results));
	                    //console.log("Result Element: "+(rows[0].emailid));
                        console.log("Results Stringify:" + (jsonString)); 
                        console.log("Results Parse:" + (jsonParse));
						console.log("results_length is:" + results_length);
						
                //console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
				var json_responses;
				json_responses = {"statusCode" : 200, "product_list": jsonParse, "results_length": results_length};
				res.send(json_responses);
                
            } else {
                console.log("database empty");
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.send(json_responses);
			
            }
        }
		}, getUser);	

	}
	
	else
		
		{
		console.log("session doesn't exist");	
		}
		};	


	
// NOTE: In this function, buyer username is used as buyeremail id and shouldn't be changed
exports.addtocart = function(req,res)
{
	
	console.log("inside addtocart function");
	var prodid, prodqty, prodprice, prodname, proddesc, prodseller, prod_total_qty, itemsInCart=[];
	prodid = req.param("product_id");
	prodqty = req.param("product_qty");
	
	prodprice = req.param("product_price");
	prodname = req.param("product_pname");
	proddesc = req.param("product_pdesc");
	prodseller_email = req.param("product_seller_email");
	prodseller_uname = req.param("product_seller_uname");
	
	
	prod_total_qty=req.param("product_total_qty");
	console.log(prodid + ', ' + prodqty + ', ' + prodprice + ', ' + prodname + ', ' + proddesc + ', ' + prodseller_email + ', ' + prodseller_uname + ', ' + prod_total_qty);
	
	if(req.session.currentcart!=undefined)
	{
		itemsInCart = req.session.currentcart;
	}
	
	itemsInCart.push({"prodid" : prodid, 'prodqty' : prodqty, 'prodprice' : prodprice, 'prodname' : prodname, 'proddesc' : proddesc,  'prodseller_email' : prodseller_email, 'prodseller_uname' : prodseller_uname, });
	req.session.currentcart = itemsInCart;
	
	
	
		var getUser = " select * from shoppingcart where buyer_uname = '"+req.session.email+"' and product_id = '"+prodid+"' ";
		console.log("Query is:" + getUser);
		mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
				results_length=results.length;
				//console.log("results.length is " + results.length);
				//console.log("results is " + results);
				
						//var rows = results;
	                    var jsonString = JSON.stringify(results);
                        console.log("Results Stringify:" + (jsonString)); 
						console.log("results_length is:" + results_length);
						
						//////////////////////////////////////////////////////////////////////////////////
						console.log("results[0].product_qty: " + results[0].product_qty);
						console.log("results[0].cart_id: " + results[0].cart_id);
						var new_quantity=results[0].product_qty + prodqty;
						
						
						var getUser ="UPDATE `ebay`.`shoppingcart` SET `product_qty`='"+new_quantity+"' WHERE `cart_id`='"+results[0].cart_id+"' ";
						//var getUser = "INSERT INTO `ebay`.`userdetails` (`uname`, ) VALUES ('"+uname+"');"
						console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
							
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User added an item to his shopping cart : ' +req.session.username+ ' added ' +prodname+ '; ' +prodqty+'(Quantity)' +'\n', function(err){});											
							console.log("existing cart info was updated properly;")
							var json_responses;
							//json_responses = {"itemsInCart": req.session.currentcart};
							json_responses = {"statusCode": 301};
							res.send(json_responses);
							}
						}, getUser);
						////////////////////////////////////////////////////////////////////////////////////////////
						
            } else {
                console.log("respective user entry for this product not present in db, so insering the respective info to shoppingcart table");
				var getUser = "INSERT INTO `ebay`.`shoppingcart` (`buyer_uname`, `product_id`, `product_qty`, `product_name`, `product_desc`, `product_price`, `seller_uname`, `seller_email`,`product_totalqty` ) VALUES ('"+req.session.email+"', '"+prodid+"', '"+prodqty+"', '"+prodname+"', '"+proddesc+"', '"+prodprice+"', '"+prodseller_uname+"', '"+prodseller_email+"' , '"+prod_total_qty+"')";
				console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
							
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User added a new item to his shopping cart : ' +req.session.username+ ' added ' +prodname+ '; ' +prodqty+'(Quantity)' + '\n', function(err){});									
							console.log("new info was added to shopping cart")
							//console.log("added item to the cart and added that to session")
							var json_responses;
							//json_responses = {"itemsInCart": req.session.currentcart};
							json_responses = {"statusCode": 302};
							res.send(json_responses);
							}
						}, getUser);

			
            }
        }
		}, getUser);	
};


exports.placebid = function(req,res)
{
				
	console.log("inside placebid function");
	var prodid, prodqty, prodprice, prodname, proddesc, prodseller, prodbuyer, bidprice;
	prodid = req.param("product_id");
	prodqty = req.param("product_qty");
	prodprice = req.param("product_price");
	prodname = req.param("product_pname");
	proddesc = req.param("product_pdesc");
	prodseller = req.param("product_seller_email");
	prodbuyer = req.session.email;	
	bidprice = req.param("product_bprice");
	
	var currenttimer;
	
	
	var getUser = "SELECT timediff(product_table.bid_end, now()) as timer FROM ebay.product_table where product_id = '" + prodid + "'";
	console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
							if(results.length>0)
							{
							currenttimer=results[0].timer;	
							console.log("currenttimer is:" + currenttimer);
							if(!isNaN(Number(currenttimer[0])))
								{
								var getUser = "INSERT INTO `ebay`.`bidding_table` (`product_id`, `product_name`, `product_desc`, `product_qty`, `product_seller`, `product_buyer`, `bid_price`, `actual_price`) VALUES ('"+prodid+"', '"+prodname+"', '"+proddesc+"', '"+prodqty+"', '"+prodseller+"', '"+prodbuyer+"', '"+bidprice+"', '"+prodprice+"');"
								console.log("Query is:" + getUser);
								mysql.fetchData(function(err, results) {
								if (err) {
									throw err;
										} 
								else {
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User bid an item : ' +req.session.username+ ' bid ' +prodname+ '; ' +prodqty+'(Quantity)'+ '\n', function(err){});											
									console.log("new info was added to bidding table")
									var json_responses;
									json_responses = {"statusCode": 200, "currenttimer": currenttimer};
									res.send(json_responses);
								}
							
								}, getUser);
								}
							else
							{
									console.log("bidding time is over")
									var json_responses;
									json_responses = {"statusCode": 201};
									res.send(json_responses);	
							}	
					
							}
							else {			
							console.log("results.length is less than 0");
							}
						}	
						}, getUser);
	
						};
	

