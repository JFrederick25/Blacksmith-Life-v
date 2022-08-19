import { Component } from '@angular/core';

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

  get disabled(): boolean {
    return this.selectedMat.length > 0;
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
    if (value !== 'Craft'){
      this.selectedMenu = value;
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
}
