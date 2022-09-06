export class Vendor {
  name: string;

  // get materials_List(): string[] {
  //   return Array.from(this.material_count.keys()) || [];
  // }

  material_count: Map<string, number>;
  shape_list: string[];
  vendor_associate_list?: string[];
}
