import { CraftedItem } from './craftedItem';
import { FinishedItem } from './finishedItem';
import { Material } from './material';
import { Vendor } from './vendor';

export class PlayerData {
  craftedItems: CraftedItem[];
  finishedItems: FinishedItem[];

  knownMaterials: string[];
  knownMaterialQuantity: Map<string, number>;
  knownShapes: string[];
  knownEnchantments: string[];
  knownTechniques: string[];

  knownVendors: Vendor[];

  buyMaterialList: {vendor: Vendor, list: Material[]};
  buyShapeList: {vendor: Vendor, list: string[]};
  sellList: {materials: Material[], items: FinishedItem[]};

  constructor() {
    this.craftedItems = [];
    this.finishedItems = [];

    this.knownMaterials = ['wood', 'stone'];
    this.knownMaterialQuantity = new Map();

    for (const mat of this.knownMaterials) {
      this.knownMaterialQuantity.set(mat, 1);
    }

    this.knownShapes = ['club', 'dagger'];
    this.knownEnchantments = ['magic'];
    this.knownTechniques = ['improve', 'enhance'];
    this.knownVendors = this.getInitialVendors();

    this.buyMaterialList = {vendor: null, list: []};
    this.buyShapeList = {vendor: null, list: []};
    this.sellList = {items: [], materials: []};
  }

  getInitialVendors(): Vendor[] {
    const ven_1: Vendor = {
      name: 'Mark',
      location: 'Terrace Street',
      materials_List: ['stone', 'copper'],
      material_cost: new Map([
        ['stone', 1],
        ['copper', 3],
      ]),
      material_count: new Map([
        ['stone', 8],
        ['copper', 10],
      ]),
      shape_list: ['axe'],
      shape_cost: new Map([['axe', 50]]),
    };

    const ven_2: Vendor = {
      name: 'David',
      location: 'Town Square',
      materials_List: ['copper', 'silver', 'gold'],
      material_cost: new Map([
        ['copper', 3],
        ['silver', 9],
        ['gold', 90],
      ]),
      material_count: new Map([
        ['copper', 16],
        ['silver', 8],
        ['gold', 4],
      ]),
      shape_list: ['sword'],
      shape_cost: new Map([['sword', 85]]),
    };

    return [ven_1, ven_2];
  }
}
