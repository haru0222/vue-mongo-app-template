require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = 30112;

app.use(cors());
app.use(express.json());

// ✅ MongoDB 接続
mongoose.connect(process.env.MONGODB_URI, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB 接続成功！"))
.catch((err) => console.error("❌ MongoDB 接続失敗:", err));

// ✅ APIルート
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ フロントエンド（ビルド済み）を配信
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// ✅ それ以外は index.html を返す（Vue Router 対応）
app.get('/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ サーバー起動
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
