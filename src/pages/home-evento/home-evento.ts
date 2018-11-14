import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { EventModalPage } from '../event-modal/event-modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

var EventUrl = "https://amheroku.herokuapp.com/events";

interface event {
  title: string,
  endTime: Date,
  startTime: Date,
  allDay: boolean
}

@Component({
  selector: 'page-home-evento',
  templateUrl: 'home-evento.html'
})
export class HomePage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(private http: HttpClient,public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    var event = {"title": "Cosa", "startTime": new Date(), "endTime": new Date(), allDay: true};
    // var created = new Date(a.get);

    //this.eventSource.push(event);


    //console.log(this.eventSource);
    this.http.get<event[]>(EventUrl).subscribe(a=>{
      a.map(a=> {
        a.allDay=true
        a.endTime = new Date(a.endTime);
        a.startTime = new Date(a.startTime);
      })
      this.eventSource = a;
      //debugger
    })
  }

  addEvent() {
    let modal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
         //debugger
          this.eventSource = events;
        });
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
