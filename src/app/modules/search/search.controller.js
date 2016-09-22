search.controller("searchController", function($scope, docsModel, stringUtils, hotkeys) {
	$scope.searchTerm = "";
	$scope.searchResults = [];
	$scope.searchIndex = docsModel.searchIndex;
	$scope.docsStore = docsModel.docsStore;

	$scope.toggleSearch = function(mode) {
        var $searchContainer = $('.search-container');
        var $searchInput = $('.search-input');

        $searchContainer.removeClass('hide show');

        if (mode === 'hide') {
            $searchContainer.addClass('hide');
            $('#search-input').blur();
        }

        else {
            $searchContainer.addClass('show');
            $('#search-input').focus();
        }
    };

    $scope.searchInputHandler = function(term, event) {
		if (event.key == "Escape") {
			$scope.toggleSearch('hide');
		} 
		else {
			$scope.getSearchResults(term);
		}
	};

	$scope.getSearchResults = function(term, event) {
		var resultsArray = $scope.searchIndex.search(term);
			$scope.searchResults = [];

		console.log($scope.docsStore)
		console.log($scope.searchIndex)

		resultsArray.map(function(result) {
			$scope.searchResults.push($scope.docsStore[result.ref]);	
		});		
	};

	hotkeys.add({
        combo: '/',
        callback: function() {
            $scope.toggleSearch('show');
        }
    });

    hotkeys
    	.bindTo($scope)
	    .add({
	        combo: 'esc',

	        callback: function() {
	            $scope.toggleSearch('hide');
	        }
	    });
});