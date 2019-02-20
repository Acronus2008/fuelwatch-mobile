import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GasStation} from '../../../model/gas-station';
import {GasStationService} from '../../../services/gas-station.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MapService} from '../../../services/map.service';
import {ActivatedRoute, Router} from '@angular/router';

// import {animate, keyframes, style, transition, trigger} from "@angular/animations";

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

    constructor(private stationService: GasStationService, private mapService: MapService,
                private router: Router, private route: ActivatedRoute) {
        this.station = this.stationService.getActualGasStation();
        this.isLogged = localStorage['isLogged'];

        console.log(this.station);
    }

    async ngOnInit() {
        setTimeout(() => this.show_profile_data = true, 100);
        await this.mapService.loadMapJs(document.getElementById('map'));
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
    }

    /*Verify if the user is logged for make some actions in this view*/
    userIsLogged() {
        return true;
        // return 'true' === this.isLogged;
    }
}
