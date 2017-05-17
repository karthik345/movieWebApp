movieApp.service('userService', function(){
   this.movieList = ""; 
});

movieApp.factory('getMovies',[ '$resource', function($resource){
   return $resource("http://www.omdbapi.com/", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }}); 
}]);

movieApp.service('movieListService', function (){
    this.movieLists = [
                    { 
                        "name": "Sience fiction movie list", 
                        "id": "0",
                        "movies": ["tt0088763","tt0078748","tt1375666","tt0499549"]    
                    },
                    { 
                        "name": "Action movie list", 
                        "id": "0",
                        "movies": ["tt0848228","tt0462499","tt0106062"]    
                    },
                    { 
                        "name": "Friday list", 
                        "id": "0",
                        "movies": ["tt2911666","tt2072233","tt0944947","tt1856010"]    
                    },
                     { 
                        "name": "Telugu movie list", 
                        "id": "0",
                        "movies": ["tt2631186","tt2258337"]    
                    },
        
                    
    ];             
    
    this.movies = [ ];
});

movieApp.service('movieService', function (){
    this.movieService = [    
    ];             
    
    this.movies = [];
});

movieApp.factory('mainInfo', function($http) { 
    return $http.get('content.json');
});