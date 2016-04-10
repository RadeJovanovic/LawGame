var myApp = angular.module('myApp',[])

myApp.service('HistoryService', function($http) {

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

myApp.service('GifService', function($http) {

  var baseUrl = "https://api.giphy.com/v1/gifs/"
  var apiKey = "dc6zaTOxFJmzC"

  this.getGifs = function (query) { //Takes a search query
   
      //This is our gif service that gets gifs
      var url = baseUrl + "search?q=" + query + "&api_key=" + apiKey //We search the giffy website for gifs that start with the query, with the API key, 
    //when you are getting something from a server you use a GET request, when you are posting to a server it is a POST request
    //Everything you type into the search bar is a get request, whilst Posts are always in the background in the javascript
    
    return $http.get(url)
  }

  this.getReactionGifs = function (query) {
    var url = baseUrl + "search?q=" + query + "+reaction&api_key=" + apiKey
    return $http.get(url)
  }

  this.getFunnyGifs = function (query) {
    var url = baseUrl + "search?q=" + query + "+funny&api_key=" + apiKey
    return $http.get(url)
  }
})

myApp.controller('MyController', function($scope, GifService, HistoryService) {//All of our services have been injected into our controller
  
  // These $scope guys will be available in the HTML
  $scope.words = []
  $scope.newWord = 'cat'
  $scope.gifUrl = '' 

  $scope.saveThisWord = function () {
    HistoryService.saveWord( $scope.newWord )
    .then(saveSuccess, error)    
  }

  $scope.getSavedWords = function() {
    HistoryService.getSaved()
    .then(loadSuccess, error)
  }
  
  $scope.showGifs = function($event) { //$event is the thing that has just been clicked
    //Every time you add a new service, you need to add it as an input parameter in your controller!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    GifService.getGifs( $event.currentTarget.innerHTML )
    .then(gifSuccess, error)
  }

  function saveSuccess (json) {
    // console.log(json)
  }

  function loadSuccess (json) {
    $scope.words = json.data
  }

  function gifSuccess (json) {
    if (json.data.data[0]) { //If there is a gif in the json, then set the image url to the image url of that bunch of gifs
      $scope.gifUrl = json.data.data[0].images.fixed_height.url      
    } else {
      $scope.gifUrl = "http://www.dailyrounds.org/blog/wp-content/uploads/2015/10/i-dont-know.jpg"
    }
  }

  function error (err) {
    console.log(err)
  }
})