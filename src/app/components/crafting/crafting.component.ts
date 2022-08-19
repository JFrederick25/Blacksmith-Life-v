import { Component, Input } from '@angular/core';
import { PlayerData } from '../../models/playerData';

@Component({
  selector: 'crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.css']
})
export class CraftingComponent {
  @Input() playerData: PlayerData;

}