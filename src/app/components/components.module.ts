import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  entryComponents: [MapComponent],
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
