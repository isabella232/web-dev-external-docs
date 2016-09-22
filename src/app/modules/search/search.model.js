search.factory("searchModel", function($http, searchUtils, stringUtils) {
	var searchIndex = lunr(function() {
		this.ref('page');
		this.field('title');
		this.field('body');
	});

	var store = {};

	var getSearchIndex = (function() {
		return $http(
		{
        	method: 'GET',
	    	url: 'src/app/modules/search/searchindex.html'
		}).then(function(response) {
	
			let resultsArray = response.data.split('h1 id=');

			for (var x = 0; x < resultsArray.length; x++) {
				// decode HTML
				var decoded = stringUtils.decodeHTML(resultsArray[x]);
				var currentTitle = searchUtils.getTitle(decoded);
				var currentPage = searchUtils.getPage(decoded);
				var currentBody = stringUtils.cutString(searchUtils.getBody(decoded), 300);
				currentBody += '...';

				// add each article to search index
				searchIndex.add({
					body: currentBody.slice(0, 5),
					page: currentPage,
					title: currentTitle
				});

				// add it to our data store
				store[currentPage] = {
					body: currentBody,
					title: currentTitle,
					urlTitle: currentPage
				};
			}
		});
	})();
	
	return {
		getSearchIndex: getSearchIndex,
		searchIndex: searchIndex,
		store: store
	};
});

search.factory("searchUtils", function(stringUtils) {
	var getTitle = function(string) {
		var beginning = stringUtils.nth_occurrence(string, '">', 1);
		var end = string.indexOf('</h1>');

		return string.slice(beginning + 2, end);
	};

	var getPage = function(string) {
		var beginning = stringUtils.nth_occurrence(string, '"', 1);
		var end = stringUtils.nth_occurrence(string, '"', 2);
		var page = string.slice(beginning + 1, end);

		return page;
	};

	var getBody = function(string) {
		var lookingFor = '</h1>';
		var beginning = stringUtils.nth_occurrence(string, lookingFor, 1);
		var body = string.slice(beginning + lookingFor.length, string.length);

		return stringUtils.stripHTML(body);
	};

	return {
		getTitle: getTitle,
		getPage: getPage,
		getBody: getBody
	};
});