export class MonHoc {
  maMH: string;
  tenMH: string;
  tiet: string;
  phong: string;
  giangVien: string;
  constructor(
    maMH: string,
    tenMH: string,
    tiet: string,
    phong: string,
    giangVien: string,
  ) {
    this.maMH = maMH;
    this.tenMH = tenMH;
    this.tiet = tiet;
    this.phong = phong;
    this.giangVien = giangVien;
  }
}
export const dsMonHoc: MonHoc[] = [
  new MonHoc(
    'MH01',
    'Kiểm định phần mềm',
    '7 - 12',
    'A107 - 140 Lê Trọng Tấn',
    'Nguyễn Thị Bích Ngân',
  ),
  new MonHoc(
    'MH02',
    'Lập trình di động',
    '13 - 17',
    'A108 - 140 Lê Trọng Tấn',
    'Trần Văn Bảo',
  ),
];
