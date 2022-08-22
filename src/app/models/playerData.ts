import { CraftedItem } from './craftedItem';
import { FinishedItem } from './finishedItem';

export class PlayerData {
  craftedItems: CraftedItem[];
  finishedItems: FinishedItem[];

  knownMaterials: string[];
  knownShapes: string[];
  knownEnchantments: string[];

  knownTechniques: string[];

  constructor() {
    this.craftedItems = [];
    this.finishedItems = [];

    this.knownMaterials = ['wood', 'stone', 'copper', 'tin', 'silver', 'gold', 'wood', 'stone', 'copper', 'tin', 'silver', 'gold', 'wood', 'stone', 'copper', 'tin', 'silver', 'gold'];

    this.knownShapes = ['club', 'dagger'];

    this.knownEnchantments = ['magic'];

    this.knownTechniques = ['improve', 'enhance'];
  }
}
