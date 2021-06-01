import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
      width: 400px;
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  mapa!: mapboxgl.Map;
  zoomLevel : number = 10

  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
     this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6496911736008,-33.477557108860914 ],
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18);
      }
    })

  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();

  }

  zoomCambio( valor: string){
    this.mapa.zoomTo(Number(valor));
  }
}
