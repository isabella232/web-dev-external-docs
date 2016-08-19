const lrdcom = angular.module(
	'lrdcom', 
	[
		// my modules
		'navigation',
        'search',

		// plugins
		'ngAnimate',
		'ui.router',
		'anim-in-out',
        'cfp.hotkeys'
	]
);

lrdcom.controller('mainController', function($scope) {
	$scope.data = "hi";
	$scope.name = 'phil';
});

lrdcom.directive('routeCssClassnames', function($rootScope) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, elem, attr, ctrl) {

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.cssClassnames) ? fromState.data.cssClassnames : null;
                var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.cssClassnames) ? toState.data.cssClassnames : null;

                // don't do anything if they are the same
                if (fromClassnames != toClassnames) {
                    if (fromClassnames) {
                        elem.removeClass(fromClassnames);
                    }

                    if (toClassnames) {
                        elem.addClass(toClassnames);
                    }
                }
            });
        }
    };
});