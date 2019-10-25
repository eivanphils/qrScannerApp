import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController, ModalController } from '@ionic/angular';
import { MapComponent } from '../components/map/map.component';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  savedCodes: Register[] = [];

  constructor(
    private storage: Storage,
    private iab: InAppBrowser,
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
}
