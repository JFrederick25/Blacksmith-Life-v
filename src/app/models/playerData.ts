import { CraftedItem } from "./craftedItem";

export class PlayerData {
  craftedItems: CraftedItem[];

  constructor() {
    this.craftedItems = [];
  }
}