
/*
 * GET profile page.
 */

 
var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

/*exports.redirectToProfile = function(req, res){
  res.render("profile",{firstname:"Batman"});
};*/




//Redirects to the homepage
exports.redirectToProfile = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		
		console.log("first attempt to redirect to main page ");
		var getUser = " select fname from userdetails where email = '"+req.session.email+"' ";
		console.log("Query is:" + getUser);
		mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "profilepage" : ' +req.session.username+ '\n', function(err){});					
				
				//res.render("homepage",{username:req.session.username});
				res.render("profile",{firstname:results[0].fname});
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
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "profilepage" : ' +req.session.username+ '\n', function(err){});					
				
						//res.render("homepage",{username:req.session.username});
						res.render("profile",{firstname:results[0].fname});
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



exports.getprofile = function(req,res)
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
	
		console.log("reading user profile info from the database");
		var getUser = " select * from userdetails where email = '"+req.session.email+"' ";
		//var getUser = " select * from product_table ";
		console.log("Query is:" + getUser);
		mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
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
						
                //console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
				var json_responses;
				json_responses = {"statusCode" : 200, "user_details": jsonParse};
				res.send(json_responses);
                
            } else {
                console.log("database empty: no such user");
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.send(json_responses);
			
            }
        }
		}, getUser);
	
};



exports.getmyads = function(req,res)
{
		var results_length;
		console.log("reading all the ads from the products_table in the database");
		var getUser = " select * from product_table where seller_email = '"+req.session.email+"' ";
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

};


exports.getsolditems = function(req,res)
{
		var results_length;
		console.log("reading all the solditems");
		var getUser = " select * from bill_table where seller_name = '"+req.session.email+"' ";
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

};



exports.getpurchaseditems = function(req,res)
{
		var results_length;
		console.log("reading all the purchaseditems");
		var getUser = " select * from bill_table where buyer_name = '"+req.session.email+"' ";
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

};



exports.getbiditems = function(req,res)
{
		var results_length;
		console.log("reading all the biditems");
		var getUser = " select * from bidding_table where product_buyer = '"+req.session.email+"' ";
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

};




exports.createanad = function(req,res)
{
	console.log("inside createand");
	var ptype,ptitle,pdesc,pqty,pprice,noofdays,suname,shandle,semail;

	shandle = req.session.handle;
	suname = req.session.username;
	semail = req.session.email;
	ptype = req.param("producttype");
	ptitle = req.param("productname");
	pdesc = req.param("productdesc");
	pqty = req.param("productqty");
	pprice = req.param("productprice");
	
	
	
	if(ptype==1){  //NORMAL PRODUCT
		console.log("NORMAL PRODUCT");
		var results_length;
		console.log("creating an ad and storing it to products_table in the database");
		var getUser = "INSERT INTO `ebay`.`product_table` (`seller_handle`, `seller_uname`, `product_name`, `product_description`, `product_qty`, `product_price`, `seller_email`, `product_type`) VALUES ('"+shandle+"','"+suname+"', '"+ptitle+"', '"+pdesc+"', '"+pqty+"', '"+pprice+"', '"+semail+"', '"+ptype+"');"
		console.log("Query is:" + getUser);
		mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {


var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User created a new advertisement (normal product) : ' +req.session.username+ ' is selling ' +ptitle+ '; ' +pqty+'(Quantity)'+ '\n', function(err){});											
		
				//results_length=results.length;
				//console.log("results.length is " + results.length);
				console.log("normal data successfully inserted and data succesfully created");				
				var json_responses;
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
                
           
        }
		}, getUser);
		
	}
	else if (ptype==2) {  //BIDDING PRODUCT
		console.log("BIDDING PRODUCT");
		noofdays = req.param("noofdays");
		var results_length;
		console.log("creating an ad and storing it to products_table in the database");
		var getUser = "INSERT INTO `ebay`.`product_table` (`seller_handle`, `seller_uname`, `product_name`, `product_description`, `product_qty`, `product_price`, `seller_email`, `product_type`, `bid_start`, `bid_end`) VALUES ('"+shandle+"','"+suname+"', '"+ptitle+"', '"+pdesc+"', '"+pqty+"', '"+pprice+"', '"+semail+"', '"+ptype+"', now(), DATE_ADD(now(), INTERVAL '"+noofdays+"' DAY));"
		console.log("Query is:" + getUser);
		mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User created a new advertisement (bid product) : ' +req.session.username+ ' is selling ' +ptitle+ '; ' +pqty+'(Quantity)'+ '\n', function(err){});											
			
				//results_length=results.length;
				//console.log("results.length is " + results.length);
				console.log("bidding data successfully inserted and data succesfully created");				
				var json_responses;
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
                
           
        }
		}, getUser);		
		
		
	}

};