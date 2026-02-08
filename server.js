const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
app.set('trust proxy', 1);

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e8, // 100 MB
  pingTimeout: 60000,
  pingInterval: 25000
});
const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" }
  ]
});

// Middleware
app.use(cors());
app.use(express.static('public'));

// Health check (for Render)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// In-memory state
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

    // Notify others
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
  socket.on('offer', ({ to, offer }) => {
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

  // Chat
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

  // Media status
  socket.on('media-status', ({ roomId, audio, video }) => {
    socket.to(roomId).emit('user-media-status', {
      userId: socket.id,
      audio,
      video
    });
  });

  socket.on('disconnect', () => {
    const username = usernames.get(socket.id);
    console.log('User disconnected:', socket.id);

    rooms.forEach((participants, roomId) => {
      if (participants.has(socket.id)) {
        participants.delete(socket.id);

        socket.to(roomId).emit('user-disconnected', {
          userId: socket.id,
          username
        });

        if (participants.size === 0) {
          rooms.delete(roomId);
        }
      }
    });

    usernames.delete(socket.id);
  });
});

// Start server (Render-compatible)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


