const socketEvents = (io) => {
  let onlineUsers = {};
  // Set socket.io listeners.
  io.on('connection', (user) => {

    // On conversation entry, join broadcast channel
    io.on('connected user', (conversation) => {

      const socketId = conversation.socket.id;
      const userId = conversation.data.id;

      onlineUsers[userId] = conversation.data;
      onlineUsers[userId].socketId = socketId;

      io.socket.emit('new online', onlineUsers);
    });

    // io.on('leave conversation', (conversation) => {
    //   io.leave(conversation);
    //   // console.log('left ' + conversation);
    // });

    // io.on('new message', (conversation) => {
    //   io.sockets.in(conversation).emit('refresh messages', conversation);
    // });

    io.on('disconnect', (conversation) => {
      const socketId = conversation.socket.id;

      let usersKey = Object.keys(onlineUsers)
      usersKey.forEach((u) => {
        if (onlineUsers[u].socketId === socketId) {
          delete onlineUsers[u];
          io.socket.emit('new online', onlineUsers);
        }
      })

    });
  });
};


export default socketEvents;
