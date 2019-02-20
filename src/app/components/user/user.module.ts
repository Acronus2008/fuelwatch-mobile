import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

const routes: Routes = [
        {path: '', redirectTo: 'profile', pathMatch: 'full'},
        {path: 'profile', component: ProfileComponent},
        {path: 'settings', component: SettingsComponent}
    ]
;

@NgModule({
    declarations: [ProfileComponent, SettingsComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes)
    ]
})
export class UserModule {
}
