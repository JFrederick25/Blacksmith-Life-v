import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameOptionsComponent } from './components/game-options/game-options.component';
import { MaterialsComponent } from './components/materials/materials.component';
import { CraftingComponent } from './components/crafting/crafting.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, GameOptionsComponent, MaterialsComponent, CraftingComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
