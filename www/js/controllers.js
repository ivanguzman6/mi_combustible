angular.module('mi_consumo.controllers', ['ionic', 'ionic.utils'])


.controller('registro_consumoCtrl', function($scope,$state,$localstorage,$window) 
{
	
	$scope.lista_consumo = [];
	
	$scope.consumo = {
		'id' : 0,
		'fecha_consumo' : "",
		'kilometraje' : 0,
		'monto_consumo': 0,
		'galones_consumo' : 0,
		'precio_galon' : 0
	};  
	
	
	
	/*Si ya esta creado el consumo en el localstorage, se carga a la lista*/
	if (localStorage.getItem("consumo") != null) 
	{
		$scope.lista_consumo = JSON.parse(localStorage.getItem("consumo"));
	}
	
	/*Funcion que convierte un valor en flotante*/
	$scope.parseFloat = function(value)
    {
        return parseFloat(value);
    };
	
	/*Calcula el precio segun el monto consumido  y la cantidad de galones*/
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
		var count = $scope.lista_consumo.length+1;

		/*Insertando a la lista el consumo actual*/
		$scope.lista_consumo.push({
			id: count,
			fecha_consumo : $scope.consumo.fecha_consumo,
			kilometraje : $scope.consumo.kilometraje,
			monto_consumo: $scope.consumo.monto_consumo,
			galones_consumo : $scope.consumo.galones_consumo,
			precio_galon : $scope.consumo.precio_galon});
	
		/*Almacenando la lista*/
		localStorage.setItem("consumo",JSON.stringify($scope.lista_consumo));
		alert("Datos Salvados ");
		
	 
		/*Insertando elemento en blanco*/
		$scope.consumo = {
			'id' : count+1,
			'fecha_consumo' : "",
			'kilometraje' : 0,
			'monto_consumo': 0,
			'galones_consumo' : 0,
			'precio_galon' : 0
		};  
	
		/*$scope.lista_consumo.push($scope.consumo);*/
		
	};
	
	$scope.redondear = function (number, precision)
	{
		precision = Math.abs(parseInt(precision)) || 0;
		var multiplier = Math.pow(10, precision);
		return (Math.round(number * multiplier) / multiplier);
	};
	
})

.controller('historial_consumoCtrl', function($scope,$state,$localstorage,$window) 
{

})




