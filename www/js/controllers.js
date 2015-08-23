angular.module('mi_consumo.controllers', ['ionic', 'ionic.utils'])


.controller('registro_consumoCtrl', function($scope,$state,$localstorage,$window,$stateParams) 
{

	if($stateParams.id!=null)
		alert("id="+$stateParams.id);
		
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
		
		$scope.insert = function(firstname, lastname) {
			var query = "INSERT INTO consumo (id,fecha_consumo,kilometraje,monto_consumo,galones_consumo,precio_galon) VALUES (?,?,?,?,?,?)";
			$cordovaSQLite.execute(db, query, [	$scope.consumo.id,
												$scope.consumo.fecha_consumo,
												$scope.consumo.kilometraje,
												$scope.consumo.monto_consumo,
												$scope.consumo.galones_consumo,
												$scope.consumo.precio_galon]).then(function(res) {
			alert("Datos Insertado. ID="+$scope.consumo.id);	
			}, function (err) {
				alert("Error: "+err);
			});
		}

	};
	
	$scope.redondear = function (number, precision)
	{
		precision = Math.abs(parseInt(precision)) || 0;
		var multiplier = Math.pow(10, precision);
		return (Math.round(number * multiplier) / multiplier);
	};
	
})

.controller('historial_consumoCtrl', function($scope,$state) 
{
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







