angular.module('listings', []).component('listings', {
  templateUrl: 'listings/listings.template.html',
  controller: function ListingsController($scope, $http) {
    $scope.listings = [];
    $scope.info = {};
    $scope.info.zip = '03855';


    $scope.refreshListing = function() {
      $http.get('/api/realtor?zip=' + $scope.info.zip).then(function(res) {
        console.log(res);
        $scope.listings = res.data;
      }, function(err) {
        console.log(err);
      });
    }

    $scope.refreshListing();
  }
});
