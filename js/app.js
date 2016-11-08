/**
 * Created by xardonik on 21.10.2016.
 */
var app = angular.module('ToDo', []);

app.controller('ListsCtrl', function ($scope, $rootScope, $http, $templateCache) {

    $rootScope.newName = "";

    $scope.data = {
        "lists": [
            {
                "id": 1,
                "title": "Zakupy",
                "tasks": [
                    {
                        "name": "Banany",
                    },
                    {
                        "name": "Cukier",
                    },
                    {
                        "name": "Chleb",
                    },
                    {
                        "name": "Dupa Macieja",
                    }
                ],
            },
        ],
    };

    $scope.TaskRemove = function (task_id) {
        $('#task_' + task_id).remove();
        $scope.data.lists[0].tasks.splice(task_id, 1);
    };

    $scope.ListRemove = function (list_id) {
        $('#list_' + list_id).remove();
    };

    $scope.AddTask = function () {
        if($rootScope.newName != "") {
            newNamesArray = $rootScope.newName.split(";");
            if (newNamesArray.length > 1) {
                for (i = 0; i < newNamesArray.length; i++) {
                    $scope.data.lists[0].tasks.push({
                        "name": newNamesArray[i]
                    });
                }
            } else {
                $scope.data.lists[0].tasks.push({
                    "name": $rootScope.newName
                });
            }
            $rootScope.newName = "";
        }
    }
});