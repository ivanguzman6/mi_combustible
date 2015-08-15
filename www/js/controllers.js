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
  
	$scope.fecha_consumo="";
	precio_galon=$scope.monto_consumo/$scope.galones_consumo;
	
	$scope.salvar  = function() 
	{
		// if (!{{registro_consumo.$valid}}) 
		// {
		  // alert("Error validacion: "+$scope.consumo.kilometraje+">");
		// } 
		// else 
		// {
		  // alert("Datos Salvados <"+$scope.consumo.kilometraje+">");
		// };
		alert("Datos Salvados <"+$scope.consumo.kilometraje+">");
	};
})

