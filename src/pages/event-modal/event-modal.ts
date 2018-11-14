import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { UserService } from '../../app/event.service';




@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {


  constructor( private userService: UserService,public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();
  httpClient: any;

  addEvent() {
    // this.userService.getUsers().subscribe(a => console.log(a));
    this.userService.createEvent(this.event).subscribe(a => console.log("ad" + JSON.stringify(a)));
    console.log("Prueba")
    this.viewCtrl.dismiss(this.event);
  }




  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
