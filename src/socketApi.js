const socketio=require('socket.io');
const socketAuthorization=require('../middleware/socketAuthorization');
const io=socketio();

const socketApi={
    io
};

io.use(socketAuthorization);

/**
 * REDİS ADAPTER
 */

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter(
    { 
      host:process.env.REDIS_URI, 
      port: process.env.REDIS_PORT,
      requestsTimeout:5000
     }));


io.on('connection',socket=>{
    console.log('a user'+socket.request.user.name);
    
    socket.broadcast.emit('hello');
});

io.on('disconnect', function () {
    console.log('user disconnected');
});
module.exports=socketApi;