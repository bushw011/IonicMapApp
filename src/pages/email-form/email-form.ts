import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-email-form',
  templateUrl: 'email-form.html',
})
export class EmailFormPage {

  firstName: string = '';
  lastName: string = '';
  category: string = 'none';

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailFormPage');
  }

  private submitEmail(){
    console.log(this.firstName, this.lastName, this.category);
    var ID = this.generateID();
    console.log(ID);
    this.db.object('/forms/'+ID).update({
      name: this.firstName + ' ' + this.lastName,
      category: this.category
    })
      .then(success => {
        console.log('form submitted');
      })
      .catch( err => {
        console.log(err);
      });
  }

  private generateID(): string {
    return Math.random().toString(36).substr(2,9);
  }


}
