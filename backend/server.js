require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = 30112;

// ✅ CORSとJSONボディパーサー
app.use(cors());
app.use(express.json());

// ✅ MongoDB接続
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB 接続成功！"))
  .catch((err) => console.error("❌ MongoDB 接続失敗:", err));

// ✅ APIルート（例：/api/users）
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('❌ ユーザー取得失敗:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ ビルドされたVueを静的配信
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// ✅ その他のリクエストにindex.htmlを返す（Vue Router 対応）
app.get('/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 サーバー起動 http://localhost:${PORT}`);
});
