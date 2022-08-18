import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  selectedTab: string = 'Game';
  
  tabSelect(value: string) {
    this.selectedTab = value;
  }

  setBackgroundColor(value: string) {
    if (this.selectedTab === value) {
      return 'lightgray';
    }
  }

}
