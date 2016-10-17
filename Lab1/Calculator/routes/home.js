/**
 * New node file
 */

exports.homepage = function(req, res){
  res.render('homepage', { title: 'Calculator' });
};


exports.checkLocationsFun = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var source = req.param("source");
	var destination = req.param("destination");
	var opcode = req.param("opcode");
	
	console.log('source is ' + source);
	console.log('source is ' + destination);
	console.log('opcode is ' + opcode);
		
	var result, json_responses;
	
	if(opcode=="ADD")
		{
		result=source + destination;
		}
	else if(opcode=="SUB")
		{
		result=source - destination;
		}
	else if(opcode=="MUL")
		{
		result=source * destination;
		}
	else if(opcode=="DIV")
		{
		result=source / destination;
		}
	else 
		{
		result='UNDEFINED';
		}
	
	console.log('result is ' + result);
	json_responses = {"statusCode" : result};
	res.send(json_responses)
		
	
};	
