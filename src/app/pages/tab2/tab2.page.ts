import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Register } from '../../models/register.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    protected dataLocalService: DataLocalService
    ) {}

  openCode(scannerCode: Register) {
   this.dataLocalService.openCode(scannerCode);
  }

  sendMail() {}
}
