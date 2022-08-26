import { Component, Input } from '@angular/core';
import { FinishedItem } from '../../models/finishedItem';
import { Material } from '../../models/material';
import { PlayerData } from '../../models/playerData';
import { Vendor } from '../../models/vendor';
import { lookupMaterialValue } from '../utility/Lookup';

@Component({
  selector: 'trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css'],
})
export class TradingComponent {
  @Input() playerData: PlayerData;

  selectedLocation: string = null;

  get sellList(): [string, number][] {
    return this.playerData.sellList.materials.map((m) => [m.name, m.count]);
  }

  get buyList(): [string, number][] {
    return this.playerData.buyMaterialList.list.map((m) => [m.name, m.count]);
  }

  get totalSellCost(): number {
    let sellAmount = 0;
    for (const material of this.playerData.sellList.materials) {
      sellAmount += material.count * lookupMaterialValue(material.name);
    }
    return sellAmount;
  }

  get totalBuyCost(): number {
    let buyAmount = 0;
    if (this.selectedVendor) {
      for (const material of this.playerData.buyMaterialList.list) {
        buyAmount +=
          material.count * this.selectedVendor.material_cost.get(material.name);
      }
    }
    return buyAmount;
  }

  get finalTotal(): number {
    return this.totalSellCost - this.totalBuyCost;
  }

  getLocations(): string[] {
    return this.playerData.knownVendors.map((v) => v.location);
  }

  selectLocation(loc: string) {
    this.selectedLocation = loc;
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
    return vendor.material_cost.get(material);
  }

  getShapeCost(shape: string, vendor: Vendor): number {
    return vendor.shape_cost.get(shape);
  }

  buyMaterialFromVendor(material: string) {
    const matCount = this.selectedVendor.material_count.get(material);
    if (matCount > 0) {
      this.selectedVendor.material_count.set(material, matCount - 1);

      if (
        this.playerData.buyMaterialList.list.some((m) => m.name === material)
      ) {
        this.playerData.buyMaterialList.list.find((m) => m.name === material)
          .count++;
      } else {
        this.playerData.buyMaterialList.list.push({ name: material, count: 1 });
      }
    }
  }

  sellMaterialToVendor(material: string) {
    const matCount = this.getPlayerMatCount(material);
    if (matCount > 0) {
      this.playerData.knownMaterialQuantity.set(material, matCount - 1);

      if (this.playerData.sellList.materials.some((m) => m.name === material)) {
        this.playerData.sellList.materials.find((m) => m.name === material)
          .count++;
      } else {
        this.playerData.sellList.materials.push({ name: material, count: 1 });
      }
    }
  }

  trade() {}
}
