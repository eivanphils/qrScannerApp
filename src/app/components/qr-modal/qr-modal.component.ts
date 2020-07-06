import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss'],
})
export class QrModalComponent implements OnInit {
  @Input() scannerCode: any;

  encodeData: any;

  constructor(
    private modalCtr: ModalController,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    console.log('open modal');
    this.generateQrCode();
  }

  generateQrCode() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.scannerCode)
      .then(
        encodedData => {
          this.encodeData = encodedData;
        },
        err => {
          console.log(err);
        }
    );
  }

  closeModal() {
    this.modalCtr.dismiss();
  }

}
