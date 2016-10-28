lrdcom.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/');

	// $locationProvider.html5Mode({
 //        enabled: false,
 //        requireBase: false
 //    });

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'src/pages/home.html',
			data : {
	           cssClassnames : 'page-home'
	       }
		})

		.state('404', {
		    // no url defined
		    template: '<div>error</div>',
		  })

		.state('about', {
			url: '/about',
			templateUrl: 'src/pages/about.html',
			data : {
	           cssClassnames : 'about'
	       }
		});
});