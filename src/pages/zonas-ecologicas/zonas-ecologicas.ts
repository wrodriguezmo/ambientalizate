import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { EmpresasPage } from '../empresas/empresas';
import { PuntosEcologicosPage } from '../puntos-ecologicos/puntos-ecologicos';

@Component({
  selector: 'page-zonas-ecologicas',
  templateUrl: 'zonas-ecologicas.html'
})
export class ZonasEcologicasPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }




    goToEmpresas(params){
      if (!params) params = {};
      //this.navCtrl.push(EmpresasPage);
      let modal = this.modalCtrl.create(EmpresasPage);

      modal.onDidDismiss((location) => {
          console.log(location);
      });

      modal.present();
    }goToPuntosEcologicos(params){
      if (!params) params = {};
      //this.navCtrl.push(PuntosEcologicosPage);
      let modal1 = this.modalCtrl.create(PuntosEcologicosPage);

      modal1.onDidDismiss((location) => {
          console.log(location);
      });

      modal1.present();
    }



}
