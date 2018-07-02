'use strict';

/* A module is used to group services, controllers, directives, config etc that can be reused
   in other modules. This is just the definition, it's declared for use in app.js. */
angular.module('Authentication')
.controller('LoginController',
    /* The following line is dependency injection. The entries before 'function' are the
       dependencies for this controller which are then accessed as parameters ib the function. */
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function($scope, $rootScope, $location, AuthenticationService) {
        AuthenticationService.ClearCredentials();

        $scope.login = function() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);