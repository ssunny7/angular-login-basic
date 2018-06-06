'use strict';

angular.module('Authentication', []);
angular.module('Home', []);

angular.module('HttpAuthExample', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
])
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