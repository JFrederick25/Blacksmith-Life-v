import { Component } from '@angular/core';
import { IdService } from './components/utility/id.service';
import { PlayerData } from './models/playerData';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedTab: string = 'Crafting';
  playerData: PlayerData = new PlayerData();

  constructor(private idService: IdService ) {
    this.playerData.craftedItems.push({
      id: idService.getID(),
      shape: 'dagger',
      material: 'copper',
      enchantment: null,
      improveScore: 0,
      enhanceScore: 0,
      status: '',
      value: 15,
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
