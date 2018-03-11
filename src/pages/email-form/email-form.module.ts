import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailFormPage } from './email-form';

@NgModule({
  declarations: [
    EmailFormPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailFormPage),
  ],
})
export class EmailFormPageModule {}
