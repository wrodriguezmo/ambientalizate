import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuseoPage } from './museo';

@NgModule({
  declarations: [
    MuseoPage,
  ],
  imports: [
    IonicPageModule.forChild(MuseoPage),
  ],
})
export class MuseoPageModule {}
