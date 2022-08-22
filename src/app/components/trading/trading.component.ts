import { Component, Input, OnInit } from '@angular/core';
import { PlayerData } from '../../models/playerData';

@Component({
  selector: 'trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {
  @Input() playerData: PlayerData;

  constructor() { }

  ngOnInit() {
  }

}