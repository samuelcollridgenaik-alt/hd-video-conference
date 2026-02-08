# 🎥 HD Video Conferencing App - 4K Quality

A production-ready, peer-to-peer video conferencing application with 4K video support, high-fidelity audio, screen sharing, and a beautiful liquid glass UI design.

## ✨ Features

### Video & Audio
- **4K Ultra HD Video** (3840x2160 @ 60fps)
- **1080p/720p** quality options
- **High-Fidelity Audio** (48kHz stereo, noise suppression)
- **Adaptive bitrate** based on network conditions

### Collaboration
- **Screen Sharing** with system audio capture
- **Real-time Chat** messaging
- **Reactions** (👍 ❤️ 😂 👏 🎉)
- **Raise Hand** feature
- **Recording** (local WebM download)

### Interface
- **Liquid Glass UI** with glassmorphism design
- **Grid & Spotlight** view modes
- **Responsive** and resizable layouts
- **Connection Quality** indicator
- **Animated backgrounds** with gradient shifting

### Technical
- **WebRTC** peer-to-peer connections
- **Socket.io** real-time signaling
- **Multiple STUN servers** for reliability
- **ICE candidate pooling** for faster connections

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the project directory:**
```bash
cd video-conference-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

4. **Open your browser:**
```
http://localhost:3000
```

That's it! 🎉

---

## 📖 How to Use

### Starting a Conference

1. **Enter your name** and a **room ID** (any text, e.g., "meeting123")
2. Click **"Join Conference"**
3. Allow camera and microphone access when prompted
4. **Share the room ID** with others to join

### Controls

| Button | Function |
|--------|----------|
| 🎤 | Toggle microphone |
| 📹 | Toggle camera |
| 🖥️ | Start/stop screen sharing |
| ⏺️ | Start/stop recording |
| 💬 | Open chat sidebar |
| ✋ | Raise hand |
| 👍❤️😂👏🎉 | Send reactions |
| 📱/🎛️ | Switch between grid/spotlight view |
| ⚙️ | Open settings (quality options) |
| 📞 | Leave call |

### Settings

Click the **⚙️ Settings** button to adjust:
- **Video Quality:** 4K, 1080p, or 720p
- **Audio Quality:** High Fidelity (48kHz) or Standard

---

## 🏗️ Project Structure

```
video-conference-app/
├── server.js           # Node.js signaling server
├── package.json        # Dependencies
├── public/
│   └── index.html      # Frontend application
└── README.md          # This file
```

---

## 🔧 Configuration

### Video Quality Settings

Edit the `videoConstraints` in `public/index.html`:

```javascript
const videoConstraints = {
    '4K': { width: 3840, height: 2160, frameRate: 60 },
    '1080p': { width: 1920, height: 1080, frameRate: 60 },
    '720p': { width: 1280, height: 720, frameRate: 30 }
};
```

### Audio Quality Settings

Edit the `audioConstraints` in `public/index.html`:

```javascript
const audioConstraints = {
    high: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 48000,
        channelCount: 2
    }
};
```

### Server Port

Change the port in `server.js`:

```javascript
const PORT = process.env.PORT || 3000;
```

### TURN Servers (for production)

For better connectivity behind firewalls, add TURN servers in `public/index.html`:

```javascript
const rtcConfig = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
            urls: 'turn:your-turn-server.com:3478',
            username: 'username',
            credential: 'password'
        }
    ]
};
```

---

## 🌐 Deployment

### Local Network

1. Find your local IP address:
   - **Windows:** `ipconfig`
   - **Mac/Linux:** `ifconfig` or `ip addr`

2. Others on your network can join at:
   ```
   http://YOUR_IP:3000
   ```

### Cloud Deployment (Heroku, AWS, etc.)

1. **Add a `Procfile`:**
   ```
   web: node server.js
   ```

2. **Set environment variables:**
   ```bash
   PORT=80
   ```

3. **Deploy** using your platform's CLI or GUI

4. **Important:** For HTTPS (required for camera/mic access on remote servers):
   - Use a reverse proxy (nginx)
   - Get SSL certificate (Let's Encrypt)
   - Or use Heroku/AWS built-in SSL

---

## 🎨 UI Customization

### Change Background Gradient

Edit the `body` gradient in `public/index.html`:

```css
background: linear-gradient(
    135deg, 
    #1e3c72 0%, 
    #2a5298 25%, 
    #7e22ce 50%, 
    #ec4899 75%, 
    #f97316 100%
);
```

### Adjust Glass Effect

Modify the `.glass` class:

```css
.glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## 🐛 Troubleshooting

### Camera/Mic Not Working
- Ensure HTTPS is enabled (required for remote access)
- Check browser permissions
- Try a different browser

### Poor Video Quality
- Check network bandwidth
- Lower quality in settings
- Ensure adequate CPU/GPU resources

### Connection Issues
- Verify both users are on same network or use TURN servers
- Check firewall settings
- Ensure port 3000 is open

### Screen Sharing Not Capturing Audio
- Browser support varies (Chrome/Edge best support)
- Ensure "Share system audio" is checked in the share dialog

---

## 📊 Performance Tips

1. **Limit participants** to 4-6 for best quality
2. **Use wired connection** instead of WiFi
3. **Close unnecessary apps** to free resources
4. **Lower quality** on slower connections
5. **Enable hardware acceleration** in browser settings

---

## 🔒 Security Notes

- This is a **demo application**
- For production, implement:
  - User authentication
  - Room passwords
  - End-to-end encryption
  - Rate limiting
  - Input validation

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",      // Web server
  "socket.io": "^4.6.1",     // Real-time communication
  "cors": "^2.8.5"           // Cross-origin support
}
```

---

## 🎯 Advanced Features (Coming Soon)

- Virtual backgrounds
- Blur background
- Breakout rooms
- Whiteboard
- File sharing
- Language translation
- AI noise cancellation

---

## 📝 License

MIT License - feel free to use this for your projects!

---

## 🤝 Contributing

Issues and pull requests welcome!

---

## 💡 Tips

- **Test locally first** before deploying
- **Use Chrome** for best WebRTC support
- **Check browser console** for errors
- **Monitor network tab** for connection issues

---

## 🎓 Learn More

- [WebRTC Documentation](https://webrtc.org/)
- [Socket.io Documentation](https://socket.io/docs/)
- [MDN Web Docs - MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)

---

**Enjoy your HD video conferencing! 🎉**

For questions or issues, check the browser console or server logs.
