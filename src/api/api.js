import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function ClientLogin(username,setname){
    socket.emit('client-login-check',username);
    socket.on('client-login-success',username=>setname(null,username));
    socket.on('client-login-fail',err=>setname(err,null));
}

function ClientGetRoom(cb){
    socket.emit('client-get-room-list');
    socket.on('return-room-list',roomList=>cb(roomList));
}
//create room with name is the username
function ClientCreateRoom(username){
    socket.emit('client-create-room',username);

   
}

function ClientJoinRoom(roomName){
    
    socket.emit('client-join-room',roomName);
  
}

export { subscribeToTimer,ClientLogin,ClientGetRoom,ClientCreateRoom,ClientJoinRoom };