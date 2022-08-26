import { Component, Input } from '@angular/core';
import { CraftedItem } from '../../models/craftedItem';
import { Material } from '../../models/material';
import { PlayerData } from '../../models/playerData';

@Component({
  selector: 'materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
})
export class MaterialsComponent {
  @Input() playerData: PlayerData;

  selectedMenu: string = 'Material';

  get materials_list(): Material[] {
    return this.playerData.knownMaterials.map((m) => ({
      name: m,
      count: this.playerData.knownMaterialQuantity.get(m),
    }));
  }

  get shapes_list(): string[] {
    return this.playerData.knownShapes;
  }

  get enchantments_list(): string[] {
    return this.playerData.knownEnchantments;
  }

  craftedItem: CraftedItem;

  selectedMat: string = '';
  selectedShape: string = '';
  selectedEnch: string = '';

  get disabled(): boolean {
    const hasEnoughMaterial = this.selectedMat
      ? this.playerData.knownMaterialQuantity.get(this.selectedMat) <= 0
      : true;
    return !this.selectedMat || !this.selectedShape || hasEnoughMaterial;
  }

  disabledMat(mat: Material) {
    return mat.count <= 0;
  }

  array_chunk(arr: string[] | Material[], len: number) {
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

  clickedMaterial(val: Material) {
    if (this.disabledMat(val)) {
      return;
    }

    this.selectedMat = val.name;
  }

  clickedShape(val: string) {
    this.selectedShape = val;
  }

  clickedEnchantment(val: string) {
    this.selectedEnch = val;
  }

  buildCraftedItem() {
    if (this.disabled) {
      return;
    }

    this.playerData.knownMaterialQuantity.set(
      this.selectedMat,
      this.playerData.knownMaterialQuantity.get(this.selectedMat) - 1
    );

    this.craftedItem = {
      material: this.selectedMat,
      shape: this.selectedShape,
      enchantment: this.selectedEnch,
      improveScore: 0,
      enhanceScore: 0,
      status: '',
    };
    this.playerData.craftedItems.push(this.craftedItem);

    this.selectedMat = null;
    this.selectedShape = null;
    this.selectedEnch = null;
  }
}
