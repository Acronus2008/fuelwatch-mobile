import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SignUpComponent} from './sign-up/sign-up.component';
import {FacebookService} from '../../services/facebook.service';
import {TwitterService} from '../../services/twitter.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
        {path: '', component: LoginComponent},
        {path: 'sign', component: SignUpComponent},
        {path: 'forgot', component: ForgotPasswordComponent}
    ]
;

@NgModule({
    declarations: [LoginComponent, SignUpComponent, ForgotPasswordComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes)
    ], providers: [
        FacebookService,
        TwitterService
    ]
})
export class LoginModule {
}
