const socketio=require('socket.io');
const io=socketio();

const socketApi={
    io
};

io.on('connection',socket=>{
    console.log('a user logged in');
});

io.on('disconnect', function () {
    console.log('user disconnected');
});
module.exports=socketApi;