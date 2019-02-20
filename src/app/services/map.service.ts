import {ElementRef, Injectable} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Environment, GoogleMap, GoogleMaps, GoogleMapsEvent, Marker, MarkerCluster} from '@ionic-native/google-maps';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {NgxXml2jsonService} from 'ngx-xml2json';

declare var google;

@Injectable({
    providedIn: 'root'
})
export class MapService {
    map: GoogleMap;

    constructor() {
        console.log('try to initialize map');
    }

    loadMapJs(mapElement: any) {

        let mapProfile: any;

        try {
            const options = {
                zoom: 18,
                center: {
                    lat: -35.0031,
                    lng: 117.86595
                }
            };

            this.map = google.maps.Map(mapElement, options);
            mapProfile = this.map;
        } catch (e) {
            console.log('We have a problem to get a map ${e}', e);
        }

        return mapProfile;
    }

    loadMap(id) {
        console.log('try to launch the map');
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyApPBMD9n7kHiz556ce1gu9E4FYUKpLJPM',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyApPBMD9n7kHiz556ce1gu9E4FYUKpLJPM'
        });

        this.map = GoogleMaps.create(id, {
            camera: {
                // -35.0031, 117.86595
                target: {
                    lat: -35.0031,
                    lng: 117.86595
                },
                zoom: 18,
                tilt: 30
            }
        });

        return this.map;
    }

    addCluster(data) {
        let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
            markers: data,
            icons: [
                {
                    min: 3,
                    max: 9,
                    url: './assets/marker/small.png',
                    label: {
                        color: 'white'
                    }
                }
            ]
        });

        markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
            console.log(params);
        });
    }

}
