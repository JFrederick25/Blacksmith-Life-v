import { Material } from "./material";

export class Vendor {
  name: string;
  materials_List: string[];
  material_cost: Map<string, number>;
  material_count: Map<string, number>;

  shape_list: string[];
  shape_cost:Map<string, number>;
}