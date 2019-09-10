app.controller('chatController',['$scope',($scope)=>{
    const socket=io.connect("http://localhost:3000");

    $scope.activeTab=1;

    $scope.changeTab=tab=>{
        $scope.activeTab=tab;
    };
}]);