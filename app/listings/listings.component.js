angular.module('listings', []).component('listings', {
  templateUrl: 'listings/listings.template.html',
  controller: function ListingsController($http) {
    $http.get('/api/realtor', function(res) {

    }, function(err) {

    });

  }
});
