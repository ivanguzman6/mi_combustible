angular.module('mi_consumo.controllers', ['ionic', 'ionic.utils'])


.controller('registro_consumoCtrl', function($scope,consumos,$state) 
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
	
	$scope.convertDate = function(inputFormat) {
	  function pad(s) { return (s < 10) ? '0' + s : s; }
	  var d = new Date(inputFormat);
	  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
	}
	
	$scope.crear_consumo = function(consumo) 
	{
		consumo.fecha_consumo=$scope.convertDate(consumo.fecha_consumo);
		consumos.add(consumo);
		$scope.actualizar_consumo();
		$state.go('app.historial_consumo')
	};

	
	
	$scope.quitar_consumo = function(consumo) 
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



.controller('historial_consumoCtrl', function($scope,consumos,$state) 
{
	$scope.consumos = [];
	$scope.consumos = null;
	
	$scope.actualizar_consumo = function() 
	{
		consumos.all().then(function(consumo)
		{
			  $scope.consumos = consumo;
		});
	};
	
	$scope.actualizar_consumo();
	
	$scope.editar_registro = function(vid){
		$state.go('app.editar_consumo',{id: vid})
	};
	
	$scope.quitar_consumo = function(consumo) 
	{
		alert("ID a borrar="+consumo.id);
		consumos.remove(consumo);
		$scope.actualizar_consumo();
	};
	
	
})

.controller('editar_consumoCtrl', function($scope,$state,$ionicPlatform,$stateParams,consumos) 
{
	var id=0;
	$scope.fecha_consumo_dia = 0;
	$scope.fecha_consumo_mes = 0;
	$scope.fecha_consumo_ano = 0;
	
	$ionicPlatform.ready(function() {
		id =  $stateParams.id;
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
			consumos.get(id).then(function(consumo)
			{
				console.log(consumo.id);
				$scope.consumo = consumo;
				
			});
		};
		
		
		$scope.actualizar_consumo();	
	
	});
	
		
})







