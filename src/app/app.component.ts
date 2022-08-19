import { Component, VERSION } from '@angular/core';
import { PlayerData } from './models/playerData';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  selectedTab: string = 'Materials';
  playerData: PlayerData = new PlayerData();
  
  tabSelect(value: string) {
    this.selectedTab = value;
  }

  setBackgroundColor(value: string) {
    if (this.selectedTab === value) {
      return 'lightgray';
    }
  }
}
