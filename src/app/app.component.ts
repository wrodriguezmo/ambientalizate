import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ZonasEcologicasPage } from '../pages/zonas-ecologicas/zonas-ecologicas';
import { EmpresasPage } from '../pages/empresas/empresas';
import { PuntosEcologicosPage } from '../pages/puntos-ecologicos/puntos-ecologicos';


import { PrincipalPage } from '../pages/principal/principal';
import { HomePage } from '../pages/home-evento/home-evento';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any ;
  


  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.intializedApp();
  }

  intializedApp(){

    this.platform.ready().then( ()=>{
      this.rootPage = PrincipalPage;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToPrincipal(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PrincipalPage);
  }goToZonasEcologicas(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ZonasEcologicasPage);
  }goToEmpresas(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EmpresasPage);
  }goToPuntosEcologicos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PuntosEcologicosPage);
  }goToEventos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);

  }


}
