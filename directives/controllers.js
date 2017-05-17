movieApp.controller('userContrl', ['$scope', 'userService', 'mainInfo', function($scope, userService, mainInfo){
    
    $scope.movieLists = '';
    
    mainInfo.success(function(data) { 
    $scope.movieLists = data;
    userService.movieList =  $scope.movieLists;  
    });
    
    $scope.numMovies = function(mlist){
        return mlist.movies.length;
        
    } 
        
     $scope.avgRating = function(movies){
            $scope.val = 0; 
          movies.forEach(function(value, key) {
            $scope.val += parseInt(value.uRate);
     });
        
         
    
        return ($scope.val/movies.length);
         
         
    } 
     
    
    
    /*$scope.$watch('username', function() {createListContrl
       userService.username = $scope.username; 
    });
    */
}]);



movieApp.controller('createListContrl', ['$scope', 'userService', 'movieListService', function($scope, userService, movieListService){
    
    $scope.title = '';
    $scope.results = '';
    $scope.add = function(){
         $scope.movieList = { 
                        "name": $scope.title, 
                        "listId": userService.movieList.length, 
                        "movies": [ ]
                    }
        
        userService.movieList.push($scope.movieList);
         $scope.results = true;   
    }
}]);


movieApp.controller('searchContrl', ['$scope', '$location', '$http', '$filter', 'userService', function($scope, $location, $http, $filter, userService){
    $scope.saveMovieDisp = false;
    $scope.saveDispOk1 = false;
    $scope.saveDispOk2 = false;
    $scope.mnlist = userService.movieList;
     $scope.dropDownRsltAry = [];
     $scope.dropDownAry = [];
     $scope.mnlist.forEach(function(value, key) {
        $scope.dropDownAry.push({
                id:value.listId, name:value.name
        });    

     });
    console.log($scope.mnlist);
    $scope.search = "";
    $scope.rating = 0;
    $scope.maxRating = 5;
    $scope.userRating = 3;
     $scope.getSelectedRating = function (rating) {
        console.log(rating);
         $scope.userRating = rating;
    }
     
    $scope.savelist = function(){
        $scope.dropDownRsltAry.forEach(function(value, key){
                        console.log(value);
            console.log($scope.userRating);
            console.log($scope.movie.imdbID);
            console.log(userService.movieList);
            $scope.list = userService.movieList[value.id];
            console.log($scope.list);  
            $scope.list.movies.push({"id": $scope.movie.imdbID,
                                    "uRate": $scope.userRating})
            $scope.saveDispOk1 = true;
       })
    }
     
     $scope.$watch('search', function() {
       userService.search = $scope.search; 
    });
    $scope.movies = [];
    $scope.displayList = function(){
        $scope.saveMovieDisp = true;
    }
    $scope.submit = function () {
        $scope.loading = true;
        $scope.error = false;
        $scope.saveDispOk1 = false;
        $scope.saveMovieDisp = false;
        $http.get('http://www.omdbapi.com/?t=' + $scope.search)
               .success(function (data, status, headers, config) {
                   $scope.movie = data;
                   $scope.results = true;
                   $scope.error = false;
                   $scope.loading = false;
                    $scope.movies.push($scope.movie);
                    console.log(JSON.stringify($scope.movies));
                    var rating = {
                                    current: 3,
                                    max: 5
                                };
                    
                    $scope.ratings = {rating};
                   if ($scope.movie.Poster === "N/A") {
                       $scope.movie.Poster = "http://placehold.it/350x450/FFF/EEE";
                   }

                   if ($scope.movie.Response === "False") {
                       $scope.results = false;
                       $scope.error = true;
                   }
               })
               .error(function (data, status, headers, config) {
                   $scope.results = false;
                   $scope.loading = false;
                   $scope.error = true;
               });
    
}
   

}]);


movieApp.controller('movieListCntrl',['$scope', '$filter', '$routeParams', 'userService', 'movieService', function($scope, $filter, $routeParams, userService, movieService) {
    
    $scope.resultMovies = [];
    $scope.id = $routeParams.id;
    $scope.movies = $filter('filter')(userService.movieList, {listId: $scope.id})[0].movies;
    
    $scope.listName = $filter('filter')(userService.movieList, {listId: $scope.id})[0].name;
    
    $scope.movies.forEach(function(value, key) {
            var m = movieService.get({i : value.id});
            
            m.$promise.then(function(data){
                data.myRating = value.uRate;
                $scope.resultMovies.push(data);
            });    

     });
    
    console.log("ladr " + $scope.resultMovies);
    
   
  }]);

movieApp.factory('movieService', ['$resource', function($resource) {
     return $resource("http://www.omdbapi.com/");
    }
  ]);


