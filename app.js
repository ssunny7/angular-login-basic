'use strict';

/* These lines declare the function for use as a component of another module. */
angular.module('Authentication', []);
angular.module('Home', []);

/* This defines a module while also specifying other modules as its
   dependencies. In this case, the module name is also the name of the
   HTML element in which the module will run. */
angular.module('HttpAuthExample', [
    'Authentication',
    'Home',
    // This is used to help make the page an SPA
    'ngRoute',
    'ngCookies'
])
// $routeProvider provided by ngRoute
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login', {
        controller: 'LoginController',
        templateUrl: 'auth/views/login.html'
    })
    .when('/', {
        controller: 'HomeController',
        templateUrl: 'home/views/home.html'
    })
    .otherwise({redirectTo: '/login'});
}])
// Like the main() method in C/C++, executed first when angular app starts
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function($rootScope, $location, $cookieStore, $http) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        if($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);