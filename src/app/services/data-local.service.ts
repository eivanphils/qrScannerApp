import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  savedCodes: Register[] = [];

  constructor() { }


  saveCodeScanned(format: string, text: string) {
    const code = new Register(format, text);
    this.savedCodes.unshift(code);
    console.log('savedcodes', this.savedCodes);
  }
}
