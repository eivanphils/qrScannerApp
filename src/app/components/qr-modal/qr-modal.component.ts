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
    debugger

    this.generateQrCode();
  }

  generateQrCode() {

    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.scannerCode)
      .then(
        response => {
          this.encodeData = response;
          console.log(this.encodeData);

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
