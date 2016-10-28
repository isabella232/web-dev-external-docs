lrdcom.factory("docsModel", function($http, $q, docsUtils, stringUtils) {
    var searchIndex = lunr(function() {
        this.ref('page');
        this.field('title');
        this.field('body');
    });

    var docsStore = {};
    var docsTree = {};

    var getDocsTree = function() {
        return $http({
            method: 'GET',
            url: 'src/app/models/docsTree.json'
        });
    };

    var getDocsIndex = (function() {
        return $http({
            method: 'GET',
            url: 'src/app/models/docsTree.json'
        }).then(function(response) {

            // build document tree
            for (var key in response.data) {
                docsTree[key] = response.data[key];
            }

            // build search index and data store
            for (var category in response.data) {
                if (!response.data.hasOwnProperty(category)) continue;

                let pages = response.data[category];
                let currentCategory = category;

                for (let page in pages) {
					page = page.replace('md', 'html');

                    $http({
                        method: 'GET',
                        url: `src/pages/${category}/${page}`
                    }).then(function(response) {
                        var currentDecoded = stringUtils.stripHTML(response.data);
                        var currentBody = currentDecoded;
                        var currentPageTitle = docsUtils.getTitle(response.data);
                        var currentPage = stringUtils.removeFileName(page);

                        searchIndex.add({
                            body: currentBody,
                            category: currentCategory,
                            page: currentPage,
                            title: currentPageTitle
                        });

                        docsStore[currentPage] = {
                            body: currentBody,
                            category: currentCategory,
                            title: currentPageTitle,
                            urlTitle: currentPage
                        };
                    });
                }
            }
        });
    })();

    return {
        getDocsTree: getDocsTree,
    	getDocsIndex: getDocsIndex,
        searchIndex: searchIndex,
        docsStore: docsStore,
        docsTree: docsTree
    };
});

lrdcom.factory("docsUtils", function(stringUtils) {
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
