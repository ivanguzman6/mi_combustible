angular.module('mi_consumo.controllers', [])

.controller('registro_consumoCtrl', function($scope,$state) 
{
	$scope.fecha_consumo="";
	$scope.kilometraje="0";
	
	$scope.salvar  = function() 
	{
		//if ( === 'widescreen') 
		//{
		//  return '270px';
		//} else {
		//  return '360px';
		//}
		alert("Datos Salvados <"+$scope.kilometraje+">");
	};
})

