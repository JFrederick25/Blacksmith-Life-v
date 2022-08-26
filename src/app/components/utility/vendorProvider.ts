import { Vendor } from "../../models/vendor"

export function getNewVendor(name: string): Vendor {
  const newVendor: Vendor = {
    name: name,
    location: 'forest',
    materials_List: ['tin', 'iron', 'fey wood'],
    material_cost: new Map(),
    material_count: new Map(),
    shape_list: [],
    shape_cost: new Map()
  };
  
  return newVendor;
}

function getVendorMaterials(name: string) {

}

function getVendorMaterialCost(name: string) {

}

function getVendorMaterialCount(name: string) {

}

function getVendorShapes(name: string) {

}

function getVendorShapeCost(name: string) {
  
}
