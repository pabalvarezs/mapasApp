import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa{
        height : 100%;
        width: 100%;
      }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6496911736008,-33.477557108860914 ],
      zoom: 17
    });
  }

}
