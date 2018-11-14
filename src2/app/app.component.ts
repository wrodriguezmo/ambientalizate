import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public geolocation: Geolocation
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage }
    ];

    localStorage.setItem("apiUrl","https://parkingbogota.herokuapp.com/")
    //localStorage.setItem("apiUrl","http://localhost:3000/")
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getlocation();

      //Notificaciones push
      //window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        let alert = this.alertCtrl.create({
          title: jsonData["title"],
          subTitle: jsonData["body"],
          buttons: ['Dismiss']
        });
        alert.present();
      };
      // window["plugins"].OneSignal
      //   .startInit("6569383b-9a50-4d56-9b35-5f9ebedd0bb7", "553431634165")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getlocation(){
    this.geolocation.getCurrentPosition().then(pos => {
      console.log('lat: '+pos.coords.latitude+', lon: '+pos.coords.longitude);
    });
  }
}
