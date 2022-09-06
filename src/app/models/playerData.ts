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
    this.knownVendors = getInitialVendors();
  }
}

function getInitialVendors(): Vendor[] {
  const mark: Vendor = {
    name: 'Mark',
    material_count: new Map([
      ['stone', 8],
      ['copper', 10],
    ]),
    shape_list: ['axe'],
    associate_list: ['Steve', 'John'],
  };

  const david: Vendor = {
    name: 'David',
    material_count: new Map([
      ['copper', 16],
      ['silver', 8],
      ['gold', 4],
    ]),
    shape_list: ['sword'],
    associate_list: ['Steve', 'Terry'],
  };

  return [mark, david];
}
