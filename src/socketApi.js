const socketio=require('socket.io');
const socketAuthorization=require('../middleware/socketAuthorization');
const Users=require('./libs/Users');
const Rooms=require('./libs/Rooms');

const io=socketio();

const socketApi={
    io
};

//libs


io.use(socketAuthorization);

/**
 * REDİS ADAPTER
 */

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter(
    { 
      host:process.env.REDIS_URI, 
      port: process.env.REDIS_PORT
     }));


io.on('connection',socket=>{
    console.log('a user'+socket.request.user.name);

    Rooms.list(rooms=>{
        io.emit('roomList',rooms);
    }); 

    
    Users.upsert(socket.id,socket.request.user);

    Users.list(users=>{
        io.emit('onlineList',users);
    }); 
    
    //Mehmet hocam problem burada olabilirmi çünkü çift basılan veriye farklı idler veriliyo.

    socket.on('newRoom',roomName=>{
        Rooms.upsert(roomName);
        Rooms.list(rooms=>{
            io.emit('roomList',rooms);
        }); 
    });


     
    socket.on('disconnect',()=>{
        Users.remove(socket.request.user.googleId);

        
    Users.list(users=>{
        io.emit('onlineList',users);
    })
    })
 
});

io.on('disconnect', function () {
    console.log('user disconnected');

});
module.exports=socketApi;