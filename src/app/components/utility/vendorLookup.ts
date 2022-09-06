export function lookupVendorMaterialValue(material: string): number {
  switch (material) {
    case 'wood':
      return 2;
    case 'stone':
      return 4;
    case 'iron':
      return 10;
    case 'copper':
      return 15;
    case 'silver':
      return 35;
    case 'gold':
      return 90;
  }
}

export function lookupVendorShapeValue(shape: string): number {
  switch (shape) {
    case 'axe':
      return 50;
    case 'sword':
      return 85;
    case 'pick':
      return 35;
    case 'spear':
      return 110;
  }
}

export function lookupVendorLocation(name: string): string {
  switch (name) {
    case 'David':
      return 'Market Street';
    case 'Mark':
      return 'Town Center';
    case 'Steve':
      return 'Noble Court';
    case 'Terry':
      return 'Dock House';
    case 'John':
      return 'Mine Outpost';
  }
}

export function lookupVendorRegion(name: string): string {
  switch (name) {
    case 'David':
    case 'Steve':
    case 'Mark':
      return 'west';
    case 'Terry':
      return 'south';
    case 'John':
      return 'north';
  }
}

export function lookupAscossiateList(name: string): string[] {
  switch (name) {
    case 'David':
      return ['Steve', 'Terry'];
    case 'Mark':
      return ['Steve', 'John'];
  }
  return [];
}
