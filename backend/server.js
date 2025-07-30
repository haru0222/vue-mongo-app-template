require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB 接続成功！"))
.catch((err) => console.error("❌ MongoDB 接続失敗:", err));

// APIルート
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ここで dist を公開
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// ルートアクセス時は index.html を返す
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// サーバー起動
const PORT = 30112;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
