import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GasStation} from '../../../model/gas-station';
import {GasStationService} from '../../../services/gas-station.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MapService} from '../../../services/map.service';
import {ActivatedRoute, Router} from '@angular/router';
declare var MarkerClusterer: any;
// import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
    selector: 'app-station-profile',
    templateUrl: './station-profile.component.html',
    styleUrls: ['./station-profile.component.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({transform: 'translateY(100%)'}),
                animate('1s 100ms cubic-bezier(.52,1.18,.96,.84)', style({transform: 'translateY(0%)'}))
            ]),
            transition(':leave', [
                animate('1s cubic-bezier(.52,1.18,.96,.84)',
                    style({transform: 'translateY(100%)'})
                )
            ])
        ])
    ]
})
export class StationProfileComponent implements OnInit, OnDestroy {
    station: GasStation;
    show_profile_data = false;
    isLogged = false;
    map: any;

    constructor(private stationService: GasStationService, private mapService: MapService,
                private router: Router, private route: ActivatedRoute, private callNumber: CallNumber) {
        this.station = this.stationService.getActualGasStation();
        this.isLogged = localStorage['isLogged'];

        console.log(this.station);
    }

    async ngOnInit() {
        try {
            await this.LoadMap();
            this.setStationMarketToMap();
            setTimeout(() => this.show_profile_data = true, 100);
        } catch (e) {
            console.log('We have problem to load the map');
        }
    }

    ngOnDestroy(): void {
        this.show_profile_data = false;
    }

    sharedGasStation() {

        if (!this.userIsLogged()) {
            this.router.navigate(['login']);
            return;
        }

        console.log(this.station);
    }

    goToGasStation() {
        console.log('try to go gas station');
        console.log('longitude: ' + this.station.longitude + ' latitude: ' + this.station.latitude);
        console.log('address : ' + this.station.address);

    }

    viewGasStationImages() {
        /*we don't know how to view that images, research about wath services we can use for that*/
        console.log('try to view gas stations images');
        console.log(this.station);
    }

    addFavoriteGasStation() {
        console.log('try to add this gas station to favorite');

        if (!this.userIsLogged()) {
            this.router.navigate(['login']);
            return;
        }

        console.log(this.station);
    }

    callToGasStation() {
        console.log('try to call to this gasStation');
        console.log(this.station);
        this.callNumber.callNumber(this.station.phone, true)
            .then(res => console.log('Launcher dialer', res))
            .catch(err => console.log('Error launching dialer', err));
    }

    /*Verify if the user is logged for make some actions in this view*/
    userIsLogged() {
        return true;
        // return 'true' === this.isLogged;
    }

    async LoadMap() {
        try {
            const center = new google.maps.LatLng(parseFloat(this.station.latitude), parseFloat(this.station.longitude));
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

    setStationMarketToMap() {
        const markers = [];
        const marker = new google.maps.Marker({
            position: {lat: parseFloat(this.station.latitude), lng: parseFloat(this.station.longitude)},
            label: {
                text: `$${this.station.price}`,
                color: 'white',
                fontSize: '8px'
                // Add in the custom label here
                // fontFamily: 'Roboto, Arial, sans-serif, custom-label-' + label
            },
            icon: './assets/marker/marker BP.png'
            // Otras propiedades. Por ejemplo el icono de cada marker
        });

        google.maps.event.addListener(marker, 'click', (function (m) {
            return function () {
                console.log(marker);
            };
        })(marker));
        markers.push(marker);

        const clusterStyles = [
            {
                textColor: 'white',
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
    }
}
