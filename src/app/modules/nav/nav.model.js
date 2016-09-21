navigation.factory('navigationModel', function($http) {

	var data = {};

    $http({
        method: 'GET',
        url: 'src/app/modules/nav/navigation.json'
    }).then(function successCallback(response) {
        data.navigation = response.data;
    }, function errorCallback(response) {

    });

    return data;
});
