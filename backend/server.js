const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyparser.json());
app.use(cors());

// Kết nối MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'test',
});

db.connect(err => {
  if (err) throw err;
  console.log('Đã kết nối với MySQL');
});

//  Lấy dữ liệu
app.get('/data/:table', (req, res) => {
  const table = req.params.table;
  const sql = `SELECT * FROM \`${table}\``;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy dữ liệu:', err);
      return res.status(500).send('Lỗi khi lấy dữ liệu');
    }
    res.send(result);
  });
});

//  Thêm dữ liệu
app.post('/data/:table', (req, res) => {
  const table = req.params.table;
  const data = req.body;

  const sql = `INSERT INTO \`${table}\` SET ?`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm dữ liệu:', err);
      return res.status(500).send('Lỗi khi thêm dữ liệu');
    }
    res.send({status: 'Thêm thành công', id: result.insertId});
  });
});

// Sửa dữ liệu
app.put('/data/:table/:id', (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  const data = req.body;

  const sql = `UPDATE \`${table}\` SET ? WHERE id = ?`;

  db.query(sql, [data, id], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật dữ liệu:', err);
      return res.status(500).send('Lỗi khi cập nhật dữ liệu');
    }
    res.send({status: 'Cập nhật thành công'});
  });
});

// Xóa dữ liệu
app.delete('/data/:table/:id', (req, res) => {
  const table = req.params.table;
  const id = req.params.id;

  const sql = `DELETE FROM \`${table}\` WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa dữ liệu:', err);
      return res.status(500).send('Lỗi khi xóa dữ liệu');
    }
    res.send({status: 'Xóa thành công'});
  });
});

// Chạy server
const PORT = 3000;
const HOST = '192.168.0.123';

app.listen(PORT, HOST, () => {
  console.log(`Máy đang chạy trên địa chỉ ${HOST}:${PORT}`);
});
//
// Đăng nhập
app.post('/login', (req, res) => {
  const {MaSV, MatKhauDangNhap} = req.body;

  if (!MaSV || !MatKhauDangNhap) {
    return res.status(400).send({status: 'Thiếu thông tin đăng nhập'});
  }

  const sql =
    'SELECT * FROM `SinhVien` WHERE `MaSV` = ? AND `MatKhauDangNhap` = ?';
  db.query(sql, [MaSV, MatKhauDangNhap], (err, result) => {
    if (err) {
      console.error('Lỗi khi đăng nhập:', err);
      return res.status(500).send({status: 'Lỗi hệ thống'});
    }

    if (result.length > 0) {
      res.send({
        status: 'Đăng nhập thành công',
        user: result[0], // Gửi thông tin tài khoản về cho client
      });
    } else {
      res.status(401).send({status: 'Tài khoản hoặc mật khẩu không đúng'});
    }
  });
});
//Lấy thông tin sinh viên
app.get('/sinhvien/search', (req, res) => {
  const {column, value} = req.query;

  // Kiểm tra tham số đầu vào tránh SQL Injection
  const allowedColumns = [
    'MaSV',
    'HoTen',
    'NgaySinh',
    'GioiTinh',
    'MaKhoa',
    'MaLop',
    'MaNganh',
  ];
  if (!allowedColumns.includes(column)) {
    return res.status(400).send({status: 'Trường không hợp lệ'});
  }

  const sql = `
    SELECT 
        sv.MaSV,
        sv.HoTen,
        sv.NgaySinh,
        sv.GioiTinh,
        k.TenKhoa,
        l.TenLop,
        sv.BacDaoTao,
        sv.LoaiHinhDaoTao,
        sv.KhoaHoc,
        n.TenNganh,
        sv.NoiSinh,
        sv.DiaChi,
        sv.SoDienThoai,
        sv.TrangThai,
        cn.TenChuyenNganh
    FROM SinhVien sv
    LEFT JOIN Khoa k ON sv.MaKhoa = k.MaKhoa
    LEFT JOIN Lop l ON sv.MaLop = l.MaLop
    LEFT JOIN Nganh n ON sv.MaNganh = n.MaNganh
    LEFT JOIN ChuyenNganh cn ON sv.MaChuyenNganh = cn.MaChuyenNganh
    WHERE sv.\`${column}\` = ?;
  `;

  db.query(sql, [value], (err, result) => {
    if (err) {
      console.error('Lỗi khi tìm kiếm:', err);
      return res.status(500).send({status: 'Lỗi hệ thống'});
    }
    if (result.length > 0) {
      res.send({
        status: 'Thành công',
        data: result,
      });
    } else {
      res.status(404).send({status: 'Không tìm thấy sinh viên'});
    }
  });
});

//Lấy thông tin lịch học
app.get('/lichhoc', async (req, res) => {
  const {MaSV} = req.query;
  if (!MaSV) {
    return res
      .status(400)
      .json({status: 'error', message: 'Thiếu mã sinh viên'});
  }
  const sql = `
    SELECT 
        lh.NgayHoc,
        mh.TenMH AS MonHoc,
        CONCAT(lh.TietBatDau, '-', lh.TietKetThuc) AS TietHoc,
        ph.TenPhongHoc AS PhongHoc
    FROM 
        LichHoc lh
    JOIN 
        MonHoc mh ON lh.MaMH = mh.MaMH
    JOIN 
        PhongHoc ph ON lh.MaPhongHoc = ph.MaPhongHoc
    WHERE 
        lh.MaSV = ?
    ORDER BY 
        lh.NgayHoc
  `;
  db.query(sql, [MaSV], (err, result) => {
    if (err) {
      console.error('Lỗi khi tìm kiếm:', err);
      return res.status(500).send({status: 'Lỗi hệ thống'});
    }
    if (result.length > 0) {
      res.send({
        status: 'Thành công',
        data: result,
      });
    } else {
      res.status(404).send({status: 'Không tìm thấy lịch học của sinh viên'});
    }
  });
});

// Lấy kết quả học tập
app.get('/ketquaht', (req, res) => {
  const {MaSV} = req.query;
  if (!MaSV) {
    res.status(400).send({status: 'Mã sinh viên đâu?'});
  }
  const sql = `Select mh.MaMH,mh.TenMH,kq.DiemQuaTrinh,kq.DiemKT1,kq.DiemKT2,kq.DiemCuoiKy from KetQuaHT kq 
    INNER JOIN MonHoc mh on kq.MaMH = mh.MaMH where kq.MaSV=?`;
  db.query(sql, [MaSV], (err, result) => {
    if (err) {
      console.error('Lỗi khi tìm kiếm:', err);
      return res.status(500).send({status: 'Lỗi hệ thống'});
    }
    if (result.length > 0) {
      res.send({
        status: 'Thành công',
        data: result,
      });
    } else {
      res.status(404).send({status: 'Không tìm thấy điểm của sinh viên'});
    }
  });
});
