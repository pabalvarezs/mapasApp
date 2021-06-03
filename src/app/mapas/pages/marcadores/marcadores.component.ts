import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color :string;
  marker?: mapboxgl.Marker;
  centro?: [number,number];
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    #mapaZoom{
      height : 100%;
      width: 100%;
    }
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;

    }
    li {
      cursor: pointer;
    }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit{

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel : number = 15;
  center: [number,number] = [-70.6496911736008,-33.477557108860914 ];

  // Arreglo marcadores

  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();
    
  //   // const marcadorHtml : HTMLElement = document.createElement('div');
  //   // marcadorHtml.innerHTML = 'Hola Mundo'

  //   const marcador = new mapboxgl.Marker(
  //     // { element: marcadorHtml   }
      
  //   )
  //     .setLngLat(this.center)
  //     .addTo(this.mapa)
  }
  irMarcador(mark :MarcadorColor){
    this.mapa.flyTo( {
      center: mark.marker!.getLngLat(),
      zoom: 18
    })

  }
  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador =  new mapboxgl.Marker(
      { draggable:true, color:color }
    )
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

  }

  guardarMarcadoresLocalStorage(){
    const lngLatArr : MarcadorColor[] = [];
    this.marcadores.forEach( m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro:[lng,lat]
      });

      localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
    })
  }

  leerLocalStorage(){
    if (! localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr : MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!); 
    
    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({ color: m.color, draggable:true})
        .setLngLat(m.centro!)
        .addTo(this.mapa)

        this.marcadores.push({
          marker: newMarker,
          color: m.color 
        })
    })



  }
}
