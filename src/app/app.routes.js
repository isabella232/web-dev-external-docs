lrdcom.config(
	function($stateProvider, $urlRouterProvider, $locationProvider, stringUtilsProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state(
				'home',
				{
					data: {
						cssClassnames: 'page-home'
					},
					templateUrl: 'src/pages/home.html',
					url: '/'
				}
			)

			.state(
				'404',
				{
					template: '<div>error</div>'
				}
			)

			.state(
				'about',
				{
					data: {
						cssClassnames: 'about'
					},
					templateUrl: 'src/pages/about.html',
					url: '/about'
				}
			)

			.state(
				'docs',
				{
					templateUrl: function($stateParams) {
						return 'src/pages/' + $stateParams.doc + '.html';
					},
					url: '/docs/:doc'
				}
			);
	}
);