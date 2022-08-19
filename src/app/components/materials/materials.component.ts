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
    this.step = 1;

    this.progressID = setInterval(() => {
      this.craftProgress += this.step;
      if (this.craftProgress >= this._maxProgress) {
        clearInterval(this.progressID);
      }
    }, this.pInterval);
  }

  get bar() {
    const par = this._maxProgress / this._maxBar;
    if (this.craftProgress / par > this._maxBar) {
      this.craftProgress = this._maxProgress;
      return this._maxBar + 'px';
    }
    return this.craftProgress / par + 'px';
  }

  step = 1;
  _maxBar = 700;
  _maxProgress = 500000;
  pInterval = 20;

  increaseStep() {
    this.step = Math.trunc(this.step * 1.6) + 1;
  }

  get maxBar() {
    return this._maxBar + 'px';
  }

  get timeRemaining() {
    const stepPerSec = (this.step * 1000) / this.pInterval;
    const seconds = Math.round(
      this._maxProgress / stepPerSec - this.craftProgress / stepPerSec
    );
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  }

  get color() {
    if (this.craftProgress < this._maxProgress) {
      return 'gray';
    }
    return 'green';
  }
}
