import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventModalPage } from '../event-modal/event-modal';
import { HttpClientModule }    from '@angular/common/http';
@NgModule({
  declarations: [
    EventModalPage,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(EventModalPage),
  ],
})
export class EventModalPageModule {}
