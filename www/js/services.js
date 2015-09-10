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
    return DBA.query("SELECT id,fecha_consumo,kilometraje,monto_consumo,galones_consumo,precio_galon FROM consumos")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(memberId) {
    var parameters = [memberId];
    return DBA.query("SELECT id,fecha_consumo,kilometraje,monto_consumo,galones_consumo,precio_galon FROM consumos WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(member) {
    var parameters = [member.id, member.name];
    return DBA.query("INSERT INTO consumos (id,fecha_consumo,kilometraje,monto_consumo,galones_consumo,precio_galon) VALUES (?,?,?,?,?,?)", parameters);
  }

  self.remove = function(member) {
    var parameters = [member.id];
    return DBA.query("DELETE FROM consumos WHERE id = (?)", parameters);
  }

  self.update = function(origMember, editMember) {
    var parameters = [editMember.id, editMember.name, origMember.id];
    return DBA.query("UPDATE consumos SET fecha_consumo=(?),kilometraje=(?),monto_consumo=(?),galones_consumo=(?),precio_galon=(?) WHERE id = (?)", parameters);
  }

  return self;
})
