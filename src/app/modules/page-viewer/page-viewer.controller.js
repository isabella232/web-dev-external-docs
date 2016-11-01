pageViewer.controller(
	'pageViewerController',
	function($scope, $location, $anchorScroll, $stateParams, $http, $state) {
		$scope.tableOfContents = [];

		$scope.$on(
			'$viewContentLoaded',
			function() {
				if ($stateParams.doc) {
					$('.table-of-contents').show();

					let url = $state.current.templateUrl($stateParams);

					$http(
						{
							url: url,
							method: 'GET',
						}
					).success(
						function(response) {
							$scope.populateTableOfContents(response);
						}
					);
				} else {
					$('.table-of-contents').hide();
				}
			}
		);

		$scope.scrollTo = function(id) {
			$location.hash(id);
			$anchorScroll();
		};

		$scope.populateTableOfContents = function(page) {
			var parser = new DOMParser();
			var html = parser.parseFromString(page, "text/html");
			var h2Array = [].slice.call(html.querySelectorAll('h2'));

			$scope.tableOfContents = h2Array.map(function(h2) {
				return {
					id: h2.id,
					text: h2.innerHTML
				};
			});
		};
	}
);