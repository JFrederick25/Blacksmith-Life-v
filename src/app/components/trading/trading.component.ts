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

  get sellList(): Map<string, number> {
    return this.playerData.sellList.materials.map(m => )
  }

  get totalSellCost(): number {
    let sellAmount = 0;
    for (const sellEntry of this.sellList) {
      const qty = sellEntry[1];
      sellAmount += qty * lookupMaterialValue(sellEntry[0]);
    }
    return sellAmount;
  }

  get totalBuyCost(): number {
    let buyAmount = 0;
    if (this.selectedVendor) {
      for (const buyEntry of this.buyList) {
        const qty = buyEntry[1];
        buyAmount += qty * this.selectedVendor.material_cost.get(buyEntry[0]);
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

      if (this.playerData.buyMaterialList.list.some(m => m.name === material)) {
        this.playerData.buyMaterialList.list.find(m => m.name === material).count++;
      } else {
        this.playerData.buyMaterialList.list.push({name: material, count: 1});
      }
    }
  }

  sellMaterialToVendor(material: string) {
    const matCount = this.getPlayerMatCount(material);
    if (matCount > 0) {
      this.playerData.knownMaterialQuantity.set(material, matCount - 1);

      if (this.playerData.sellList.materials.some(m => m.name === material)) {
        this.playerData.sellList.materials.find(m => m.name === material).count++;
      } else {
        this.playerData.sellList.materials.push({name: material, count: 1});
      }
    }
  }

  trade() {

  }
}
