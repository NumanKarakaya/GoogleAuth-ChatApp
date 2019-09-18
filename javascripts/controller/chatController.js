app.controller('chatController', ['$scope', ($scope) => {
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked=false;
    $scope.chatName="";

    /**
     * Connect Redis Client
     */
    const socket = io.connect("http://localhost:3000");
    socket.on('onlineList', users => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    /*
    Room List
    */
    socket.on('roomList', rooms => {
        $scope.roomList = rooms;
        $scope.$apply();        
        });
        
    $scope.switchRoom=room=>{
        $scope.chatName=room.name;
        $scope.chatClicked=true;
    };
    /**
     * Create Room
     */
    $scope.newRoom = () => {
        // let randomName=Math.random().toString(36).substring(7);
        let roomName = window.prompt("Enter room name");
        if (roomName !== null && roomName!=='') {
            socket.emit('newRoom', roomName);

        }

    };
    /**
     * Ui Tab-Edit
     */
    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };

}]);