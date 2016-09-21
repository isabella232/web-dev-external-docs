navigation.controller('navController', function($scope, $http, stringUtils, hotkeys, runtimeStates, navigationModel) {
    
    $scope.navigationTree = navigationModel.navigation;

    $scope.toggleMenu = function() {
        $scope.checked = !$scope.checked;
        $('#wrapper').addClass("diminish");
    };

    $scope.closeMenu = function() {
        $('#wrapper').removeClass("diminish");
    };

    // add states programatically
    for (category in navigationModel.navigation) {
    
        if (!navigationModel.navigation.hasOwnProperty(category)) continue;

        var obj = navigationModel.navigation[category];

        for (page in obj) {
            let pageName = stringUtils.removeFileName(page)
    
            runtimeStates.addState(pageName,
                {
                    url: '/' + pageName,
                    templateUrl: 'src/pages/' + category + '/' + pageName + '.html'
                }
            );
        }
    }
});
