import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { NavController, ModalController } from '@ionic/angular';
import { MapComponent } from '../components/map/map.component';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  savedCodes: Register[] = [];
  sendTo: string;

  constructor(
    private storage: Storage,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {
    this.getSavedCodes();
   }

  async saveCodeScanned(format: string, text: string) {
    await this.getSavedCodes();

    const code = new Register(format, text);
    this.savedCodes.unshift(code);
    this.storage.set('qrCodes', this.savedCodes);

    this.openCode(code);
  }

  async getSavedCodes() {
    this.savedCodes = await this.storage.get('qrCodes') || [];
  }

  openCode(scannerCode: Register) {
    this.navCtrl.navigateForward('tabs/tab2');

    if (scannerCode.type === 'http') {
      this.iab.create(scannerCode.text, '_system');
    }

    if (scannerCode.type === 'geo') {
      this.presentModal(scannerCode.text);
    }
  }

  async presentModal(geo: string) {
    const data = geo.substr(4).split(',');

    const modal = await this.modalCtrl.create({
      component: MapComponent,
      componentProps: {
        latitude: Number(data[0]),
        longitude: Number(data[1])
      }
    });

    return await modal.present();
  }

  sendMail(sendTo: string) {
    this.sendTo = sendTo;

    const arrayTemp = [];
    const titles = 'Tipo, Formato, Creado en, Texto\n';

    arrayTemp.push(titles);

    this.savedCodes.forEach((code) => {
      const row = `${code.type}, ${code.format}, ${code.created}, ${code.text.replace(',', ' ')}\n`;
      arrayTemp.push(row);
    });

    this.createCsvFile(arrayTemp.join(''));
  }


  createCsvFile(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'codes.csv')
      .then( exist => {
        console.log('archivos existe');
        return this.writeInFile(text);
      })
      .catch( err => {
        return this.file.createFile(this.file.dataDirectory, 'codes.csv', false)
          .then( created => this.writeInFile(text))
          .catch( err2 => console.log('No se pudo crear el archivo', err2)
          );
      });
  }

  async writeInFile(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'codes.csv', text);

    const filePath = `${this.file.dataDirectory}codes.csv`;
    const email = {
      to: this.sendTo,
      attachments: [
        filePath
      ],
      subject: 'Historial de codigos escaneados',
      body: 'Hola, te envio el historial de los codigos escaneados desde la al QrScannerApp',
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
