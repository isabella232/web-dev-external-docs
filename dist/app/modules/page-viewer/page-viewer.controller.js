pageViewer.controller(
	'pageViewerController',
	function($scope, $location, $stateParams, $state, $http, $state, pageViewerUtils) {
		$scope.tableOfContents = [];

		$scope.$on(
			'$viewContentLoaded',
			function() {
				// only run this if this is a documentation page
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
							$scope.wrapH2sInSections();
							$scope.showReadingTime();
							$scope.makeLinksOpenInNewWindow();
							$scope.populateTableOfContents(response);
							$scope.activateVideo();
						}
					);
				} else {
					$('.table-of-contents').hide();
				}
			}
		);

		$scope.makeLinksOpenInNewWindow = function() {
			$('.page-container a').attr('target', '_blank');
		};

		$scope.wrapH2sInSections = function(page) {
			$('.page-container h2').each(function(index, h2) {
				var h2ID = $(this).attr('id');
				$(this).attr('id', '');
			    $(h2).nextUntil('h2').addBack().wrapAll(`<div class="content" id="${h2ID}"></div>`);
			});
		};

		$scope.showReadingTime = function(page) {
			var page = document.querySelector('.page-container').textContent;

			$scope.readingTime = pageViewerUtils.getReadingTime(page);
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

		$scope.activateVideo = function() {
			if ($('.page-container iframe').length) {
				$('.page-container iframe').wrap(`<div class="video-container" du-scrollspy />`);

				var distance = $('.video-container').offset().top,
				    $window = $(window);

				$window.scroll(function() {
				    if ( $window.scrollTop() >= distance ) {
				        $('.video-container').addClass('fixed');
				    } else {
				    	$('.video-container').removeClass('fixed');
				    }
				});
			}
		};
	}
);