const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e8 // 100 MB for large data transfers
});
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

const rooms = new Map();
const usernames = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomId, username }) => {
    socket.join(roomId);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(socket.id);
    usernames.set(socket.id, username || 'Anonymous');

    // Notify others in the room
    socket.to(roomId).emit('user-connected', {
      userId: socket.id,
      username: usernames.get(socket.id),
      participants: Array.from(rooms.get(roomId)).map(id => ({
        id,
        username: usernames.get(id)
      }))
    });

    // Send current participants to new user
    socket.emit('room-users', {
      participants: Array.from(rooms.get(roomId)).map(id => ({
        id,
        username: usernames.get(id)
      }))
    });

    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // WebRTC signaling
  socket.on('offer', ({ to, offer, roomId }) => {
    socket.to(to).emit('offer', {
      from: socket.id,
      offer,
      username: usernames.get(socket.id)
    });
  });

  socket.on('answer', ({ to, answer }) => {
    socket.to(to).emit('answer', {
      from: socket.id,
      answer
    });
  });

  socket.on('ice-candidate', ({ to, candidate }) => {
    socket.to(to).emit('ice-candidate', {
      from: socket.id,
      candidate
    });
  });

  // Chat messages
  socket.on('chat-message', ({ roomId, message }) => {
    io.to(roomId).emit('chat-message', {
      userId: socket.id,
      username: usernames.get(socket.id),
      message,
      timestamp: Date.now()
    });
  });

  // Reactions
  socket.on('reaction', ({ roomId, emoji }) => {
    socket.to(roomId).emit('reaction', {
      userId: socket.id,
      username: usernames.get(socket.id),
      emoji
    });
  });

  // Raise hand
  socket.on('raise-hand', ({ roomId, raised }) => {
    socket.to(roomId).emit('hand-raised', {
      userId: socket.id,
      username: usernames.get(socket.id),
      raised
    });
  });

  // Screen share status
  socket.on('screen-share-status', ({ roomId, isSharing }) => {
    socket.to(roomId).emit('user-screen-share', {
      userId: socket.id,
      isSharing
    });
  });

  // Audio/Video status
  socket.on('media-status', ({ roomId, audio, video }) => {
    socket.to(roomId).emit('user-media-status', {
      userId: socket.id,
      audio,
      video
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove from all rooms
    rooms.forEach((participants, roomId) => {
      if (participants.has(socket.id)) {
        participants.delete(socket.id);
        socket.to(roomId).emit('user-disconnected', {
          userId: socket.id,
          username: usernames.get(socket.id)
        });
        
        if (participants.size === 0) {
          rooms.delete(roomId);
        }
      }
    });
    
    usernames.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📹 HD Video Conferencing App Ready!`);
});
