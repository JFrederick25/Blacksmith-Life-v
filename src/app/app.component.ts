import { Component, VERSION } from '@angular/core';
import { PlayerData } from './models/playerData';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedTab: string = 'Materials';
  playerData: PlayerData = new PlayerData();

  constructor() {
    this.playerData.craftedItems.push({
      shape: 'dagger',
      material: 'copper',
      enchantment: null,
      improveScore: 0,
      enhanceScore: 0,
      status: ''
    });
  }

  tabSelect(value: string) {
    this.selectedTab = value;
  }

  setBackgroundColor(value: string) {
    if (this.selectedTab === value) {
      return 'lightgray';
    }
  }
}
