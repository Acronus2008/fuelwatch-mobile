import {Component, OnInit} from '@angular/core';
import {GasStation} from '../../../model/gas-station';
import {GasStationService} from '../../../services/gas-station.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    gas_stations: GasStation[];

    constructor(private gasStationService: GasStationService, private route: ActivatedRoute, private router: Router) {
        this.gasStationService.listGasStations().subscribe(response => {
            this.gas_stations = this.gasStationService.mapGasStations(response);
            console.log(this.gas_stations);
        });

    }

    ngOnInit() {
    }

    goToStation(station) {
        this.gasStationService.setActualGasStation(station);
        this.router.navigate(['profile'], {relativeTo: this.route});
    }

}
