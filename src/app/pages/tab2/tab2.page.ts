import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Register } from '../../models/register.model';
import { AlertController, ModalController } from '@ionic/angular';
import { QrModalComponent } from '../../components/qr-modal/qr-modal.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    protected dataLocalService: DataLocalService,
    private alertCtrl: AlertController,
    private modalCtr: ModalController,
    private barcodeScanner: BarcodeScanner
    ) {}

  openCode(scannerCode: Register) {
   this.dataLocalService.openCode(scannerCode);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Enviar historial por correo',
      subHeader: 'Indique a quien desea enviar el correo',
      inputs: [
        {
          name: 'sendTo',
          type: 'text',
          id: 'to',
          placeholder: 'mail@gmail.com'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelado');
          }
        },
        {
          text: 'Enviar',
          handler: (data) => {
            console.log('data alert present', data);

            this.dataLocalService.sendMail(data.sendTo);
          }
        }
      ]
    });

    await alert.present();
  }

  generateQr(scannerCode: Register) {
    this.barcodeScanner
    .encode(this.barcodeScanner.Encode.TEXT_TYPE, scannerCode)
    .then(
      response => {
        console.log(response);

      },
      err => {
        console.log(err);
      }
    );
  }
}
