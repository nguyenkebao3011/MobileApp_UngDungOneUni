export class ChucNang {
  id: number;
  name: string;
  icon: string;
  screen?: string; // Có thể không có (optional)
  icon2?: string; // Có thể không có (optional)
  color?: string; // Có thể không có (optional)

  constructor(
    id: number,
    name: string,
    icon: string,
    screen?: string,
    icon2?: string,
    color?: string,
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.screen = screen;
    this.icon2 = icon2;
    this.color = color;
  }
}
