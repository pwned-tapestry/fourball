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
 
        var infowindow = new google.maps.InfoWindow();

        var bounds = new google.maps.LatLngBounds();


        navigator.geolocation.getCurrentPosition(function(pos) {
            console.log("bounds : ", bounds);

            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                title: "My Location"
            });

            // "Locations Array, formatted from http request";
            // 
            // name, description, location, address
            var coursesTriplet = [
              {
                name: "The Chancellor",
                description: "I have no weaknesses.",
                location: [37.788309, -122.410709]
              },
              {
                name: "The Garz",
                description: "The Garz",
                location: [37.784069, -122.407974]
              },
              {
                name: "Karim",
                description: "DON'T BE A BABY :)",
                location: [37.782289, -122.410742] 
              }
            ];

            var mapPoints = [];
            for (var i = 0; i < coursesTriplet.length; i++){
              var newPoint = new google.maps.Marker({
                  position: new google.maps.LatLng(coursesTriplet[i].location[0], coursesTriplet[i].location[1]),
                  map: map,
                  icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  title: coursesTriplet[i].name
              });            

              google.maps.event.addListener(newPoint, 'click', (function(marker, i) {
                return function() {
                  infowindow.setContent(coursesTriplet[i].name +" : " + coursesTriplet[i].description);
                  infowindow.open(map, marker);
                }
              })(newPoint, i));

              bounds.extend(newPoint.position);

              mapPoints.push(newPoint);
            }
            map.fitBounds(bounds);
        });
        $scope.map = map;
    });
 
});