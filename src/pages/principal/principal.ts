import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ZonasEcologicasPage } from '../zonas-ecologicas/zonas-ecologicas';
import { EmpresasPage } from '../empresas/empresas';
import { PuntosEcologicosPage } from '../puntos-ecologicos/puntos-ecologicos';


import { HomePage } from '../home-evento/home-evento';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html'
})


export class PrincipalPage {


  constructor(public navCtrl: NavController) {
  }

  goToZonasEcologicas(params){
    if (!params) params = {};
    this.navCtrl.push(ZonasEcologicasPage);
  }goToEmpresas(params){
    if (!params) params = {};
    this.navCtrl.push(EmpresasPage);
  }goToPuntosEcologicos(params){
    if (!params) params = {};
    this.navCtrl.push(PuntosEcologicosPage);
  }goToEventos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }


}
