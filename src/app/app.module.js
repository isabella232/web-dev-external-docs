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

lrdcom.controller('mainController', function(docsModel, $scope, $rootScope, $state, stringUtils) {
    $rootScope.$on('$stateChangeError', function(event) {
        console.log("404");
    });
});
