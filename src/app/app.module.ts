/// <reference types="@types/googlemaps" />

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StationProfileComponent } from './components/map-list/station-profile/station-profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { Facebook } from '@ionic-native/facebook/ngx';
import {TwitterConnect} from '@ionic-native/twitter-connect/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      AngularFontAwesomeModule,
      IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      Facebook,
      TwitterConnect,
      SocialSharing,
      File,
      FileOpener,
      FileTransfer,
      FileTransferObject
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
