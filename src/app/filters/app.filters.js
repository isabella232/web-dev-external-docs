lrdcom.filter('removeFileName', function($filter, stringUtils) {
	return function(input) {
		return stringUtils.removeFileName(input);
	};
});

lrdcom.filter('fileNametoTitle', function($filter, stringUtils) {
	return function(input) {
		return stringUtils.fileNametoTitle(input);
	};
});