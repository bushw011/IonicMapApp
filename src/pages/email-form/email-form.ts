import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-email-form',
  templateUrl: 'email-form.html',
})
export class EmailFormPage {

  masks: any;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  category: string = 'none';
  phoneNumber: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.masks = {
      phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
      orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailFormPage');
  }

  public removeTrailing() {
    if(this.phoneNumber.length>14)
    this.phoneNumber = this.phoneNumber.substring(0,14);
  }


  private submitEmail(){
    let unmaskedData = {
      phoneNumber: this.phoneNumber.replace(/\D+/g, '')
    };
    if(unmaskedData.phoneNumber.length>10){
      unmaskedData.phoneNumber = unmaskedData.phoneNumber.substring(0,10);
    }

    console.log(unmaskedData);
    if(this.firstName!=''&&this.lastName!=''&&this.category!='none'){
      console.log(this.firstName, this.lastName, this.category);
      var ID = this.generateID();
      console.log(ID);
      this.db.object('/forms/' + ID).update({
        name: this.firstName + ' ' + this.lastName,
        category: this.category,
        phoneNumber: unmaskedData.phoneNumber,
        email: this.email
      })
        .then(success => {
          console.log('form submitted');
        })
        .catch(err => {
          console.log(err);
        });
    }
    else{
      console.log('Please complete all fields');
    }
  }


  private generateID(): string {
    return Math.random().toString(36).substr(2,9);
  }


}
