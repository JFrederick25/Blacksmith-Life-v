export function lookupMaterialValue(material: string): number {
  switch(material) {
    case 'stone': return 1;
    case 'wood': return 1;
    case 'copper': return 1;
    case 'silver': return 4;
    case 'gold': return 30;
  }
}