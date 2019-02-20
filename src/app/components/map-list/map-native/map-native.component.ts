import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Environment, GoogleMap, GoogleMaps} from '@ionic-native/google-maps';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {NgxXml2jsonService} from 'ngx-xml2json';
import {GasStationService} from '../../../services/gas-station.service';
import {GasStation} from '../../../model/gas-station';
import {MapService} from '../../../services/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map-native.component.html',
    styleUrls: ['./map-native.component.scss']
})
export class MapNativeComponent implements OnInit {
    map: GoogleMap;
    gas_stations: GasStation[];
    cluster_data: any[];
    loading: any;

    @ViewChild('map') mapElement: ElementRef;

    constructor(
        private platform: Platform, private xml2json: NgxXml2jsonService, private gasStationService: GasStationService,
        private mapService: MapService) {
        console.log(this.gas_stations);
    }

    async ngOnInit() {
        await this.platform.ready();
        // await this.mapService.loadMap();

        await this.mapService.loadMap('map_canvas');
        this.gasStationService.listGasStations().subscribe(response => {
            this.gas_stations = this.gasStationService.mapGasStations(response);
            this.cluster_data = this.gas_stations.map((station: GasStation) =>
                ({position: {lat: parseFloat(station.latitude), lng: parseFloat(station.longitude)}, icon: 'assets/marker/marker.png'})
            );
            this.mapService.addCluster(this.cluster_data);
            console.log(this.cluster_data);
        });
        // this.mapService.addCluster()
    }




}
