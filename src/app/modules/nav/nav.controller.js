navigation.controller('navController', function($scope, docsModel, stringUtils, hotkeys, runtimeStates) {

    $scope.navigationTree = docsModel.docsTree;

    // var assignStates = (function() {
    //     console.log($scope.navigationTree)
    //     for (var category in tree) {
    //         console.log('here');
        
    //         if (!docsModel.docsTree.hasOwnProperty(category)) continue;

    //         var pages = docsModel.docsTree[category];

    //         for (var page in pages) {
    //             console.log(page);
    //             let pageName = stringUtils.removeFileName(page);

    //             runtimeStates.addState(
    //                 pageName,
    //                 {
    //                     url: '/' + pageName,
    //                     templateUrl: 'src/pages/' + category + '/' + pageName + '.html'
    //                 }
    //             );
    //         }
    //     }
    // })();

    $scope.toggleMenu = function() {
        $scope.checked = !$scope.checked;
        $('#wrapper').addClass("diminish");
    };

    $scope.closeMenu = function() {
        $('#wrapper').removeClass("diminish");
    };
});