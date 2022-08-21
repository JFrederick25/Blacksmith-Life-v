import { CraftedItem } from "./craftedItem";

export class PlayerData {
  craftedItems: CraftedItem[];

  knownMaterials: string[];
  knownShapes: string[];
  knownEnchantments: string[];

  constructor() {
    this.craftedItems = [];

    this.knownMaterials = [
      'wood',
      'stone',
      'copper',
      'tin',
      'silver',
      'gold',
    ];

    this.knownShapes =  ['club', 'dagger'];

    this.knownEnchantments = ['magic'];
  }
}