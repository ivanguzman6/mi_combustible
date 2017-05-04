angular.module('mi_consumo.services', [])


angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
	set: function(key, value) {
	  $window.localStorage[key] = value;
	},
	get: function(key, defaultValue) {
	  return $window.localStorage[key] || defaultValue;
	},
	setObject: function(key, value) {
	  $window.localStorage[key] = JSON.stringify(value);
	},
	getObject: function(key) {
	  return JSON.parse($window.localStorage[key] || '{}');
	}
  }
}])


.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;
	
  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();
	
    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
		
          q.resolve(result);
        }, function (error) {
		  alert("Error");
          console.warn('Se produjo un error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('consumos', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
	 var parameters = [0];
    return DBA.query("SELECT id,fecha_consumo,kilometraje,monto_consumo,galones_consumo,precio_galon FROM consumos where id>= (?)",parameters)
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(consumo_id) {
    var parameters = [consumo_id];
    return DBA.query("SELECT id,fecha_consumo,kilometraje,monto_consumo,galones_consumo,precio_galon FROM consumos WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(consumo) {
    var parameters = [consumo.fecha_consumo,consumo.kilometraje,consumo.monto_consumo,consumo.galones_consumo,consumo.precio_galon];
    return DBA.query("INSERT INTO consumos (fecha_consumo,kilometraje,monto_consumo,galones_consumo,precio_galon) VALUES (?,?,?,?,?)", parameters)
	window.alert("sometext");
  }

  self.remove = function(consumo) {
    var parameters = [consumo.id];
    return DBA.query("DELETE FROM consumos WHERE id = (?)", parameters);
  }

  self.update = function(consumo_original, consumo_editado) {
    var parameters = [consumo_editado.fecha_consumo, consumo_editado.kilometraje, consumo_editado.monto_consumo,consumo_editado.galones_consumo,consumo_editado.precio_galon, consumo_original.id];
    return DBA.query("UPDATE consumos SET fecha_consumo=(?),kilometraje=(?),monto_consumo=(?),galones_consumo=(?),precio_galon=(?) WHERE id = (?)", parameters);
  }

  return self;
})
