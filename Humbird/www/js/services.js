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
	
	// var self = this;

	// this.select_value = "";

	// this.getSelect = function(){
	// 	return self.select_value.length;
	// };

	// var self = this;
 //    this.name = 'John Doe';
    
 //    this.namelength = function() {
      
 //        return self.name.length;
        
 //    };

	var instant_value = {select_value: ""};

	return instant_value;

});