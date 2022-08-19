import { Component } from '@angular/core';
import { TimeInterval } from 'rxjs';
import { CraftedItem } from '../../models/craftedItem';

@Component({
  selector: 'materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
})
export class MaterialsComponent {
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

  selectedMat: string = '';
  selectedShape: string = '';
  selectedEnch: string = '';
  craftedItem: CraftedItem = null;

  craftProgress = 10;
  progressID: number;

  get disabled(): boolean {
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
    if (value !== 'Craft') {
      this.selectedMenu = value;
    }
    if (value === 'Craft' && !this.disabled) {
      this.selectedMenu = value;
      this.buildCraftedItem();
    }
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
    };
    this.craftProgress = 0;

    this.progressID = setInterval(() => {
      this.craftProgress += 1;
      if (this.craftProgress === 500) {
        clearInterval(this.progressID);
      }
    }, 20);
  }

  get bar() {
    return this.craftProgress + 'px';
  }
}
