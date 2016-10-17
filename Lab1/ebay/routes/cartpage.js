
/*
 * GET cart page.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

/*exports.redirectToCartpage = function(req, res){
  res.render("cartpage",{firstname:"Batman"});
};*/


//Redirects to the homepage
exports.redirectToCartpage = function(req,res)
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
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "shoppingcartpage" : ' +req.session.username+ '\n', function(err){});				
				//res.render("homepage",{username:req.session.username});
				res.render("cartpage",{firstname:results[0].fname});
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
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "shoppingcartpage" : ' +req.session.username+ '\n', function(err){});				
				
						//res.render("homepage",{username:req.session.username});
						res.render("cartpage",{firstname:results[0].fname});
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



/*exports.gettheads = function(req,res)
{
	
	
		var results_length;
	
		console.log("reading all the ads from the products_table in the database");
		var getUser = " select * from product_table where seller_email != '"+req.session.email+"'";
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
};	*/



/*exports.getthecart = function(req,res)
{
	if(req.session.currentcart!=undefined) { //cart not empty
	var jsonString = JSON.stringify(req.session.currentcart);
	console.log("req.session.currentcart.length is " + req.session.currentcart.length);
	console.log("jsonString.length is " + jsonString.length);
	//if(req.session.username)
	console.log("in getthecart function; cart not empty")
	var json_responses;
	//json_responses = {"itemsInCart": req.session.currentcart};
	json_responses = {"statusCode": 300, "itemsInCart": req.session.currentcart};
	res.send(json_responses);
	console.log("pushed 300 and the cart info to client");	
	}
	else  { //cart empty
	console.log("in getthecart function; cart empty")
	var json_responses;
	//json_responses = {"itemsInCart": req.session.currentcart};
	json_responses = {"statusCode": 301};
	res.send(json_responses);	
	console.log("pushed 301 client");
		
	}
};	*/



//buyer_uname is email id and dont change it
exports.getthecart = function(req,res)
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
				console.log("in getthecart function; cart not empty");
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
                
			console.log("in getthecart function; cart empty")
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": 301};
			res.send(json_responses);	
			console.log("pushed 301 client");	
            }
        }
    }, getUser);
	
	
};






exports.removetheitem = function(req,res)
{
	
	cartID = req.param("cart_id");
	ptitle = req.param("ptitle");
	
	var getUser = "DELETE FROM `ebay`.`shoppingcart` WHERE `cart_id`='"+cartID+"'";
	//var getUser = " select * from userdetails where email = '"+username+"' and pword = '"+signpassword+"' ";
			console.log("Query is:" + getUser);
			mysql.fetchData(function(err, results) {
			if (err) {
            throw err;
			} else {
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User removed an item from his shopping cart : ' +req.session.username+ ' removed ' +ptitle+  '\n', function(err){});											
            
			console.log("item removed from the cart")
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": 300};
			res.send(json_responses);	
			console.log("pushed 300 to client");
        }
    }, getUser);
	
	
};


	
	
	
	
