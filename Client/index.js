var myApp = angular.module('myApp',[]) //Creates a module called myApp

myApp.service('InputService', function($http) {

  var baseUrl = "http://localhost:8080/"

  this.saveWord = function (newWord) {
    var url = baseUrl + "saveCurrent"
    return $http.post(url, {"word": newWord})
  }

  this.getSaved = function () {
    var url = baseUrl + "getSaved"
    return $http.get(url)
  }
})

myApp.controller('MyController', function($scope, InputService) {//All of our services have been injected into our controller
  
  // These $scope guys will be available in the HTML
  $scope.words = []
  $scope.newWord = 'Input Response Here' 

  $scope.saveThisWord = function () {
    InputService.saveWord( $scope.newWord )
    .then(saveSuccess, error)    
  }

  $scope.getSavedWords = function() {
    InputService.getSaved()
    .then(loadSuccess, error)
  }
  
  function saveSuccess (json) {
    // console.log(json)
  }

  function loadSuccess (json) {
    $scope.words = json.data
  }

  function error (err) {
    console.log(err)
  }
})