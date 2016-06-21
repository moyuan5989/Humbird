myApp.controller('MenuCtrl', function ($scope, $rootScope, $ionicPopup){

  console.log("menu controller initiate");

  $scope.logout = function()
  {
    // alert('logout');
    var confirmPopup = $ionicPopup.confirm({
      title: 'Sign out',
      template: 'Are you sure to sign out?',
      okType: 'button-balanced'
    });

    confirmPopup.then(function(res) {
      if(res)
      {
        $rootScope.logout();
      }
      else
      {
        console.log('log out cancelled');
      }
    });

  }
});

myApp.controller('WelcomeCtrl', function (Auth, Requests, $scope, $ionicModal, $firebaseAuth, $location, $ionicLoading, $ionicPopup){

  console.log("welcome controller initiated");

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.toSignin = function() {
    $location.path('/login');
  };

  $scope.createUser = function (user) {

    console.log("Create User Function called");

    var regex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.edu)$/;
    var isvalidEmail = regex.test(user.email);

    if(!isvalidEmail)
    {
      var popupAlert_wrong = $ionicPopup.alert({
        title: 'Wrong email format',
        template: 'We only accept emails that end with edu',
        okType: 'button-balanced'
      });

      //alert("Please enter email and password both");
      popupAlert_wrong.then(function(res){
        console.log("Wrong email format.");
      });
    }
    else
    {
      if (user && user.email && user.password && user.firstname && user.lastname)
      {
        $ionicLoading.show({
          template: 'Signing Up...'
        });

        Auth.$createUser({
          email: user.email,
          password: user.password
        }).then(function (userData) {

          var popupAlert_success = $ionicPopup.alert({
            title: 'Success',
            template: 'User created successfully!',
            okType: 'button-balanced'
          });

          //alert("User created successfully!");
          Requests.child("users").child(userData.uid).set({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
          });
          $ionicLoading.hide();
          $scope.modal.hide();
        }).catch(function (error) {

          var popupAlert_error = $ionicPopup.alert({
            title: 'Error',
            template: error,
            okType: 'button-balanced'
          });

          //alert("Error: " + error);
          $ionicLoading.hide();
        });
      }
      else
      {
        var popupAlert_missing = $ionicPopup.alert({
          title: 'Missing details',
          template: 'Please fill all details.',
          okType: 'button-balanced'
        });

        //alert("Please enter email and password both");
        popupAlert_missing.then(function(res){
          console.log("Please fill all details");
        });

        //alert("Please fill all details");
      }
    }
  }

});


myApp.controller('LoginCtrl',
  function (Auth, Requests, $scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, $ionicPopup) {

  console.log('Login Controller Initialized');

  $scope.goback = function() {
    $state.go('welcome');
  };

  $scope.signIn = function (user) {

    if (user && user.email && user.pwdForLogin) {
      $ionicLoading.show({
        template: 'Signing In...'
      });
      Auth.$authWithPassword({
        email: user.email,
        password: user.pwdForLogin
      }).then(function (authData) {
        console.log("Logged in as:" + authData.uid);
        Requests.child("users").child(authData.uid).once('value', function (snapshot) {
          var val = snapshot.val();
          // To Update AngularJS $scope either use $apply or $timeout
          $scope.$apply(function () {
            $rootScope.firstname = val.firstname;
            $rootScope.lastname = val.lastname;
            $rootScope.uid = authData.uid;
          });
        });
        $ionicLoading.hide();
        $state.go('menu.home');
      }).catch(function (error) {

        var popopAlert_wrong = $ionicPopup.alert({
          title: 'Wrong email and password combination',
          template: 'Please fill correct email and password combination.',
          okType: 'button-balanced'
        });

        popopAlert_wrong.then(function(res){
          console.log("Authentication failed:" + error.message);
        });
        //alert("Authentication failed:" + error.message);
        $ionicLoading.hide();
      });
    }
    else
    {
      var popupAlert_missing = $ionicPopup.alert({
        title: 'Missing email or password',
        template: 'Please fill email and password both.',
        okType: 'button-balanced'
      });

      //alert("Please enter email and password both");
      popupAlert_missing.then(function(res){
        console.log("Please enter email and password both");
      });
    }
  }

  $scope.toForgetPwd = function(user)
  {
    $state.go('forgetPwd');
  }

});

myApp.controller('forgetPwdCtrl', function($scope, Requests, $state){

  console.log("forget password controller initiate");

  $scope.goback = function() {
    $state.go('login');
  };

  $scope.reset = function(user)
  {
    Requests.resetPassword({
      email : user.email
    }, function(error) {
      if (error === null) {
        console.log("Password reset email sent successfully");
      } else {
        console.log("Error sending password reset email:", error);
      }
    });
  }

});

myApp.controller('HomeCtrl', ['$rootScope', '$scope', '$location', 'Requests','Instant', 
  function($rootScope, $scope, $location, Requests, Instant){

  

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
  

   $scope.form_data.need = "";
    $scope.form_data.pay = "";
    $scope.form_data.message = "";

  // $scope.form_data.need = Instant.instant_value.select_value;
  console.log("1");
  console.log($scope.form_data.need);
  console.log("3");
  // console.log(Instant.instant_value.select_value);
    

$scope.request = function(){

    var ref = Requests.child("requestData").push();

    ref.set({
      reqID: ref.key(),
      need: $scope.form_data.need,
      pay: $scope.form_data.pay,
      message: $scope.form_data.message,
      req_user_id: $scope.submit_data.data.getAuth().uid,
      ans_user_id: ''
    });

    //console.log("id " + $rootScope.uid);

    //Requests.child("users").child($rootScope.uid).update({
    //  temp:"sss"
    //});

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