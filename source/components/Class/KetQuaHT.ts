export class KetQuaHT {
  MaMH: string;
  TenMH: string;
  DiemQuaTrinh: number;
  DiemKT1: number;
  DiemKT2: number;
  DiemCuoiKy: number;
  DiemTongKet: number;
  KetQua: string;

  constructor(
    MaMH: string,
    TenMH: string,
    DiemQuaTrinh: number,
    DiemKT1: number,
    DiemKT2: number,
    DiemCuoiKy: number,
  ) {
    this.MaMH = MaMH;
    this.TenMH = TenMH;
    this.DiemQuaTrinh = DiemQuaTrinh;
    this.DiemKT1 = DiemKT1;
    this.DiemKT2 = DiemKT2;
    this.DiemCuoiKy = DiemCuoiKy;
    this.DiemTongKet = this.tinhDiemTongKet();
    this.KetQua = this.xepLoai();
  }

  // Tính điểm tổng kết từ các thành phần điểm
  tinhDiemTongKet(): number {
    return (
      this.DiemQuaTrinh * 0.2 + // 20% điểm quá trình
      this.DiemKT1 * 0.15 + // 15% điểm kiểm tra lần 1
      this.DiemKT2 * 0.15 + // 15% điểm kiểm tra lần 2
      this.DiemCuoiKy * 0.5 // 50% điểm cuối kỳ
    );
  }

  // Xếp loại kết quả học tập
  xepLoai(): string {
    if (this.DiemTongKet >= 8.5) return 'Giỏi';
    if (this.DiemTongKet >= 7) return 'Khá';
    if (this.DiemTongKet >= 5) return 'Trung bình';
    return 'Yếu';
  }
}
