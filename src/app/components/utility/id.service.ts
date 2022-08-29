import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  id: number;

  constructor() {
    this.id = 0;
  }

  getID(): number {
    this.id++;
    return this.id;
  }
}
