/**
 * Created by xardonik on 21.10.2016.
 */
var app = angular.module('toDo', [
    'ngResource'
]);

app.factory("TaskService", function ($resource) {
    return $resource(
        "webservices/web/app_dev.php/api/task/:action",
        {
            action: '@action',
            user_id: 2
        },
        {
            getTasks: {
                method: 'GET',
                params: {
                    action: 'get'
                },
                isArray: true
            },
            createTask: {
                method: 'POST',
                params: {
                    action: 'create',
                    name: '@name'
                },
                isArray: false
            },
            modifyTask: {
                method: 'POST',
                params: {
                    action: 'modify',
                    task_id: '@task_id',
                    name: '@name'
                },
            },
            removeTask: {
                method: 'DELETE',
                params: {
                    action: 'delete',
                    task_id: '@task_id'
                },
                isArray: false
            }
        }
    );
});

app.controller('ListsCtrl', function ($scope, $rootScope, TaskService) {

    $rootScope.createdTaskName = "";
    $scope.editTasks = true;

    $scope.data = TaskService.getTasks();

    $scope.modifyTask = function (index, id, element) {

        if ($scope.backupElement && $scope.backupElement != element) {
            $scope.backupElement.editingTask = false;
            $scope.backupElement.task.name = $scope.backupName;
        }

        if (element.editingTask) {
            element.editingTask = false;
            if ($scope.data[index].name.trim() == "" || $scope.backupName == $scope.data[index].name.trim()) {
                $scope.data[index].name = $scope.backupName;
            } else if($scope.data[index].name.trim() != ""){
                TaskService.modifyTask({task_id: id, name: $scope.data[index].name});
            }
            $scope.backupElement = "";
            $scope.backupName = "";
        } else {
            element.editingTask = true;
            $scope.backupName = $scope.data[index].name;
            $scope.backupElement = element;
            $("#name_" + index).focus();

        }

    };

    $scope.createTask = function () {
        if ($rootScope.createdTaskName.trim() != "") {
            TaskService.createTask({name: $rootScope.createdTaskName}, function (data) {
                $scope.data.push({
                    id: data.id,
                    name: $rootScope.createdTaskName
                });
                $rootScope.createdTaskName = "";
            });
        }

    };

    $scope.removeTask = function (index, id) {
        TaskService.removeTask({task_id: id});
        $scope.data.splice(index, 1);

    };
});