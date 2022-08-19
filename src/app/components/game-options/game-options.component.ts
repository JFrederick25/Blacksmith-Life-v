import { Component } from '@angular/core';

@Component({
  selector: 'game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css'],
})
export class GameOptionsComponent {
  selectedOption = '';

  optionSelect(option: string) {
    this.selectedOption = option;
  }
}
