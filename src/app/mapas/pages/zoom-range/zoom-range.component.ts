import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    #mapaZoom{
      height : 100%;
      width: 100%;
    }

    .row {
      background-color : white;
      position: fixed;
      bottom: 50px;
      z-index: 999;
      left: 50px;
      border-radius: 5px;
    }
  `
  ]
})
export class ZoomRangeComponent implements OnInit {

  mapa!: mapboxgl.Map;


  constructor() { }

  ngOnInit(): void {
     this.mapa = new mapboxgl.Map({
      container: 'mapaZoom',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6496911736008,-33.477557108860914 ],
      zoom: 17
    });
  }

  zoomIn(){

  }

  zoomOut(){


  }
}
