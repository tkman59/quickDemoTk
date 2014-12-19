angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {

})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope,$cordovaOauth,$log,$http) {

      $scope.facebookInfo = null;
      $scope.feedData = null;
      $scope.facebookLogin = function() {
        $cordovaOauth.facebook("829518697092126", ["email", "read_stream",
          "user_website", "user_location", "user_relationships"]).then(function(result) {
          // results
          //access_token
          //expires_in
          $log.log("result:"+result);
          $scope.facebookInfo = result;

          $scope.getInfo();

        }, function(error) {
          // error
          $log.error("error:"+error);
          $scope.facebookInfo = error;
        });
      }

      $scope.getInfo= function() {
        $http.get("https://graph.facebook.com/v2.2/me",
            { params: { access_token: $scope.facebookInfo.access_token,
              fields: "id,email,name,gender,location,website,picture,relationship_status", format: "json" }}).then(
            function(result) {

          $scope.feedData = result.data;

        }, function(error) {
          alert("There was a problem getting your profile.  Check the logs for details.");
          $scope.feedData=error;
          console.log(error);
        });

      }

      $scope.googleInfo = null;
      //google identifiant
      //898502924503-cglkk092a6inlcluqs5srp61213kbbvs.apps.googleusercontent.com
      $scope.googleLogin = function(){
        $cordovaOauth.google("898502924503-cglkk092a6inlcluqs5srp61213kbbvs.apps.googleusercontent.com"
            ,["email"]).then(function(result) {
          // results
          //access_token
          //expires_in
          $log.log("result:"+result);
          $scope.googleInfo = result;
          $scope.getInfoGoogle();

        }, function(error) {
          // error
          $log.error("error:"+error);
          $scope.googleInfo = error;
        });
      }

      $scope.feedDataGoogle =null;

      $scope.getInfoGoogle= function() {
        $http.get("https://www.googleapis.com/oauth2/v1/userinfo",
            { params: { access_token: $scope.googleInfo.access_token,
              fields: "id,email,verified_email,name,given_name,family_name,picture,gender,locale", format: "json" }})
            .then(function(result) {

              $scope.feedDataGoogle = result.data;

            }, function(error) {
              alert("There was a problem getting your profile.  Check the logs for details.");
              $scope.feedDataGoogle=error;
              console.log(error);
            });

      }



});
