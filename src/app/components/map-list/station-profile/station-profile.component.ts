import {Component, OnDestroy, OnInit} from '@angular/core';
import {GasStation} from '../../../model/gas-station';
import {GasStationService} from '../../../services/gas-station.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MapService} from '../../../services/map.service';
import {ActivatedRoute, Router} from '@angular/router';
// import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {CallNumber} from '@ionic-native/call-number/ngx';
import {Facebook} from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {LoadingController} from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import * as html2canvas from 'html2canvas';

declare var MarkerClusterer: any;

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
    mapOptions: any;
    mapMarkers: { latitude: any, longitude: any };

    text: 'Check out the Ionic Academy!';
    url: 'https://ionicacademy.com';

    private fileTransfer: FileTransferObject;

    constructor(private stationService: GasStationService, private mapService: MapService,
                private router: Router, private route: ActivatedRoute, private callNumber: CallNumber,
                public loadingController: LoadingController,
                private facebook: Facebook,
                private nativeStorage: NativeStorage,
                private socialSharing: SocialSharing, private file: File,
                private transfer: FileTransfer) {

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

    async shareFacebook() {
        //const file = await this.resolveLocalFile();
        const imageMapUrl = this.getSnapShotFromMap(this.station.latitude, this.station.longitude);

        imageMapUrl.then((image)=> {
           console.log(image);
        });


        const fileName = 'imageMap_' + Math.random().toString(10) + '.png';

        // await this.downloadFile(fileName, imageMapUrl);
        // const fileNameUrl = await this.resolveLocalFile(fileName);

        // Image or URL works
        this.socialSharing.shareViaFacebook(null, '', null).then(() => {
            //this.removeTempFile(file.name);
        }).catch((e) => {
            // Error!
        });
    }

    async shareTwitter() {
        // Either URL or Image
        this.socialSharing.shareViaTwitter(null, null, this.url).then(() => {
            // Success
        }).catch((e) => {
            // Error!
        });
    }

    resolveLocalFile(fileName) {
        return this.file.copyFile(this.file.applicationDirectory, fileName, this.file.cacheDirectory, `${new Date().getTime()}.jpg`);
    }

    async downloadFile(fileName, filePath) {
        const url = encodeURI(filePath);
        this.fileTransfer = this.transfer.create();
        this.fileTransfer.download(url, this.file.externalRootDirectory + fileName, true).then((entry) => {
            // here logging our success downloaded file path in mobile.
            console.log('download completed: ' + entry.toURL());
        }, (error) => {
            // here logging our error its easier to find out what type of error occured.
            console.log('download failed: ' + error);
        });
    }

    removeTempFile(name) {
        this.file.removeFile(this.file.cacheDirectory, name);
    }

    sharedGasStation() {

        // this.userIsLogged().then((logged) => {
        //
        //     console.log(logged);
        //     if (logged.logged === false) {
        //         this.router.navigate(['login']);
        //         return;
        //     }
        //
        //     if (logged.with === 'facebook') {
        //         this.sharedGasStationWithFacebook();
        //     }
        // });



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
        let loggedObject: Promise<{ with: string; logged: any } | never>;

        loggedObject = this.checkIfUserLoggedWithFacebook().then((interconnected) => {
            console.log(interconnected);
            return { with: 'facebook', logged: interconnected };
        });

        console.log(loggedObject);
        return loggedObject;
    }

    async LoadMap() {
        try {
            const center = new google.maps.LatLng(parseFloat(this.station.latitude), parseFloat(this.station.longitude));
            const options = {
                'zoom': 15,
                'center': center,
                'mapTypeId': google.maps.MapTypeId.ROADMAP
            };

            this.mapOptions = options;

            this.map = new google.maps.Map(document.getElementById('map_canvas'), options);
        } catch (e) {
            console.log(e);
        }
    }

    private checkIfUserLoggedWithFacebook() {
        let userLoggedWithFacebook: Promise<any | never>;

        const localFacebookUser =  this.nativeStorage.getItem('facebook_user');

        if (localFacebookUser) {
            userLoggedWithFacebook = this.facebook.getLoginStatus().then((conection) => {
                return conection.status === 'connected';
            });
        }

        return userLoggedWithFacebook;
    }

    private sharedGasStationWithFacebook() {
        const imageMapUrl = this.getSnapShotFromMap(this.station.latitude, this.station.longitude);
        console.log(imageMapUrl);
        this.facebook.showDialog({
            method: 'share',
            picture: imageMapUrl,
            name: this.station.trading_name,
            message: 'Shared from FuelWatch App',
            caption: 'Testing using phonegap plugin',
            description: this.station.description
        }).then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e);
        });
    }

    async getSnapShotFromMap(latitude, longitude) {
        let staticMapUrl = 'https://maps.googleapis.com/maps/api/staticmap';
        staticMapUrl += '?key=AIzaSyApPBMD9n7kHiz556ce1gu9E4FYUKpLJPM' +
            '&center=' + latitude + ',' + longitude + '' +
            '&size=220x350' +
            '&zoom=' + this.mapOptions.zoom + '' +
            '&maptype=' + this.mapOptions.mapTypeId + '' +
            '&markers=color:red|' + parseFloat(this.mapMarkers.latitude) + ',' + parseFloat(this.mapMarkers.longitude);
        console.log(staticMapUrl);


        //TODO Tony esto es para capturar una imagen del mapa y compartirla, esto hay que hacerlo para compartir una imagen del mapa de la estacion
        /*
        * he tratado de hacerlo pero no me funciona, estoy usando el social sharing para compartir
        * esperemos que funciones
        * */

        const staticLink = '<img src="' + staticMapUrl + '"/>';
        let linkDiv = document.getElementById('map_canvas_static');
        linkDiv.innerHTML = staticLink;
        let image = null;
        await html2canvas(linkDiv).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            image = imgData;
        });

        return image;
    }

    private setStationMarketToMap() {
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
            icon: './assets/marker/map_market.svg'
            // Otras propiedades. Por ejemplo el icono de cada marker
        });

        google.maps.event.addListener(marker, 'click', (function (m) {
            return function () {
                console.log(marker);
            };
        })(marker));
        markers.push(marker);
        this.mapMarkers = {latitude: this.station.latitude, longitude: this.station.longitude};
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
