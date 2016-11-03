const lrdcom = angular.module(
	'lrdcom', [
		// my modules
		'navigation',
		'search',
		'pageViewer',
		'background',

		// plugins
		'ngAnimate', 		// animation
		'ui.router', 		// url router
		'anim-in-out', 		// url router animation
		'cfp.hotkeys', 		// application keyboard shortucts
		'720kb.tooltips', 	// tooltips
		'duScroll' 			// angular-scroll
	]
);

lrdcom.controller(
	'mainController',
	function(docsModel, $scope, $rootScope, $state, stringUtils) {
		$rootScope.$on(
			'$stateChangeError',
			function(event) {
			}
		);
	}
);

lrdcom.directive(
	'initialisation',
	['$rootScope', function($rootScope) {
		return {
			restrict: 'A',
			link: function($scope) {
				var to;
				var listener = $scope.$watch(function() {
					clearTimeout(to);
					to = setTimeout(function() {
						listener();
						$rootScope.$broadcast('initialised');
					}, 50);
				});
			}
		};
	}]
);

lrdcom.config(function($provide) {
    $provide.decorator('$state', function($delegate, $stateParams) {
        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });
});
