import { CraftedItem } from './craftedItem';
import { FinishedItem } from './finishedItem';
import { Vendor } from './vendor';

export class PlayerData {
  money: number;
  craftedItems: CraftedItem[];
  finishedItems: FinishedItem[];

  knownMaterials: string[];
  knownMaterialQuantity: Map<string, number>;
  knownShapes: string[];
  knownEnchantments: string[];
  knownTechniques: string[];

  knownVendors: Vendor[];

  constructor() {
    this.money = 20;
    this.craftedItems = [];
    this.finishedItems = [];

    this.knownMaterials = ['wood', 'stone'];
    this.knownMaterialQuantity = new Map();

    for (const mat of this.knownMaterials) {
      this.knownMaterialQuantity.set(mat, 3);
    }

    this.knownShapes = ['club', 'dagger'];
    this.knownEnchantments = ['magic'];
    this.knownTechniques = [];
    // this.knownTechniques = ['improve', 'enhance'];
    this.knownVendors = this.getInitialVendors();
  }

  getInitialVendors(): Vendor[] {
    const mark: Vendor = {
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
      vendor_associate_list: ['Steve', 'John']
    };

    const david: Vendor = {
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
      vendor_associate_list: ['Steve', 'Terry']
    };

    return [mark, david];
  }
}
