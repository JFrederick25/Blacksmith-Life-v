import { Component, Input } from '@angular/core';
import { FinishedItem } from '../../models/finishedItem';
import { PlayerData } from '../../models/playerData';
import { Vendor } from '../../models/vendor';
import { lookupMaterialValue } from '../utility/lookup';
import { lookupVendorMaterialValue, lookupVendorShapeValue } from '../utility/vendorLookup';

class Entry {
  id: number;
  name: string;
  count: number;
  value: number;
  type: string;
}

@Component({
  selector: 'trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css'],
})
export class TradingComponent {
  @Input() playerData: PlayerData;

  get disabled(): boolean {
    return (this.sellList.length === 0 && this.buyList.length === 0) || ((this.totalBuyCost - this.totalSellCost) > this.playerData.money) || !this.selectedVendor;
  }

  selectedLocation: string = null;
  selectedRegion: string = null;

  sellList: Entry[] = [];
  buyList: Entry[] = [];

  get totalSellCost(): number {
    let totalCost = 0;
    for (const entry of this.sellList) {
      totalCost += entry.count * entry.value;
    }
    return totalCost;
  }

  get totalBuyCost(): number {
    let totalCost = 0;
    for (const entry of this.buyList) {
      totalCost += entry.count * entry.value;
    }
    return totalCost;
  }

  getLocations(): string[] {
    return this.playerData.knownVendors.map((v) => v.location);
  }

  selectLocation(loc: string) {
    this.selectedLocation = loc;
  }

  resetLocation() {
    this.selectedLocation = null;
    this.sellList = [];
    this.buyList = [];
  }

  alternateColor(ind: number): string {
    if (ind % 2 === 1) {
      return 'lightgray';
    } else {
      return 'white';
    }
  }

  array_chunk(arr: string[] | Vendor[], len: number) {
    const chunks = [];
    let i: number = 0;
    const n: number = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }

    return chunks;
  }

  getPlayerMatCount(mat: string): number {
    return this.playerData.knownMaterialQuantity.get(mat);
  }

  getMaterialValue(mat: string): number {
    return lookupMaterialValue(mat);
  }

  get vendorList(): Vendor[] {
    return this.playerData.knownVendors.filter(
      (v) => v.location === this.selectedLocation
    );
  }

  get selectedVendor(): Vendor {
    return this.playerData.knownVendors.filter(
      (v) => v.location === this.selectedLocation
    )[0];
  }

  getMatCount(material: string, vendor: Vendor): number {
    return vendor.material_count.get(material);
  }

  getMatCost(material: string, vendor: Vendor): number {

    return lookupVendorMaterialValue(material);
  }

  getShapeCost(shape: string, vendor: Vendor): number {
    return lookupVendorShapeValue(shape);
  }

  removeEntryFromSellList(entry: Entry) {
    if (entry.count > 1) {
      entry.count--;
    } else {
      const index = this.sellList.indexOf(entry);
      this.sellList.splice(index, 1);
    }
  }

  removeEntryFromBuyList(entry: Entry) {
    if (entry.count > 1) {
      entry.count--;
    } else {
      const index = this.buyList.indexOf(entry);
      this.buyList.splice(index, 1);
    }
  }

  sellItemToVendor(item: FinishedItem) {
    const sellItem = this.sellList.find((sl) => sl.id === item.craftedItem.id);

    if (!sellItem) {
      this.sellList.push({
        id: item.craftedItem.id,
        name: item.name,
        count: 1,
        value: item.value,
        type: 'item',
      });
    }
  }

  sellMaterialToVendor(material: string) {
    const pmQty = this.playerData.knownMaterialQuantity.get(material);
    if (pmQty <= 0) {
      return;
    }

    const sellMat = this.sellList.find((l) => l.name === material);
    if (!sellMat) {
      this.sellList.push({
        id: 0,
        name: material,
        count: 1,
        value: lookupMaterialValue(material),
        type: 'material',
      });
    } else {
      if (pmQty - sellMat.count > 0) {
        sellMat.count++;
      }
    }
  }

  buyMaterialFromVendor(material: string) {
    if (this.selectedVendor) {
      const vQty = this.selectedVendor.material_count.get(material);
      if (vQty <= 0) {
        return;
      }

      const buyMat = this.buyList.find((l) => l.name === material);
      if (!buyMat) {
        this.buyList.push({
          id: 0,
          name: material,
          count: 1,
          value: lookupVendorMaterialValue(material),
          type: 'material',
        });
      } else {
        if (vQty - buyMat.count > 0) {
          buyMat.count++;
        }
      }
    }
  }

  buyShapeFromVendor(shape: string) {
    const buyShape = this.buyList.find((bl) => bl.name === shape);

    if (!buyShape) {
      this.buyList.push({
        id: 0,
        name: shape,
        count: 1,
        value: lookupVendorShapeValue(shape),
        type: 'shape',
      });
    }
  }

  trade() {
    if (!this.selectedVendor || this.disabled) {
      return;
    }

    for (const entry of this.sellList) {
      if (entry.type === 'material') {
        const pQty = this.playerData.knownMaterialQuantity.get(entry.name);
        this.playerData.knownMaterialQuantity.set(
          entry.name,
          pQty - entry.count
        );

        const materials = [...this.selectedVendor.material_count.keys()];
        console.log(materials);
        console.log(this.selectedVendor.materials_List);

        const vMat = this.selectedVendor.materials_List.find(
          (ml) => ml === entry.name
        );
        if (!vMat) {
          this.selectedVendor.material_count.set(entry.name, entry.count);
        } else {
          const vQty = this.selectedVendor.material_count.get(vMat);
          this.selectedVendor.material_count.set(vMat, vQty + entry.count);
        }
      }
      if (entry.type === 'item') {
        const fItem = this.playerData.finishedItems.find(
          (fi) => fi.name === entry.name
        );
        const index = this.playerData.finishedItems.indexOf(fItem);
        this.playerData.finishedItems.splice(index, 1);
      }
    }

    for (const entry of this.buyList) {
      if (entry.type === 'material') {
        const vQty = this.selectedVendor.material_count.get(entry.name);
        this.selectedVendor.material_count.set(entry.name, vQty - entry.count);

        const pMat = this.playerData.knownMaterials.find(
          (m) => m === entry.name
        );
        if (!pMat) {
          this.playerData.knownMaterials.push(entry.name);
          this.playerData.knownMaterialQuantity.set(entry.name, entry.count);
        } else {
          const pQty = this.playerData.knownMaterialQuantity.get(entry.name);
          this.playerData.knownMaterialQuantity.set(pMat, pQty + entry.count);
        }
      }
      if (entry.type === 'shape') {
        const index = this.selectedVendor.shape_list.indexOf(entry.name);
        this.selectedVendor.shape_list.splice(index, 1);

        this.playerData.knownShapes.push(entry.name);
      }
    }

    this.playerData.money += this.totalSellCost - this.totalBuyCost;

    this.sellList = [];
    this.buyList = [];
  }
}
