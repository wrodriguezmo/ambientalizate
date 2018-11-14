import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  credentials = { email: '', password: '' };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private authServiceProvider: AuthServiceProvider,
    private alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public createAccount() {
    // this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading()

    let userData={
      auth:{
          email:this.credentials.email,
          password:this.credentials.password
          }
      }
      //console.log(this.credentials);
      //console.log(userData);
      this.authServiceProvider.postData(userData, "usuario_token")
          .subscribe(
              data => {
                  // localStorage.setItem('user', JSON.stringify(data["user"]));
                  // localStorage.setItem('jwt', data["jwt"]);
                  this.showNotification(data);
                  //console.log("Respuesta exitosa, token: ",)
                  this.navCtrl.setRoot(HomePage);
              },
              err => { console.log(err); this.showError("Acceso denegado") }
          );

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
    console.log(data)
    this.alertCtrl.create({
        title: "Bienvenido "+ data.user.nombres,
        subTitle: "Ya puedes buscar parqueaderos\n",
        buttons: ['Ok']
    }).present();

  }

  goToRegistro(){
    this.navCtrl.push(RegistroPage, {
      //item: item
    });
  }

}
