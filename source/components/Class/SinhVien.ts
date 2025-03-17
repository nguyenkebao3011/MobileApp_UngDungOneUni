export class SinhVien {
  MaSV: string;
  HoTen: string;
  NgaySinh: Date;
  GioiTinh: string;
  TenKhoa: string;
  TenLop: string;
  BacDaoTao: string;
  LoaiHinhDaoTao: string;
  KhoaHoc: string;
  TenNganh: string;
  TenChuyenNganh: string;
  NoiSinh: string;
  DiaChi: string;
  SoDienThoai: string;
  TrangThai: string;
  constructor(
    MaSV: string,
    HoTen: string,
    NgaySinh: Date,
    GioiTinh: string,
    TenKhoa: string,
    TenLop: string,
    BacDaoTao: string,
    LoaiHinhDaoTao: string,
    KhoaHoc: string,
    TenNganh: string,
    NoiSinh: string,
    DiaChi: string,
    SoDienThoai: string,
    TrangThai: string,
    TenChuyenNganh: string,
  ) {
    this.MaSV = MaSV;
    this.HoTen = HoTen;
    this.NgaySinh = NgaySinh;
    this.GioiTinh = GioiTinh;
    this.TenKhoa = TenKhoa;
    this.TenLop = TenLop;
    this.BacDaoTao = BacDaoTao;
    this.LoaiHinhDaoTao = LoaiHinhDaoTao;
    this.KhoaHoc = KhoaHoc;
    this.TenNganh = TenNganh;
    this.NoiSinh = NoiSinh;
    this.DiaChi = DiaChi;
    this.SoDienThoai = SoDienThoai;
    this.TrangThai = TrangThai;
    this.TenChuyenNganh = TenChuyenNganh;
  }
}
