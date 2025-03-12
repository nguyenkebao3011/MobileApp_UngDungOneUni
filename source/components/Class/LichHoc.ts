export class LichHoc {
  ngayHoc: Date;
  maMH: string[];
  constructor(ngayHoc: Date, maMH: string[]) {
    this.ngayHoc = ngayHoc;
    this.maMH = maMH;
  }
}
//Javascript chạy tháng từ 0->11 chứ không phải 1->12
export const dsLichHoc: LichHoc[] = [
  new LichHoc(new Date(2025, 2, 16), ['MH01']), // 16/03/2025
  new LichHoc(new Date(2025, 2, 17), ['MH02']), // 17/03/2025
  new LichHoc(new Date(2025, 2, 12), ['MH01']),
  new LichHoc(new Date(2025, 2, 12), ['MH02']),
];
