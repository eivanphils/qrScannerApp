import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() latitude: number;
  @Input() longitude: number;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWl2YW5waGlscyIsImEiOiJjazFtbmdiYWIwMm1qM2VwczhjaGpwczZ5In0.714ymZn9tTBUWpjJxBcJOw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.latitude, this.longitude],
      zoom: 17
    });

    map.addControl(new mapboxgl.NavigationControl());
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
