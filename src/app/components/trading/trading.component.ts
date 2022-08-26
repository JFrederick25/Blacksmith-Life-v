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

  sellList: {name: string, count: number, value: number, type: string}[] = [];
  buyList: {name: string, count: number, value: number, type: string}[] = [];

  get totalSellCost(): number {
    let totalCost = 0;
    for(const entry of this.sellList) {
      totalCost += entry.count * entry.value;
    }
    return totalCost;
  }

  get totalBuyCost(): number {
    let totalCost = 0;
    for(const entry of this.buyList) {
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

  sellMaterialToVendor(material: string) {
    const pmQty = this.playerData.knownMaterialQuantity.get(material);
    if (pmQty <= 0) {
      return;
    }

    const sellMat = this.sellList.find(l => l.name === material);
    if (!sellMat) {
      this.sellList.push({name: material, count: 1, value: lookupMaterialValue(material), type: 'material'});
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

      const buyMat = this.buyList.find(l => l.name === material);
      if (!buyMat) {
        this.buyList.push({name: material, count: 1, value: this.selectedVendor.material_cost.get(material), type: 'material'});
      } else {
        if (vQty - buyMat.count > 0) {
          buyMat.count++;
        }
      }
    }
  }
}
