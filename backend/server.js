const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3304;

app.use(cors());
app.use(bodyParser.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost', // Địa chỉ MySQL (localhost hoặc IP)
  user: 'root', // Tên tài khoản MySQL
  password: '', // Mật khẩu MySQL
  database: 'test', // Tên database
});

db.connect((err) => {
  if (err) {
    console.error('Kết nối MySQL thất bại: ', err);
    return;
  }
  console.log('Đã kết nối MySQL thành công');
});

// API: Lấy dữ liệu từ MySQL
app.get('/taikhoan', (req, res) => {
  const sql = 'SELECT * FROM taikhoan';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

