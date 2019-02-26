import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NgxXml2jsonService} from 'ngx-xml2json';
import {GasStation} from '../model/gas-station';

import { environment, FUELWATCH_RSS_URL } from '../../environments/environment';

@Injectable()
export class GasStationService {
    selectedGasStation: GasStation;

    constructor(private http: HttpClient, private xml2json: NgxXml2jsonService) {
    }

    listGasStations(): Observable<any> {
        const headers = new HttpHeaders({
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Origins' : '*'
        });
        const params = new HttpParams({fromString: 'Product=1&Suburb=Albany&Surrounding=no'});
        return this.http.get(FUELWATCH_RSS_URL, {
                headers: headers, params: params, responseType: 'text'
            }
        );

        // return this.http.get('http://localhost:3002/fuelWatchRSS/Suburb/Albany/Surrounding?Product=1&Suburb=Albany&Surrounding=no',
        //     {responseType: 'text'});
    }

    mapGasStations(xml_response) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xml_response, 'text/xml');
        const obj = this.xml2json.xmlToJson(xml);
        return obj['rss'].channel.item.map(o => {
            delete Object.assign(o, {['trading_name']: o['trading-name']})['trading-name'];
            return o;
        });
    }

    getActualGasStation() {
        return this.selectedGasStation;
    }

    setActualGasStation(station) {
        this.selectedGasStation = station;
    }
}
