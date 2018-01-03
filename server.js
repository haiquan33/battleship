const io = require('socket.io')();
var userNameList = [];
var roomList = [];

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('client-ready-2-play', () => {

    //update the nUserReady and set this user status to ready 
    roomList = roomList.map((item) => {
      if (item.roomName != client.roomName) return item;

      return {
        ...item,
        nUserReady: item.nUserReady + 1,
        user: item.user.map((item) => {
          if (item.username != client.username) return item;
          return { ...item, status: 'ready' };
        }

        )
      };

    })
    io.sockets.emit('return-room-list', roomList);
  });

  client.on('client-login-check', (username) => {

    if (userNameList.indexOf(username) >= 0) {

      client.emit('client-login-fail', "Username đã tồn tại rồi");
    }
    else {
      userNameList.push(username);
      client.username = username;
      client.emit('client-login-success', username);
    }
  });


  client.on('client-create-room', (username) => {

    client.join(username);
    client.roomName = username;
    roomList.push({ roomName: username, nUser: 1, nUserReady: 0, user: [{ username: username, status: 'in-ready' }], status: 'waiting' });
    io.sockets.emit('return-room-list', roomList);
  });

  client.on('client-get-room-list', () => {

    client.emit('return-room-list', roomList);
  });

  client.on('client-join-room', (roomName) => {
    client.join(roomName);
    client.roomName = roomName;

    roomList = roomList.map((item) => {
      if (item.roomName != roomName) return item;

      return {
        ...item,
        nUser: item.nUser + 1,
        user: item.user.concat({ username: client.username, status: 'in-ready' })
      };

    })

    console.log("after join", roomList, client.username);
    io.sockets.emit('return-room-list', roomList);
  });

});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);
