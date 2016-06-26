myApp.controller('MenuCtrl', function ($scope, $rootScope, $ionicPopup){

  console.log("menu controller initiate");

  $scope.logout = function()
  {
    // alert('logout');
    var confirmPopup = $ionicPopup.confirm({
      title: 'Sign out',
      template: 'Are you sure to sign out?',
      okType: 'button-calm'
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
        okType: 'button-calm'
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
            okType: 'button-calm'
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
            okType: 'button-calm'
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
          okType: 'button-calm'
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
            okType: 'button-calm'
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
          okType: 'button-calm'
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

myApp.controller('HomeCtrl', ['$rootScope', '$scope', '$location', 'Requests','Instant', '$cordovaGeolocation', '$ionicPopup',
  function($rootScope, $scope, $location, Requests, Instant, $cordovaGeolocation, $ionicPopup){

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


  //$scope.form_data.need = "";
  //$scope.form_data.pay = "";
  //$scope.form_data.message = "";

  // $scope.form_data.need = Instant.instant_value.select_value;
  console.log("1");
  console.log($scope.form_data.need);
  console.log("3");
  // console.log(Instant.instant_value.select_value);


  $scope.request = function(){

    var ref = Requests.child("requestData").push();
    var geoRef = Requests.child("geoData");
    var geoFire = new GeoFire(geoRef);

    var need = $scope.form_data.need;
    var pay = $scope.form_data.pay;
    var message = $scope.form_data.message;

    var time = moment().format();

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;

        ref.set({
          reqID: ref.key(),
          need: need,
          pay: pay,
          message: message,
          req_user_id: $scope.submit_data.data.getAuth().uid,
          //ans_user_id: '',
          lat: lat,
          long: long,
          time: time
        });

        geoFire.set(ref.key(), [lat, long]);
        //alert(need + " " + pay + " " + message);
        //console.log(need + " " + pay + " " + message);
      }, function(err) {
        // error
        var popupAlert_wrong = $ionicPopup.alert({
          title: 'Location Service Failure',
          template: 'We cannot get current location',
          okType: 'button-calm'
        });
      });

    //console.log("id " + $rootScope.uid);

    //Requests.child("users").child($rootScope.uid).update({
    //  temp:"sss"
    //});

  $scope.form_data.need = "";
  $scope.form_data.pay = "";
  $scope.form_data.message = "";

  $location.path( '/waiting' );

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

myApp.controller('WaveCtrl', ['$scope', '$cordovaGeolocation', 'WaveData', 'Requests',
 function($scope, $cordovaGeolocation, WaveData, Requests){

  $scope.current_user = {
    latitude: '',
    longitude: ''
  };

  $scope.users_data = [];

  $scope.$on('$ionicView.loaded', function() {
     $scope.doRefresh();
     //console.log("refresh on load...");
  });

  var geoFire = new GeoFire(Requests.child("geoData"));

  $scope.doRefresh = function(){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;

      $scope.current_user = {
        latitude: lat,
        longitude: long
      };

      $scope.users_data = [];
      //alert("lat " + lat + " long " + long);

      /* query based on geo location from firebase */
      var geoQuery;
      var radius = 1000;

      geoQuery = geoFire.query({
        center: [lat, long],
        radius: radius
      });

      geoQuery.on("key_entered", function(key, location, distance) {
        console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");

        Requests.child("requestData").child(key).once("value", function(snap){
          console.log(snap.child("ans_user_id").exists() + " " + snap.key());
        });

        //var tempRef = Requests.child("requestData").child(key).orderByChild("ans_user_id").equalTo("1234").on("value", function(snap){


            //console.log(snap.key() + " anser id ...");


          //var temp = Requests.child("requestData").child(snap.key()).on("value", function(snapshot){
          //  var date1 = moment(snapshot.val().time);
          //  var date2 = moment().format();
          //  $scope.time = date1.from(date1);
          //
          //  //console.log(snapshot.val().need);
          //  var tempObj = {
          //    request: key,
          //    need: snapshot.val().need,
          //    pay: snapshot.val().pay,
          //    message: snapshot.val().message,
          //    time: $scope.time
          //  };
          //
          //  $scope.users_data.push(tempObj);
          //});
        //});

      });

      /***********************************************/

    }, function(err) {
      var popupAlert_wrong = $ionicPopup.alert({
        title: 'Location Service Failure',
        template: 'We cannot get current location',
        okType: 'button-calm'
      });
    }).finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });

  };

  $scope.test = function(){
    //alert('hah');

    //var posOptions = {timeout: 10000, enableHighAccuracy: false};
    //$cordovaGeolocation
    //.getCurrentPosition(posOptions)
    //.then(function (position) {
    //  var lat  = position.coords.latitude;
    //  var long = position.coords.longitude;
    //
    //    //alert("lat " + lat + " long " + long);
    //  }, function(err) {
    //    // error
    //    var popupAlert_wrong = $ionicPopup.alert({
    //      title: 'Location Service Failure',
    //      template: 'We cannot get current location',
    //      okType: 'button-calm'
    //    });
    //  });

  };

  //$scope.users_data = [{
  //  request: '1',
  //  need: 'I need move some boxes',
  //  pay: '10'
  //},
  //{
  //  request: '2',
  //  need: 'I need watch movie',
  //  pay: '20'
  //},
  //{
  //  request: '3',
  //  need: 'I need have a drink',
  //  pay: '30'
  //}];

  $scope.select = function(index){
    WaveData.data = $scope.users_data[index];
    // alert(WaveData.data.need);
  }

}]);

myApp.controller('WaveDetailCtrl', ['$scope', 'Requests', '$rootScope', 'WaveData',
  function($scope, Requests, $rootScope, WaveData){

  // alert("123");
  console.log("wave detail controller initiated..." + $rootScope.uid);

  // var ref = Requests.child('users').child($rootScope.uid);


  // var ref = Requests.child('users').child($rootScope.uid);
  $scope.request_data = {
    need: WaveData.data.need,
    pay: WaveData.data.pay,
    message: WaveData.data.message
  };

 // alert($scope.request_data.need);

 $scope.answer = function()
 {

  ref.update({
    ans_user_id: $rootScope.uid
  });

  alert("fdsfa");
}
}]);



myApp.controller('WaitCtrl', ['$scope', '$location',
  function($scope, $location){
    // alert('1');
  $scope.clickToReturn = function(){
    $location.path('/home')
  };
}]);

