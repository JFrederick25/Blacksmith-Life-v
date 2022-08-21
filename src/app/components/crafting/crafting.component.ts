import { Component, Input } from '@angular/core';
import { CraftedItem } from '../../models/craftedItem';
import { EnchantingWord } from '../../models/enchantingWord';
import { PlayerData } from '../../models/playerData';
import {
  getEnchantingAdjective,
  getEnhanceWord,
  getMaterialAdjective,
} from '../utility/formatter';

@Component({
  selector: 'crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.css'],
})
export class CraftingComponent {
  @Input() playerData: PlayerData;

  selectedMenu: string = 'Improvement';

  setBackgroundColor(value: string) {
    if (this.selectedMenu === value) {
      return 'lightgray';
    }
  }

  selectOption(value: string) {
    this.selectedMenu = value;
  }

  formatDescription(item: CraftedItem): string {
    const materialWord: string = getMaterialAdjective(item.material);
    const shapeWord: string = item.shape;
    const enchantingWord: EnchantingWord = getEnchantingAdjective(
      item.enchantment
    );

    const enhanceWord = getEnhanceWord(item.enhanceScore);

    let formattedWord = enhanceWord + ' ' + materialWord + ' ' + shapeWord;

    if (enchantingWord.pos) {
      formattedWord = enchantingWord.adj + ' ' + formattedWord;
    } else {
      formattedWord = formattedWord + ' ' + enchantingWord.adj;
    }

    if (item.status === 'broken') {
      formattedWord = item.status + ' ' + formattedWord;
    }

    if (item.improveScore > 0) {
      formattedWord = formattedWord + ' +' + item.improveScore;
    }

    return formattedWord;
  }

  reset(item: CraftedItem) {
    item.status = '';
  }

  improveItem(item: CraftedItem) {
    if (item.status === 'broken') {
      return;
    }

    const randScore = Math.trunc((Math.random() * 100) + 1);

    if (randScore < 10) {
      item.status = "broken";
    } else {
      item.improveScore += 1;
      if (item.improveScore % 8 === 0) {
        item.enhanceScore++;
      }
    }
  }

  enhanceItem(item: CraftedItem) {
    if (item.status === 'broken') {
      return;
    }

    const randScore = Math.trunc((Math.random() * 100) + 1);

    if (randScore < 20) {
      item.enhanceScore -= 1;
    } else {
      item.enhanceScore += 1;
    }
  }

  recoverItem(item: CraftedItem) {
    
  }

}
