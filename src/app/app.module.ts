import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameOptionsComponent } from './components/game-options/game-options.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, GameOptionsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
