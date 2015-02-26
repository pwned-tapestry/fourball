angular.module('app.home', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.home', {
    url: '/home',
    views: {
      'home-tab': {
        templateUrl: 'app/home/home.html'
      }
    }
  });
})

.controller('MapController', function($scope, $ionicLoading) {
 // https://blog.nraboy.com/2014/10/implement-google-maps-using-ionicframework/
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
            // 37.784069, -122.407974
            var Location1 = new google.maps.Marker({
                position: new google.maps.LatLng(37.784069, -122.407974),
                map: map,
                title: "Marker1"
            });
            // 37.782289, -122.410742
            var Location2 = new google.maps.Marker({
                position: new google.maps.LatLng(37.782289, -122.410742),
                map: map,
                title: "Marker2"
            });

        });
 
        $scope.map = map;
    });
 
});