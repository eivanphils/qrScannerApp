import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpt = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    protected dataLocalService: DataLocalService ) {}

  scanCode() {
    this.barcodeScanner.scan().then (barcodeData => {
      console.log('barcodedata', barcodeData);
    }).catch(err => {
      console.log('Error', err);
      this.dataLocalService.saveCodeScanned('QrCode', 'https://google.com');
    });
  }
}
