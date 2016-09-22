navigation.controller('navController', function($scope, stringUtils, hotkeys, runtimeStates, navigationModel) {
    
    navigationModel.getNavigationStructure().success(function(data) {

        var navigationTree = data;
        // add data recieved about navigation structure in $scope
        $scope.navigationTree = data;



        // add states programatically
        for (var category in data) {
        
            if (!data.hasOwnProperty(category)) continue;

            var obj = data[category];

            for (var page in obj) {
                let pageName = stringUtils.removeFileName(page);
        
                runtimeStates.addState(pageName,
                    {
                        url: '/' + pageName,
                        templateUrl: 'src/pages/' + category + '/' + pageName + '.html'
                    }
                );
            }
        }
    });

    $scope.toggleMenu = function() {
        $scope.checked = !$scope.checked;
        $('#wrapper').addClass("diminish");
    };

    $scope.closeMenu = function() {
        $('#wrapper').removeClass("diminish");
    };
});