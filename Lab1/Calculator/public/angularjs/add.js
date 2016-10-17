
var itenary = angular.module('itenary', []);

	
itenary.controller('itenary-controller', function($scope, $http) {
	
	$scope.notEmpty = false;
	$scope.someError = false;
	
	$scope.addDestSrc = function(opcode) {
		console.log('source is ' + $scope.source);
		console.log('source is ' + $scope.destination);
		console.log('opcode is ' + opcode);
		
		if($scope.source!=undefined && $scope.destination!=undefined && opcode!=undefined)
		{
		$http({
			method : "POST",
			url : '/checkLocations',
			data : {
				"source" : $scope.source,
				"destination" : $scope.destination,
				"opcode" : opcode
			}
		}).success(function(data) {
			
			
			
			if(data.statusCode==null && $scope.destination==0)
				{
				$scope.notEmpty = false;
				$scope.someError = true;
				$scope.result = 'Divide by zero is not permitted !';
				console.log('result is ' + $scope.result);
				console.log('DIVIDE BY ZERO NOT PERMITTED');
				}
			else
				{		
				$scope.notEmpty = true;
				$scope.someError = false;
				$scope.result = data.statusCode;
				console.log('result is ' + $scope.result);
				}

			
		}).error(function(error) {
			//$scope.addToTable = true;
			//$scope.sameEntry = true;
		});
		}
		else
		{
		$scope.notEmpty = false;
		$scope.someError = true;	
		$scope.result = "Operand fields shouldn't be left empty !";	
		}
	};
	
	/*$scope.sourceValue = function(place) {
	console.log('source is ' + place);	
	$scope.source=place;	
	};
	
	$scope.destValue = function(place) {
	console.log('destination is ' + place);	
	$scope.destination=place;	
	};
	
	$scope.places = [];
	
	$scope.addRow = function(){		
		$scope.places.push({ 'source': $scope.source, 'destination': $scope.destination});
		$scope.source='';
		$scope.destination='';
		
	};*/
});
