lrdcom.directive('focusMe', function($timeout) {
	return {
		scope: { trigger: '@focusMe' },
		link: function(scope, element) {
			scope.$watch('trigger', function(value) {
				if(value === "true") {
					$timeout(function() {
						console.log('should focus');
						element[0].focus();
					});
				}
			});
		}
	};
});

lrdcom.directive('focus', function($timeout, $parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$watch(attrs.focus, function(newValue, oldValue) {
				if (newValue) { element[0].focus(); }
			});

			element.bind("blur", function(e) {
				$timeout(function() {
					scope.$apply(attrs.focus + "=false");
				}, 0);
			});

			element.bind("focus", function(e) {
				$timeout(function() {
					scope.$apply(attrs.focus + "=true");
				}, 0);
			});
		}
	};
});

lrdcom.directive('allowPattern', function() {
	return {
		restrict: "A",
		compile: function(tElement, tAttrs) {
			return function(scope, element, attrs) {

				element.bind("keypress", function(event) {
					var keyCode = event.which || event.keyCode;
					var keyCodeChar = String.fromCharCode(keyCode);

					if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
						event.preventDefault();
						return false;
					}

				});
			};
		}
	};
});

lrdcom.directive('routeCssClassnames', function($rootScope) {
	return {
		restrict: 'A',
		scope: {},
		link: function (scope, elem, attr, ctrl) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.cssClassnames) ? fromState.data.cssClassnames : null;
				var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.cssClassnames) ? toState.data.cssClassnames : null;

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