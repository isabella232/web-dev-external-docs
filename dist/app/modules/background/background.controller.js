background.controller(
	'backgroundController',
	function($scope) {
		$scope.$on(
			'initialised',
			function() {
				$('.flexslider').flexslider(
					{
						controlNav: false,
						directionNav: false,
						randomize: true
					}
				);
			}
		);
	}
);