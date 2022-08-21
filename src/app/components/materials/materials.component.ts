import { Component, Input } from '@angular/core';
import { CraftedItem } from '../../models/craftedItem';
import { PlayerData } from '../../models/playerData';

@Component({
  selector: 'materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
})
export class MaterialsComponent {
  @Input() playerData: PlayerData;

  selectedMenu: string = 'Material';

  materials_list: string[] = [
    'wood',
    'stone',
    'copper',
    'tin',
    'silver',
    'gold',
  ];

  shapes_list: string[] = ['club', 'dagger'];

  enchantments_list: string[] = ['magic'];

  craftedItem: CraftedItem;

  selectedMat: string = '';
  selectedShape: string = '';
  selectedEnch: string = '';

  get disabled() {
    return !this.selectedMat || !this.selectedShape;
  }

  array_chunk(arr: string[], len: number) {
    const chunks = [];
    let i: number = 0;
    const n: number = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }

    return chunks;
  }

  selectOption(value: string) {
    this.selectedMenu = value;
  }

  setBackgroundColor(value: string) {
    if (this.selectedMenu === value) {
      return 'lightgray';
    }
  }

  clickedMaterial(val: string) {
    this.selectedMat = val;
  }

  clickedShape(val: string) {
    this.selectedShape = val;
  }

  clickedEnchantment(val: string) {
    this.selectedEnch = val;
  }

  buildCraftedItem() {
    this.craftedItem = {
      material: this.selectedMat,
      shape: this.selectedShape,
      enchantment: this.selectedEnch,
      improveScore: 0,
      enhanceScore: 0,
      status: ''
    };
    this.playerData.craftedItems.push(this.craftedItem);

    this.selectedMat = null;
    this.selectedShape = null;
    this.selectedEnch = null;
  }
}
