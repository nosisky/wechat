const socketEvents = (io) => {
  let onlineUsers = {};
  // Set socket.io listeners.
  io.socket.on('connection', (socket) => {

    // On conversation entry, join broadcast channel
    socket.on('connected user', (data) => {


      const socketId = socket.id;
      const userId = data.id;

      onlineUsers[userId] = data;
      onlineUsers[userId].socketId = socketId;

      io.socket.emit('new online', onlineUsers);
    });

    socket.on('disconnect', () => {
      const socketId = socket.id;


      let usersKey = Object.keys(onlineUsers)
      usersKey.forEach((u) => {
        if (onlineUsers[u].socketId === socketId) {
          delete onlineUsers[u];
          io.socket.emit('new online', onlineUsers);
        }
      })

    });


    socket.on('new message', (conversation) => {
      // const receiverId = conversation.data.message.receiverId;
      // console.log(onlineUsers[conversation.data.message.receiverId])
      // const { socketId } = onlineUsers[receiverId];
      io.socket.emit('message received', conversation);
    });
  });
};


export default socketEvents;
