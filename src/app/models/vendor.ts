export class Vendor {
  constructor() {
    this.material_count = new Map<string, number>();
    this.shape_list = [];
  }

  name: string;
  location: string;

  get materials_List(): string[] {
    return [...this.material_count.keys()] || [];
  }

  material_count: Map<string, number>;
  shape_list: string[];
  vendor_associate_list?: string[];
}
