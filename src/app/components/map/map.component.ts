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
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.longitude, this.latitude],
      zoom: 17,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {

      const marker = new mapboxgl.Marker({
        dragrable: false
      }).setLngLat([this.longitude, this.latitude]).addTo(map);

      map.resize();
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        labelLayerId = layers[i].id;
        break;
        }
      }

      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',

        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        'fill-extrusion-height': [
        'interpolate', ['linear'], ['zoom'],
        15, 0,
        15.05, ['get', 'height']
        ],
        'fill-extrusion-base': [
        'interpolate', ['linear'], ['zoom'],
        15, 0,
        15.05, ['get', 'min_height']
        ],
        'fill-extrusion-opacity': .6
        }
        }, labelLayerId);
      });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
