# 🚀 QUICK START GUIDE

## Setup in 3 Steps

### 1️⃣ Open Terminal
Navigate to the project folder:
```bash
cd video-conference-app
```

### 2️⃣ Install Dependencies
Run this command:
```bash
npm install
```
⏱️ This takes about 30-60 seconds

### 3️⃣ Start the Server
Run this command:
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
📹 HD Video Conferencing App Ready!
```

### 4️⃣ Open Your Browser
Go to: **http://localhost:3000**

---

## First Conference

1. **Enter your name** (e.g., "Alex")
2. **Enter a room ID** (e.g., "test123")
3. Click **"Join Conference"**
4. **Allow camera/mic** when browser asks

### Invite Others

1. **Share the room ID** with friends
2. They go to **http://localhost:3000**
3. They enter **same room ID**
4. You're connected! 🎉

---

## Testing Locally (Multiple Tabs)

1. Open **http://localhost:3000** in one tab
2. Enter name "Alice" and room "demo"
3. Open **new tab** to **http://localhost:3000**
4. Enter name "Bob" and room "demo"
5. Both tabs should now show each other!

---

## Common Issues & Fixes

### ❌ "npm: command not found"
**Fix:** Install Node.js from https://nodejs.org/

### ❌ "Cannot access camera"
**Fix:** 
- Click the 🔒 lock icon in browser address bar
- Allow camera and microphone
- Refresh page

### ❌ "Port 3000 already in use"
**Fix:** Edit `server.js` and change `3000` to `3001`

### ❌ Video quality is low
**Fix:** 
- Click ⚙️ Settings button
- Select "4K" or "1080p"
- Restart camera

---

## Features to Try

✅ Click 🖥️ to share your screen  
✅ Click ⏺️ to record the call  
✅ Click 💬 to open chat  
✅ Click reactions: 👍 ❤️ 😂 👏 🎉  
✅ Click ✋ to raise your hand  
✅ Switch between Grid/Spotlight view  

---

## Stopping the Server

Press **Ctrl + C** in the terminal where it's running

---

## Next Steps

- Read **README.md** for full documentation
- Customize the UI colors
- Deploy to cloud (Heroku, AWS, etc.)
- Add your own features!

---

**Need Help?** Check the browser console (F12) for error messages.

**Enjoy! 🎉**
