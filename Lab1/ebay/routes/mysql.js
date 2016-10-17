/**
 * New node file
 */


//NEW METHOD 
var ejs = require('ejs'); //importing module ejs
var mysql = require('mysql'); //importing module mysql


var  connection = mysql.createPool({
	 connectionLimit : 1000,
     host: 'localhost', //host where mysql server is running
     user: 'root', //user for the mysql application
     password: '1234', //password for the mysql application
     database: 'ebay', //database name
     port: 3306 //port, it is 3306 by default for mysql
 }); 	
	
var getConnection = function(success,failure) {
	var sqlConnection = connection.getConnection(function(err, connection) {
		if (!err) {
			console.log("Database is connected");
			//connection.release();
			success(connection);
		} else {
			console.log("Error connecting database");
			failure("Error connecting database");
		}
		//return sqlConnection;
    });
};

//fetching the data from the sql server 
var fetchData = function(callback,sqlQuery){
		console.log("\nSQL Query::"+sqlQuery);
		var  connection=getConnection(function(connection){
				connection.query(sqlQuery,function(err, rows, fields) {
			if(err){
				console.log("ERROR: " + err.message);
				//connection.release();
			}
 
			else
			{ // return err or result 
				console.log("DB Results:"+rows);
				callback(err, rows);
			}
		});
		console.log("\nConnection closed..");
		connection.release();//connection.end();
		},function(error){
			console.log("something went wrong while releasing connection");
		});
	}
exports.fetchData=fetchData;
exports.getConnection=getConnection; 

/*
// OLD METHOD
var ejs = require('ejs'); //importing module ejs
var mysql = require('mysql'); //importing module mysql
function getConnection() {
    var connection = mysql.createConnection({
        host: 'localhost', //host where mysql server is running
        user: 'root', //user for the mysql application
        password: '1234', //password for the mysql application
        database: 'ebay', //database name
        port: 3306 //port, it is 3306 by default for mysql
    });
    return connection;
}
//fetching the data from the sql server
function fetchData(callback, sqlQuery) {
    //console.log("\nSQL Query:" + sqlQuery);
    var connection = getConnection();
    connection.query(sqlQuery, function(err, rows, fields) {
        if (err) {
            console.log("ERROR: " + err.message);
        } else { // return err or result
            console.log("DB Results:" + rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}
exports.fetchData = fetchData;*/




	




