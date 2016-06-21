// myApp.controller('MenuCtrl', function($scope, $ionicModal, $timeout) {

//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   // Form data for the login modal
//   $scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// });

myApp.controller('HomeCtrl', ['$scope', '$location', 'Requests','Instant', 
  function($scope, $location, Requests, Instant){

  

  // var ref = new Firebase('https://everythingdata.firebaseio.com/') 


$scope.Instant = Instant;


  $scope.submit_data = {
    data: Requests
  };

  $scope.form_data = {
    need: '',
    pay: '',
    message: ''
  };
  // alert($scope.form_data.need);
  $scope.instant = function(){
    
    $location.path( '/menu/instant' );
    // $scope.form_data.need = Instant.instant_value.select_value;
     


  };
  // $scope.$apply(function(){

  //   $scope.form_data.need = Instant.instant_value.select_value;
  // });

  $scope.$watch('Instant.select_value', function(newVal, oldVal, scope) {
    if (newVal){
      console.log("5");
    console.log(Instant.select_value);
        $scope.form_data.need = Instant.select_value;
        console.log("4");
    }
    
        // console.log(Instant.instant_value.select_value);
        // console.log("Instant.select_value");
        // console.log(Instant.select_value);
    });

  $scope.clickTest = function(){
    alert(Instant.select_value);
    $scope.form_data.need = Instant.select_value;

  }
  

  // $scope.form_data.need = Instant.instant_value.select_value;
  console.log("1");
  console.log($scope.form_data.need);
  console.log("3");
  // console.log(Instant.instant_value.select_value);
    

  $scope.request = function(){

 
    
    $scope.submit_data.data.set({
  requestData: {
    need: $scope.form_data.need,
      pay: $scope.form_data.pay,
      message: $scope.form_data.message
  }
});

    $scope.form_data.need = "";
    $scope.form_data.pay = "";
    $scope.form_data.message = "";

    $location.path( '/menu/payment' );
  
  };
  
}]);

myApp.controller('PayCtrl', ['$scope', '$location',
  function($scope, $location){

    $scope.charge = function(){
      $location.path( '/menu/home' );
    }

  }]);

myApp.controller('InstantCtrl', ['$scope', '$location', 'Instant',
  function($scope, $location, Instant){

    // $scope.trim = function(s){
    //   return s.replace("o", "");
    // };
    $scope.select_need = "";
    // alert(Instant.name);
    $scope.select = function(msg, $event){
      // alert('sdsd');
       var select_item = event.target.innerHTML || "";
       $scope.select_need = select_item.trim();
       $location.path( '/menu/home' );
        console.log($scope.select_need);
        // console.log(Instant.select_value);
        
        // Instant.select_value = $scope.select_need;
        // console.log(Instant.select_value);
        
    };

$scope.$watch('select_need', function() {
          console.log($scope.select_need);
          Instant.select_value = $scope.select_need;
          console.log(Instant.select_value);
    });

}]);


myApp.controller('ProfileCtrl', ['$scope', '$cordovaCamera', 
  function($scope, $cordovaCamera){

    // hide the status bar using the StatusBar plugin
    // StatusBar.hide();
    $scope.imgURI = "img/user_profile.jpg"
    $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                };
                
               
  
}]);