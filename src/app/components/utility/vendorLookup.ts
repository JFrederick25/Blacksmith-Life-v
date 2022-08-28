export function lookupVendorMaterialValue(material: string): number {
  switch (material) {
    case 'wood': return 3;
    case 'stone': return 4;
  }
}