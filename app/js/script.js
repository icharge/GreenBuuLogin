	// create the module and name it myApp
	var myApp = angular.module('myApp', ['ngRoute']);

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'view/home.html',
				controller  : 'mainController',
				title: 'Home'
			})
			.when('/login', {
				templateUrl : 'view/login.html',
				controller  : 'loginController',
				title: 'Login'
			})
			.when('/logged', {
				templateUrl : 'view/logged.html',
				controller  : 'loggedController',
				title: 'Welcome'
			})
			// test
			.when('/register', {
				templateUrl : 'view/register.html',
				controller  : 'registerController'
			})
			.otherwise({ redirectTo: '/' });
	});
	/*
	myApp.run( function($rootScope, $location) {

		// register listener to watch route changes
		$rootScope.$on( "$routeChangeStart", function(event, next, current) {
			if ( $rootScope.loggedUser == null ) {
				// no logged user, we should be going to #login
				if ( next.templateUrl == "view/login.html" ) {
					// already going to #login, no redirect needed
				} else {
					// not going to #login, we should redirect now
					$location.path( "/login" );
				}
			} else {
				if ( next.templateUrl == "view/login.html" ) {
					$location.path( "/logged" );
				}
			}
		});
	})
	*/

	myApp.factory('Page', function(){
		var title = 'default';
		return {
			title: function() { return title; },
			setTitle: function(newTitle) { title = newTitle; }
		};
	});

	// create the controller and inject Angular's $scope
	myApp.controller('mainController', function($scope, $location, Page) {
		// create a message to display in our view
		$scope.Page = Page;
		Page.setTitle('Home');
		//$location.path('/login');
	});

	myApp.controller('loginController', function($scope, $http, $location, Page) {
		$scope.msgHeader = 'BUU Authentication';
		Page.setTitle('Login');

		$scope.DoLogin = function() {
			$scope.hasErr = false;
			$scope.loading = true;
			/*$http.get('http://filltext.com/?rows=10&delay=1&fname={firstName}').success(function(data){
				//$scope.msgHeader=data;
				$scope.loading = false;
				$scope.hasErr = true;
				$scope.msgFeedback = "ผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
				$( "#loginbox" ).effect( "shake" );
			});*/
			$http.post('app/php/submitdata.php', {'user': $scope.user, 'password': $scope.password}
			).success(function(data, status, headers, config) {
				if (data.msg != '')
				{
					$scope.msgFeedback = data.msg;
					$scope.loading = false;
					$scope.hasErr = false;
					$location.path('/logged');
				}
				else
				{
					$scope.msgFeedback = data.error;
					$scope.loading = false;
					$scope.hasErr = true;
					$( "#loginbox" ).effect( "shake" );
				}
			}).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
				$scope.msgFeedback = status;
				$scope.loading = false;
				$scope.hasErr = true;
				$( "#loginbox" ).effect( "shake" );
			});
		}
	});

	myApp.controller('loggedController', function($scope, Page, $location, $http) {
		$scope.msgHeader = 'Welcome back';
		Page.setTitle('LoggedIn');
		
		$scope.DoLogout = function() {
			$scope.loading = true;
			$http.get('app/php/logout.php').success(function(data){
				$scope.loading = false;
				$location.path('/login');
			});
		}
	});

	myApp.controller('registerController', function($scope, Page, $http) {
		$scope.errors = [];
		$scope.msgs = [];

		$scope.SignUp = function() {

			$scope.errors.splice(0, $scope.errors.length); // remove all error messages
			$scope.msgs.splice(0, $scope.msgs.length);

			$http.post('app/database/insert.php', {'uid': $scope.userid, 'uname': $scope.username, 'pwd': $scope.userpassword, 'email': $scope.useremail}
			).success(function(data, status, headers, config) {
				if (data.msg != '')
				{
					$scope.msgs.push(data.msg);
				}
				else
				{
					$scope.errors.push(data.error);
				}
			}).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
				$scope.errors.push(status);
			});
		}
	});