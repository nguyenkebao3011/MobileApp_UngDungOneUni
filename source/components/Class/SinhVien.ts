export class SinhVien {
  MaSV: string;
  HoTen: string;
  NgaySinh: Date;
  GioiTinh: string;
  Khoa: string;
  Lop: string;
  BacDaoTao: string;
  LoaiHinhDaoTao: string;
  KhoaHoc: string;
  Nganh: string;
  ChuyenNganh: string;
  NoiSinh: string;
  DiaChi: string;
  SoDienThoai: string;
  TrangThai: string;
  MatKhauDN: string;
  constructor(
    MaSV: string,
    HoTen: string,
    NgaySinh: Date,
    GioiTinh: string,
    Khoa: string,
    Lop: string,
    BacDaoTao: string,
    LoaiHinhDaoTao: string,
    KhoaHoc: string,
    Nganh: string,
    ChuyenNganh: string,
    NoiSinh: string,
    DiaChi: string,
    SoDienThoai: string,
    TrangThai: string,
    MatKhauDN: string,
  ) {
    this.MaSV = MaSV;
    this.HoTen = HoTen;
    this.NgaySinh = NgaySinh;
    this.GioiTinh = GioiTinh;
    this.Khoa = Khoa;
    this.Lop = Lop;
    this.BacDaoTao = BacDaoTao;
    this.LoaiHinhDaoTao = LoaiHinhDaoTao;
    this.KhoaHoc = KhoaHoc;
    this.Nganh = Nganh;
    this.ChuyenNganh = ChuyenNganh;
    this.NoiSinh = NoiSinh;
    this.DiaChi = DiaChi;
    this.SoDienThoai = SoDienThoai;
    this.TrangThai = TrangThai;
    this.MatKhauDN = MatKhauDN;
  }
}

// Dữ liệu mẫu cho 3 sinh viên
export const dsSinhVien: SinhVien[] = [
  new SinhVien(
    'SV001',
    'Nguyễn Văn A',
    new Date(2000, 5, 15), // Tháng 6 (index bắt đầu từ 0)
    'Nam',
    'CNTT',
    'D20CQCN01',
    'Đại học',
    'Chính quy',
    'K20',
    'Công nghệ thông tin',
    'Phát triển phần mềm',
    'Hà Nội',
    'Số 123, Đường ABC, Hà Nội',
    '0123456789',
    'Đang học',
    '123456',
  ),
  new SinhVien(
    'SV002',
    'Trần Thị B',
    new Date(2001, 8, 20), // Tháng 9
    'Nữ',
    'Kế toán',
    'D21CQKT01',
    'Đại học',
    'Chính quy',
    'K21',
    'Kế toán',
    'Kiểm toán',
    'TP.HCM',
    'Số 456, Đường XYZ, TP.HCM',
    '0987654321',
    'Đang học',
    '654321',
  ),
  new SinhVien(
    'SV003',
    'Lê Văn C',
    new Date(1999, 2, 5), // Tháng 3
    'Nam',
    'Quản trị kinh doanh',
    'D19CQKT02',
    'Đại học',
    'Chính quy',
    'K19',
    'Quản trị kinh doanh',
    'Quản trị doanh nghiệp',
    'Đà Nẵng',
    'Số 789, Đường LMN, Đà Nẵng',
    '0369852147',
    'Đã tốt nghiệp',
    '987654',
  ),
];
