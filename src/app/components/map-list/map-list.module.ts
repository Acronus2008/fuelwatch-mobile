import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {MapListComponent} from './map-list.component';
import {ListComponent} from './list/list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {GasStationService} from '../../services/gas-station.service';
import {AppComponent} from '../../app.component';
import {StationProfileComponent} from './station-profile/station-profile.component';
import { MapNativeComponent } from './map-native/map-native.component';

const routes: Routes = [
        {
            path: '', component: MapListComponent, children: [
                {path: '', redirectTo: 'map', pathMatch: 'full'},
                {path: 'map', component: MapComponent},
                {path: 'list', component: ListComponent},
                {path: 'list/profile', component: StationProfileComponent}
            ]
        },
        {
            // path: 'station/profile', component: StationProfileComponent
        }
    ]
;

@NgModule({
    declarations: [MapComponent, MapListComponent, ListComponent, StationProfileComponent, MapNativeComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        GasStationService,
        // HttpClient
    ]
})


export class MapListModule {
}
