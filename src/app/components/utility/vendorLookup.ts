export function lookupVendorMaterialValue(material: string): number {
  switch (material) {
    case 'wood': return 3;
    case 'stone': return 4;
    case 'copper': return 3;
    case 'silver': return 9;
    case 'gold': return 90;
  }
}

export function lookupVendorShapeValue(shape: string): number {
  switch (shape) {
    case 'axe': return 50;
    case 'sword': return 85;
  }
}

export function lookupRegionByLocation(location: string): string {
  switch (location) {
    case 'Town Square':
    case 'Terrage Street': return 'west';
  }
}