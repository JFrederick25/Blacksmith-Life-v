export class Vendor {
  name: string;
  location: string;

  get materials_List(): string[] {
    return [...this.material_count.keys()] || [];
  }

  material_count: Map<string, number>;
  shape_list: string[];
  vendor_associate_list?: string[];
}
