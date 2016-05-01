//index.js is all about angular, with the aim of making a single page function. Express is used in server.js to make multiple pages work.

var myApp = angular.module('myApp', [])

myApp.service('sceneUpdate', function($http) {

    var baseUrl = "http://localhost:8080/"

    this.saveWord = function(newScene) {
        var url = baseUrl + "saveCurrent"
        return $http.post(url, {
            "sceneID": newScene.sceneID,
            "sceneURL": newScene.sceneURL
        })
    }

    this.getSaved = function() {
        var url = baseUrl + "getSaved"
        return $http.get(url)
    }
})

myApp.controller('sceneEditController', function($scope, sceneUpdate) {

    // These $scope guys will be available in the HTML
    $scope.scenes = []
    $scope.newScene.sceneID = 'sceneID'
    $scope.newScene.sceneURL = 'sceneURL'
    
    $scope.saveThisScene = function() {
        sceneUpdate.saveWord($scope.newScene)
            .then(saveSuccess, error)
    }

    $scope.getSavedScenes = function() {
        sceneUpdate.getSaved()
            .then(loadSuccess, error)
    }

    function saveSuccess(json) {
        console.log(json)
    }

    function loadSuccess(json) {
        $scope.scenes = json.data
    }

    function error(err) {
        console.log(err)
    }
})