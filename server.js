const io = require('socket.io')();
var userNameList=[];
var roomList=[];

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('client-login-check', (username) => {
    
      if (userNameList.indexOf(username)>=0){
     
        client.emit('client-login-fail',"Username đã tồn tại rồi");
      }
      else{
        userNameList.push(username);
        client.username=username;
        client.emit('client-login-success',username);
      }
  });

  
  client.on('client-create-room',(username)=>{

      client.join(username);
      client.roomName=username;
      roomList.push({roomName:username,nUser:1,user:[username],status:'waiting'});
      io.sockets.emit('return-room-list',roomList);
  });

  client.on('client-get-room-list',()=>{
  
    client.emit('return-room-list',roomList);
  });

  client.on('client-join-room',(roomName)=>{
    client.join(roomName);
    client.roomName=roomName;
    
    roomList=roomList.map((item)=>{
        if (item.roomName!=roomName) return item;
      
        return {...item,
                nUser:item.nUser+1,
                user:item.user.concat(client.username)};

    })
   
    console.log("after join",roomList,client.username);
    io.sockets.emit('return-room-list',roomList);
  });

});



const port = 8000;
io.listen(port);
console.log('listening on port ',  port);
