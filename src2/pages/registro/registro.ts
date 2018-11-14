import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  loading: Loading;

  userData={
    "calificacion":4.0,
    "nombres":"",
    "apellidos":"",
    "email":"",
    "telefono":"",
    "password":"",
    "Password_confirmation":"",
    "role_id":2//que es un usuario comun
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public authServiceProvider: AuthServiceProvider,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  createAccount(){
    this.showLoading();
    this.authServiceProvider.postData(this.userData, "usuarios")
    .subscribe(
      data => {
        this.showNotification(data); 
        this.navCtrl.setRoot(HomePage);
      },
      err => { console.log(err); this.showError(err) }
    );
    console.log(this.userData);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }

  showNotification(data): any {
    //console.log(data)
    this.alertCtrl.create({
        title: "Bienvenido "+ data.nombres,
        subTitle: "Ya puedes buscar parqueaderos\n",
        buttons: ['Ok']
    }).present();

  }
}
