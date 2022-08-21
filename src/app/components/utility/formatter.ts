import { EnchantingWord } from "../../models/enchantingWord";

export function getMaterialAdjective(word: string): string {
  switch (word) {
    case "wood" : return "wooden";
  }

  return word;
}

export function getEnchantingAdjective(word: string): EnchantingWord {
  switch (word) {
    case "magic": return {adj: "magical", pos: true};
  }

  return {adj: '', pos: false};
}

export function getEnhanceWord(score: number): string {
  switch (score) {
    case -2: return "crude";
    case -1: return "flawed";
    case 0: return "standard";
    case 1: return "good";
    case 2: return "improved";
    case 3: return "great";
    case 4: return "excelent";
    case 5: return "master";
    case 6: return "perfect";
    case 7: return "ultimate";
  }

  if (score > 7) return "ultimate +" + (score - 7);

  if (score < -2) return "garbage";
}