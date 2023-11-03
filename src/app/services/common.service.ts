import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private url = 'https://localhost:7060/api/';

  constructor() { }

  getUrl(): string {
    return this.url;
  }
}
