myApp.factory('Requests', function($firebaseArray){
	
	var reqRef = new Firebase('https://everythingdata.firebaseio.com/');
	// return $firebaseArray(reqRef);
	return reqRef;
		
});

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