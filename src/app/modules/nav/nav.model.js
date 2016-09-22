navigation.factory('navigationModel', function($q, $http) {

    var getNavigationStructure = function() {
    	return $http({
        	method: 'GET',
        	url: 'src/app/modules/nav/navigation.json'
    	});
	};

    return {
    	getNavigationStructure: getNavigationStructure
    };
});
