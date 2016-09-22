search.controller("searchController", function($scope, searchModel, searchUtils, stringUtils, hotkeys) {
	$scope.searchTerm = "";
	$scope.searchResults = [];
	$scope.searchIndex = searchModel.searchIndex;
	$scope.store = searchModel.store;

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
    	console.log($scope.searchIndex)
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

		resultsArray.map(function(result) {
			$scope.searchResults.push($scope.store[result.ref]);	
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