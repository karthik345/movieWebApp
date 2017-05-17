// ROUTES
movieApp.config(['$routeProvider', function ($routeProvider) { 
   
    $routeProvider
        
    .when('/', {
        templateUrl:'states/user.htm',
        controller: 'userContrl'
    })
    
    .when('/movieList/:id', {
        templateUrl: 'states/movieList.htm',
        controller: 'movieListCntrl'
    })
    
    .when('/search/', {
        templateUrl: 'states/search.htm',
        controller: 'searchContrl'
    })
    
    
     .when('/createList/', {
        templateUrl: 'states/createList.htm',
        controller: 'createListContrl'
    })
    
}]);