myApp.factory('Requests', function($firebaseArray){

	var reqRef = new Firebase(firebaseUrl);
    // return $firebaseArray(reqRef);
    return reqRef;

  })

  .factory("Auth", ["$firebaseAuth", "$rootScope",
    function ($firebaseAuth, $rootScope) {
      var ref = new Firebase(firebaseUrl);
      return $firebaseAuth(ref);
    }]);

myApp.service('Instant', function(){



	var instant_value = {select_value: ""};

	return instant_value;

});

myApp.service('WaveData', function(){
	var data = {};

	return data;
});

myApp.service('HistoryData', function(){
  var data = {};

  return data;
});

myApp.service('WaitData', function(){
	var data = {};

	return data;
});
