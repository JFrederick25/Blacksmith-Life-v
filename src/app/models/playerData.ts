import { CraftedItem } from './craftedItem';
import { FinishedItem } from './finishedItem';

export class PlayerData {
  craftedItems: CraftedItem[];
  finishedItems: FinishedItem[];

  knownMaterials: string[];
  knownMaterialQuantity: Map<string, number>;
  knownShapes: string[];
  knownEnchantments: string[];

  knownTechniques: string[];

  constructor() {
    this.craftedItems = [];
    this.finishedItems = [];

    this.knownMaterials = ['wood', 'stone', 'copper', 'tin', 'silver', 'gold'];
    this.knownMaterialQuantity = new Map();

    for (const mat of this.knownMaterials) {
      this.knownMaterialQuantity.set(mat, 3);
    }

    this.knownShapes = ['club', 'dagger'];

    this.knownEnchantments = ['magic'];

    this.knownTechniques = ['improve', 'enhance'];
  }
}
