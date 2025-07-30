require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback'); // ★追加

const User = require('./models/User');
const app = express();
const PORT = 30112;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(history()); // ★追加：Vueのhistoryモードと相性◎

// 静的ファイル配信（history()の後）
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB 接続成功！"))
  .catch((err) => console.error("❌ MongoDB 接続失敗:", err));

// APIルート
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'サーバーエラー' });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
