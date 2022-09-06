import { Vendor } from '../../models/vendor';

export function getNewVendor(name: string): Vendor {
  switch (name) {
    case 'Steve':
      return getSteve();
    case 'Terry':
      return getTerry();
    case 'John':
      return getJohn();
  }
}

export function getSteve(): Vendor {
  return {
    name: 'Steve',
    material_count: new Map([['copper', 25]]),
    shape_list: [],
    associate_list: null,
  };
}

export function getTerry(): Vendor {
  return {
    name: 'Terry',
    material_count: new Map([['stone', 25]]),
    shape_list: ['spear'],
    associate_list: null,
  };
}

export function getJohn(): Vendor {
  return {
    name: 'John',
    material_count: new Map([['iron', 25]]),
    shape_list: ['pick'],
    associate_list: null,
  };
}
