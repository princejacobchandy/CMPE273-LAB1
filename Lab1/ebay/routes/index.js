
/*
 * GET index page or home page.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

//Redirects to the homepage
exports.index = function(req,res)
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
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "indexpage", redirected to "homepage" : ' +req.session.username+ '\n', function(err){});
				
				//res.render("homepage",{username:req.session.username});
				res.render("homepage",{firstname:results[0].fname,lastLogin: req.session.lastlogin});
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
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "indexpage", redirected to "homepage" : ' +req.session.username+ '\n', function(err){});						
				
						//res.render("homepage",{username:req.session.username});
						res.render("homepage",{firstname:results[0].fname,lastLogin: req.session.lastlogin});
						//res.render("cartpage",{firstname:results[0].fname});
						//res.render("checkout",{firstname:results[0].fname});
                
						} else {
						console.log("redirectToHompage din't work");
						//res.redirect('/');
						res.render('login');

					}
				}
			}, getUser);
			
            }
        }
		}, getUser);
		
	}
	else
	{
		//res.redirect('/');
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'Rendered login/register page to new user' + '\n', function(err){});		
		res.render('login');
	}
};
