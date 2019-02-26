/// <reference types="@types/googlemaps" />
import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {NgxXml2jsonService} from 'ngx-xml2json';
import {GasStationService} from '../../../services/gas-station.service';
import {GasStation} from '../../../model/gas-station';
import {MapService} from '../../../services/map.service';
import 'js-marker-clusterer';
import {ActivatedRoute, Router} from '@angular/router';
import {NgZone} from '@angular/core';

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
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    // loading: any;
    // require: any;
    @ViewChild('map') mapElement: ElementRef;
    @Output() open: EventEmitter<any> = new EventEmitter();

    constructor(
        private platform: Platform, private xml2json: NgxXml2jsonService, private gasStationService: GasStationService,
        private mapService: MapService, private route: ActivatedRoute, private router: Router, private ngZone: NgZone) {
        console.log(this.gas_stations);
        (<any>window).ionicPageRef = {
            zone: ngZone,
            component: this
        };
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
                    console.log(station.latitude + ',' + station.longitude);
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


                    const popupContent = '<div>\n' +
                        '<p style="color: black">' + station.description + '</p>\n' +
                        '        <div float-end="">\n' +
                        '            <a>GO TO</a>\n' +
                        '            <ion-button color="primary" size="small" id="go_to_button">GO TO</ion-button>\n' +
                        '            <ion-button color="primary" size="small" href="/home/list/profile">PROFILE</ion-button>\n' +
                        '        </div>\n' +
                        '\n' +
                        '    </div>';
                    const infowindow = new google.maps.InfoWindow({
                        content: popupContent
                    });

                    google.maps.event.addListener(infowindow, 'domready', () => {
                        document.getElementById('go_to_button').addEventListener('click', kebbab);

                        function kebbab() {
                      /*      this.ngZone.run(() => {
                                this.calculateAndDisplayRoute();
                            });
                      */  }

                    });
                    marker.addListener('click', function () {
                        console.log(marker.getPosition());
                        infowindow.open(this.map, marker);
                    });

                    markers.push(marker);
                });

                this.calculateAndDisplayRoute();

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
            this.directionsDisplay.setMap(this.map);
            const marker = new google.maps.Marker({
                position: {
                    lat: -35.0031,
                    lng: 117.86595
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    calculateAndDisplayRoute() {
        // this.zone.run(() => {
            console.log('Calculando ruta');
            const start = '-35.0031, 117.86595';
            const end = '-35.008551,117.724325';
            const request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            this.directionsService.route(request, (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        // });
    }

// -35.004623,117.866163
    // map.component.ts:52 -35.005762,117.866879
    // map.component.ts:52 -34.985495,117.851724
    // map.component.ts:52 -34.988578,117.876293
    // map.component.ts:52 -35.005628,117.874414
    // map.component.ts:52 -35.021947,117.883248
    // map.component.ts:52 -35.068075,117.869841
    // map.component.ts:52 -35.020486,117.881858
    // map.component.ts:52 -34.959873,117.886725
    // map.component.ts:52 -35.016939,117.891121
    // map.component.ts:52 -35.012389,117.871372
    // map.component.ts:52 -34.949189,117.943697
    // map.component.ts:52 -34.928763,117.915201
    // map.component.ts:52 -35.009033,117.899664
    // map.component.ts:52 -35.009939,117.870426
    // map.component.ts:52 -34.981779,117.922103
    // map.component.ts:52 -35.001225,117.855255
    // map.component.ts:52 -35.008551,117.724325
}
