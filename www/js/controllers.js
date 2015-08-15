angular.module('mi_consumo.controllers', [])

.controller('registro_consumoCtrl', function($scope,$state) 
{
	$scope.consumo = {
		'fecha_consumo' : "",
		'kilometraje' : 0,
		'monto_consumo': 0,
		'galones_consumo' : 0,
		'precio_galon' : 0
	  };
  
	
	
	
	$scope.parseFloat = function(value)
    {
        return parseFloat(value);
    };
	
	$scope.calcular_precio = function()
	{
		if($scope.consumo.monto_consumo!=0 && $scope.consumo.galones_consumo!=0)
		{
			$scope.consumo.precio_galon = $scope.redondear($scope.consumo.monto_consumo/$scope.consumo.galones_consumo,2);
		}else
		{
			$scope.consumo.precio_galon = 0;
		};
	};
	
	$scope.salvar  = function() 
	{
		//if (!{{registro_consumo.$valid}}) 
		// {
		  // alert("Error validacion: "+$scope.consumo.kilometraje+">");
		// } 
		// else 
		// {
		  // alert("Datos Salvados <"+$scope.consumo.kilometraje+">");
		// };
		alert("Datos Salvados <"+$scope.consumo.kilometraje+">");
	};
	
	$scope.redondear = function (number, precision)
	{
		precision = Math.abs(parseInt(precision)) || 0;
		var multiplier = Math.pow(10, precision);
		return (Math.round(number * multiplier) / multiplier);
	};

})

