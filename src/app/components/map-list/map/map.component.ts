/// <reference types="@types/googlemaps" />
import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {NgxXml2jsonService} from 'ngx-xml2json';
import {GasStationService} from '../../../services/gas-station.service';
import {GasStation} from '../../../model/gas-station';
import {MapService} from '../../../services/map.service';
import 'js-marker-clusterer';
import {ActivatedRoute, Router} from '@angular/router';
declare var MarkerClusterer: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    map: any;
    gas_stations: GasStation[];
    cluster_data: any[];
    // loading: any;
    // require: any;
    @ViewChild('map') mapElement: ElementRef;
    @Output() open: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private platform: Platform, private xml2json: NgxXml2jsonService, private gasStationService: GasStationService,
        private mapService: MapService, private route: ActivatedRoute, private router: Router) {
        console.log(this.gas_stations);
    }

    async ngOnInit() {
        await this.platform.ready();

        // await this.mapService.loadMap();

        // await this.mapService.loadMap('map_canvas');
        // this.map = await this.mapService.loadMapJs(this.mapElement);

        try {
            await this.LoadMap();
            this.gasStationService.listGasStations().subscribe((response: GasStation[]) => {
                const stations = this.gasStationService.mapGasStations(response);
                console.log(stations);
                console.log(this.map);
                const markers = [];
                stations.map(function (station, i) {
                    const marker = new google.maps.Marker({
                        position: {
                            lat: parseFloat(station.latitude),
                            lng: parseFloat(station.longitude)
                        },
                        label: {
                            text: '$' + station.price,
                            color: 'white',
                            fontSize: '8px'

                            // Add in the custom label here
                            // fontFamily: 'Roboto, Arial, sans-serif, custom-label-' + label
                        },
                        icon: {
                            url: './assets/marker/map_market.svg'
                        }
                        // Otras propiedades. Por ejemplo el icono de cada marker
                    });

                    google.maps.event.addListener(marker, 'click', ((m) => {
                            return function () {
                               console.log(m);
                               console.log(marker);
                                // window.location.href = '/home/list/profile';
                            };
                    })(marker));

                    markers.push(marker);
                });

                const clusterStyles = [
                    {
                        textColor: 'white',
                        // url: './assets/marker/cluster/m1.png',
                        url: './assets/marker/cluster/m1.png',
                        height: 50,
                        width: 50
                    }
                ];

                const mcOptions = {
                    gridSize: 50,
                    styles: clusterStyles,
                    maxZoom: 15
                };

                console.log(markers);
                const mc = new MarkerClusterer(this.map, markers, mcOptions);
            });
        } catch (e) {
            console.log('We have a problem to load the map ${0}', e);
        }
    }

    async LoadMap() {
        try {
            const center = new google.maps.LatLng(-35.0031, 117.86595);
            const options = {
                'zoom': 15,
                'center': center,
                'mapTypeId': google.maps.MapTypeId.ROADMAP
            };

            this.map = new google.maps.Map(document.getElementById('map_canvas'), options);
        } catch (e) {
            console.log(e);
        }
    }

}
