angular.module('mi_consumo.controllers', ['ionic', 'ionic.utils'])

.controller('registro_consumoCtrl', function($scope,$state,$localstorage) 
{
	$scope.consumo = {
		'fecha_consumo' : "",
		'kilometraje' : 0,
		'monto_consumo': 0,
		'galones_consumo' : 0,
		'precio_galon' : 0
	  };
  
	$scope.consumo = $localstorage.getObject('consumo');
	
	
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
		$localstorage.setObject('consumo',$scope.consumo);
		alert("Datos Salvados <"+$scope.consumo.kilometraje+">");
		
	};
	
	$scope.redondear = function (number, precision)
	{
		precision = Math.abs(parseInt(precision)) || 0;
		var multiplier = Math.pow(10, precision);
		return (Math.round(number * multiplier) / multiplier);
	};
	
})

/*$localstorage.setObject('consumo',$scope.consumo);*/
	
	 /* .run(function($,$localstorage) {

		$localstorage.set('name', 'Max');
		console.log($localstorage.get('name'));
		$localstorage.setObject('consumo',$scope.consumo);
		
		 $localstorage.setObject('consumo', {
				name: 'Thoughts',
				text: 'Today was a good day'
			}); 

		$scope.consumo = $localstorage.getObject('consumo');
		console.log(consumo);
	});  */





