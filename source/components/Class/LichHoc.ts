export class LichHoc {
  NgayHoc: Date;
  MonHoc: string;
  TietHoc: string;
  PhongHoc: string;

  constructor(
    NgayHoc: Date,
    MonHoc: string,
    TietHoc: string,
    PhongHoc: string,
  ) {
    this.TietHoc = TietHoc;
    this.PhongHoc = PhongHoc;
    this.NgayHoc = new Date(NgayHoc);
    this.MonHoc = MonHoc;
  }
}
