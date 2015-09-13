angular.module('mi_consumo.controllers', ['ionic', 'ionic.utils'])


.controller('registro_consumoCtrl', function($scope,consumos) 
{

	// if($stateParams.id!=null)
		// alert("id="+$stateParams.id);
		
	$scope.consumos = [];
	$scope.consumos = null;
	
	 $scope.consumo = {
		'id' : 0,
		'fecha_consumo' : "",
		'kilometraje' : 0,
		'monto_consumo': 0,
		'galones_consumo' : 0,
		'precio_galon' : 0
	}; 

	$scope.actualizar_consumo = function() 
	{
		consumos.all().then(function(consumo)
		{
			  $scope.consumos = consumo;
		});
	}
	
	$scope.actualizar_consumo();	

	$scope.crear_consumo = function(consumo) 
	{
		/*autoincrementar el id*/
		consumos.add(consumo);
		$scope.actualizar_consumo();
	};

	$scope.qitar_consumo = function(consumo) 
	{
		consumos.remove(consumo);
		$scope.actualizar_consumo();
	};

	$scope.editar_consumo = function(consumo_original, consumo_editado) 
	{
		consumos.update(consumo_original, consumo_editado);
		$scope.actualizar_consumo();
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
	
	$scope.redondear = function (number, precision)
	{
		precision = Math.abs(parseInt(precision)) || 0;
		var multiplier = Math.pow(10, precision);
		return (Math.round(number * multiplier) / multiplier);
	};
	
})



.controller('historial_consumoCtrl', function($scope,consumos) 
{

	$scope.actualizar_consumo = function() 
	{
		consumos.all().then(function(consumo)
		{
			  $scope.consumos = consumo;
		});
	}
	
	$scope.actualizar_consumo();
	
	$scope.editar_registro = function(id) 
	{
		$state.go('app.editar_consumo',{id: id})
	};
	
	
})

.controller('editar_consumoCtrl', function($scope,$state,$stateParams) 
{
	$scope.lista_consumo = [];
	
	$scope.select = function(id) {
		var query = "SELECT id,fecha_consumo,kilometraje,monto_consumo,galones_consumo,precio_galon FROM consumo WHERE id = ?";
		$cordovaSQLite.execute(db, query, [id]).then(function(res) {
			if(res.rows.length > 0) {
				alert("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
			} else {
				alert("No results found");
			}
		}, function (err) {
			alert("Error: "+err);
		});
	};
		
	$scope.consumo = {
		'id' : 0,
		'fecha_consumo' : "",
		'kilometraje' : 0,
		'monto_consumo': 0,
		'galones_consumo' : 0,
		'precio_galon' : 0
	};  
	
	
})







