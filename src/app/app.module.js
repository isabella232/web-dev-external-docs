const lrdcom = angular.module(
    'lrdcom', [
        // my modules
        'navigation',
        'search',

        // plugins
        'ngAnimate',        // animation
        'ui.router',        // url router
        'anim-in-out',      // url router animation
        'cfp.hotkeys',      // application keyboard shortucts
        '720kb.tooltips'    // tooltips
    ]
);

lrdcom.controller('mainController', function(docsModel, $scope, runtimeStates, $rootScope, $state, stringUtils) {
    $rootScope.$on('$stateChangeError', function(event) {
        console.log("404");
    });

    docsModel.getDocsTree().success(function(data) {
        // add states programatically
        for (var category in data) {
            if (!data.hasOwnProperty(category)) continue;

            var pages = data[category];

            for (var page in pages) {
                let pageName = stringUtils.removeFileName(page);

                runtimeStates.addState(
                    pageName, {
                        url: '/' + pageName,
                        templateUrl: 'src/pages/' + category + '/' + pageName + '.html'
                    }
                );
            }
        }
    });
});

lrdcom.provider('runtimeStates', function runtimeStates($stateProvider) {
    // runtime dependencies for the service can be injected here, at the provider.$get() function.
    this.$get = function($q, $timeout, $state) { // for example
        return {
            addState: function(name, state) {
                $stateProvider.state(name, state);
            }
        };
    };
});
