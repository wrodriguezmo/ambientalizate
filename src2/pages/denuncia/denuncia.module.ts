import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DenunciaPage } from './denuncia';

@NgModule({
  declarations: [
    DenunciaPage,
  ],
  imports: [
    IonicPageModule.forChild(DenunciaPage),
  ],
})
export class DenunciaPageModule {}
