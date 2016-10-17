
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , login = require('./routes/login')
  , homepage = require('./routes/homepage')
  , profile = require('./routes/profile')
  , cartpage = require('./routes/cartpage')
  , checkout = require('./routes/checkout')
  , path = require('path')
  //Importing the 'client-sessions' module
  , session = require('client-sessions');

var app = express();
var winston = require('winston');
var fs=require("file-system");

// all environments
//configure the sessions with our application
app.use(session({    
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently
	

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//GET
app.get('/', routes.index);
app.get('/homepage',homepage.redirectToHomepage);
app.get('/profile',profile.redirectToProfile);
app.get('/cartpage',cartpage.redirectToCartpage);
app.get('/checkout',checkout.redirectToCheckout);
app.get('/successcheckout',checkout.successcheckout);
app.get('/failcheckout',checkout.failcheckout);
app.get('/logout',homepage.logout);

//POST
app.post('/checklogin',login.checklogin);
app.post('/registeruser',login.registeruser);
app.post('/gettheads',homepage.gettheads);
app.post('/getprofile',profile.getprofile);
app.post('/getmyads',profile.getmyads);
app.post('/createanad',profile.createanad);
app.post('/addtocart',homepage.addtocart);
app.post('/getthecart',cartpage.getthecart);
app.post('/removetheitem',cartpage.removetheitem);
app.post('/loadcheckoutpage',checkout.loadcheckoutpage);
app.post('/loadaddresspayment',checkout.loadaddresspayment);
app.post('/addaddresstodb',checkout.addaddresstodb);
app.post('/validatecard',checkout.validate);
app.post('/finalcheckout',checkout.finalcheckout);
app.post('/getsolditems',profile.getsolditems);
app.post('/getpurchaseditems',profile.getpurchaseditems);
app.post('/placebid',homepage.placebid);
app.post('/getbiditems',profile.getbiditems);


http.createServer(app).listen(app.get('port'), function(){
	var login_timestamp=new Date();
  console.log('Express server listening on port ' + app.get('port'));
  fs.appendFile('public/logs/ebayLogs.txt', '\n' + login_timestamp + ' : ' + 'eBay server started running; listening on port ' + app.get('port') + '\n', function(err){});
});
