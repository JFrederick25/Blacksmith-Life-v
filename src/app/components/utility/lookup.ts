import { CraftedItem } from '../../models/craftedItem';

export function lookupMaterialValue(material: string): number {
  switch (material) {
    case 'wood':
      return 1;
    case 'stone':
      return 2;
    case 'copper':
      return 5;
    case 'tin':
      return 8;
    case 'silver':
      return 15;
    case 'gold':
      return 40;
  }
}

export function lookupShapeValue(shape: string): number {
  switch (shape) {
    case 'club':
      return 5;
    case 'dagger':
      return 10;
    case 'axe':
      return 15;
    case 'sword':
      return 25;
  }
}

export function lookupEnchValue(ench: string): number {
  switch (ench) {
    case 'magic':
      return 50;
  }
}

export function lookupImproveScoreFactor(score: number): number {
  if (score >= 1 && score < 4) return 5;
  if (score >= 4 && score < 8) return 4;
  if (score >= 8 && score < 12) return 3;
  if (score >= 12 && score < 16) return 2;
  if (score >= 16) return 1;

  return 0;
}

export function lookupImprovedValue(score): number {
  let val = lookupImproveScoreFactor(score);
  if (score > 1) {
    val += lookupImprovedValue(score - 1);
  }
  return val;
}

export function lookupEnhancetScoreFactor(score: number): number {
  switch (score) {
    case 0:
      return 0;
    case 1:
      return 0.15;
    case 2:
      return 0.25;
    case 3:
      return 0.35;
    case 4:
      return 0.45;
    case 5:
      return 0.6;
    case 6:
      return 0.75;
    case 7:
      return 0.9;
  }

  if (score < 0) return -0.25;

  if (score >= 7) return 1.3;
}

export function lookupTotalEnhancementFactor(score): number {
  let val = lookupEnhancetScoreFactor(score);
  if (score > 1) {
    val += lookupTotalEnhancementFactor(score - 1);
  }
  return val;
}

export function lookupEnhancedValue(score): number {
  let val = lookupEnhancetScoreFactor(score);
  if (score > 1) {
    val += lookupEnhancedValue(score - 1);
  }
  return val;
}

export function lookupEnhanceBrokenFactor(item: CraftedItem): number {
  if (item.status !== 'broken') {
    return 0;
  }

  const baseBreakFactor: number = 0.9;
  let enhanceBreakFactor = 0;
  const totalEnhanceFactor = lookupTotalEnhancementFactor(item.enhanceScore);
  if (totalEnhanceFactor > 0 && totalEnhanceFactor < 1)
    enhanceBreakFactor = item.enhanceScore * 0.1;
  else if (totalEnhanceFactor > 1 && totalEnhanceFactor < 3)
    enhanceBreakFactor = item.enhanceScore * 0.17;
  else if (totalEnhanceFactor > 3 && totalEnhanceFactor < 6)
    enhanceBreakFactor = item.enhanceScore * 0.24;
  else if (totalEnhanceFactor > 6)
    enhanceBreakFactor = item.enhanceScore * 0.32;

  return baseBreakFactor + enhanceBreakFactor;
}

export function lookupImproveBrokenFactor(item: CraftedItem): number {
  if (item.status !== 'broken') {
    return 1;
  }

  const baseBreakFactor: number = 0.1;
  let improvedBreakFactor = 0;
  if (item.improveScore > 0) improvedBreakFactor += item.improveScore * 0.1;
  if (item.improveScore > 4) improvedBreakFactor += item.improveScore * 0.05;
  if (item.improveScore > 8) improvedBreakFactor += item.improveScore * 0.03;
  if (item.improveScore > 12) improvedBreakFactor += item.improveScore * 0.02;
  if (item.improveScore > 16) improvedBreakFactor += item.improveScore * 0.01;

  return baseBreakFactor + improvedBreakFactor;
}
