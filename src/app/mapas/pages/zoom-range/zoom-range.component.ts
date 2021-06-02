import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  mapa!: mapboxgl.Map;
  zoomLevel : number = 10;
  center: [number,number] = [-70.6496911736008,-33.477557108860914 ];

  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom',() => {})
    this.mapa.off('zoomend',() => {})
    this.mapa.off('move',() => {})
  }

  ngAfterViewInit(): void {
     this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    

    this.mapa.on('zoom', () => { this.zoomLevel = this.mapa.getZoom() });

    this.mapa.on('zoomend', (ev) => {
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move',(event) =>{
      const target = event.target;
      const {lng,lat} = target.getCenter();
      this.center = [lng,lat];
    });

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
