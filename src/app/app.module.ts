import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PrincipalPage } from '../pages/principal/principal';
import { ZonasEcologicasPage } from '../pages/zonas-ecologicas/zonas-ecologicas';
import { EmpresasPage } from '../pages/empresas/empresas';
import { PuntosEcologicosPage } from '../pages/puntos-ecologicos/puntos-ecologicos';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCalendarModule } from 'ionic2-calendar';
import { EventModalPage } from '../pages/event-modal/event-modal';
import { HomePage } from '../pages/home-evento/home-evento';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Connectivity } from '../providers/connectivity-service/connectivity-service';
// import { GoogleMaps } from '../providers/google-maps/google-maps';

import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps'
import { HttpClientModule }    from '@angular/common/http';
import { UserService } from './event.service';


@NgModule({
  declarations: [
    MyApp,
    PrincipalPage,
    ZonasEcologicasPage,
    EmpresasPage,
    PuntosEcologicosPage,
    EventModalPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PrincipalPage,
    ZonasEcologicasPage,
    EmpresasPage,
    PuntosEcologicosPage,
    EventModalPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Connectivity,
    GoogleMaps,
    Network,
    Geolocation,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
