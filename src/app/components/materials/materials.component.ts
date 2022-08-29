import { Component, Input } from '@angular/core';
import { CraftedItem } from '../../models/craftedItem';
import { EnchantingWord } from '../../models/enchantingWord';
import { Material } from '../../models/material';
import { PlayerData } from '../../models/playerData';
import { getEnchantingAdjective, getMaterialAdjective } from '../utility/formatter';
import { IdService } from '../utility/id.service';
import { lookupEnchValue, lookupMaterialValue, lookupShapeValue } from '../utility/lookup';

@Component({
  selector: 'materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
})
export class MaterialsComponent {
  @Input() playerData: PlayerData;

  constructor(private idService: IdService) { }

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
  
  get selectedMatValue(): number {
    return lookupMaterialValue(this.selectedMat);
  }

  get selectedShapeValue(): number {
    return lookupShapeValue(this.selectedShape);
  }

  get selectedEnchValue(): number {
    return lookupEnchValue(this.selectedEnch);
  }

  get buildItemValue(): number {
    let val = 0;
    if (this.selectedMat) {
      val += this.selectedMatValue;
    }
    if (this.selectedShape) {
      val += this.selectedShapeValue
    }
    if (this.selectedEnch) {
      val += this.selectedEnchValue
    }
    return val;
  }
  
  get disabled(): boolean {
    const hasEnoughMaterial = this.selectedMat
      ? this.playerData.knownMaterialQuantity.get(this.selectedMat) <= 0
      : true;
    return !this.selectedMat || !this.selectedShape || hasEnoughMaterial;
  }

  formatDescription(): string {
    const materialWord: string = getMaterialAdjective(this.selectedMat);
    const shapeWord: string = this.selectedShape;
    const enchantingWord: EnchantingWord = getEnchantingAdjective(
      this.selectedEnch
    );

    let formattedWord = 'standard ' + materialWord + ' ' + shapeWord;

    if (enchantingWord.pos) {
      formattedWord = enchantingWord.adj + ' ' + formattedWord;
    } else {
      formattedWord = formattedWord + ' ' + enchantingWord.adj;
    }

    return formattedWord;
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

    if (val.name === this.selectedMat) {
      this.selectedMat = null;
      return;
    }

    this.selectedMat = val.name;
  }

  clickedShape(val: string) {
    if (val === this.selectedShape) {
      this.selectedShape = null;
      return;
    }

    this.selectedShape = val;
  }

  clickedEnchantment(val: string) {
    if (val === this.selectedEnch) {
      this.selectedEnch = null;
      return;
    }

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
      id: this.idService.getID(),
      material: this.selectedMat,
      shape: this.selectedShape,
      enchantment: this.selectedEnch,
      improveScore: 0,
      enhanceScore: 0,
      status: '',
      value: this.buildItemValue
    };
    this.playerData.craftedItems.push(this.craftedItem);

    this.selectedMat = null;
    this.selectedShape = null;
    this.selectedEnch = null;
  }
}
