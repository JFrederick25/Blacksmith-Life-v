import { Component, Input } from '@angular/core';
import { PlayerData } from '../../models/playerData';
import { Vendor } from '../../models/vendor';

@Component({
  selector: 'trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent {
  @Input() playerData: PlayerData;

  selectedLocation: string = null;

  getLocations(): string[] {
    return this.playerData.knownVendors.map(v => v.location);
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
    return this.playerData.knownVendors.filter(v => v.location === this.selectedLocation);
  }

  get selectedVendor(): Vendor {
    return this.playerData.knownVendors.filter(v => v.location === this.selectedLocation)[0];
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

  buyFromVendor(material: string) {
    const matCount = this.selectedVendor.material_count.get(material);
    if (matCount > 0) {
      this.selectedVendor.material_count.set(material, matCount - 1);
      let playerMatName = this.playerData.knownMaterials.find(x => x === material);
      if (!playerMatName) {
        this.playerData.knownMaterials.push(material);
        this.playerData.knownMaterialQuantity.set(material, 0);
        playerMatName = material;
      }
      const playerMatCount = this.playerData.knownMaterialQuantity.get(playerMatName);
      this.playerData.knownMaterialQuantity.set(material, playerMatCount + 1);
    }
  }

}