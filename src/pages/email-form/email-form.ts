import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import {LocationsPage} from "../locations/locations";
import {AngularFirestore} from "angularfire2/firestore";

@IonicPage()
@Component({
  selector: 'page-email-form',
  templateUrl: 'email-form.html',
})
export class EmailFormPage {

  locations = LocationsPage;

  masks: any;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  category: string = 'none';
  phoneNumber: string = '';
  isHomeOwner: any='';

  vehicles: string[] = [''];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, public alertCtrl: AlertController) {
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
      this.db.collection('forms/').add({
        name: this.firstName + ' ' + this.lastName,
        category: this.category,
        phoneNumber: unmaskedData.phoneNumber,
        email: this.email,
        isHomeOwner: this.isHomeOwner
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

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Almost Done!',
      subTitle: 'Please confirm the information below',
      message: `<strong>Name: </strong>` + this.firstName + ' ' +this.lastName
      + `<p><strong>Email: </strong>`+this.email+`</p>` +
      `<p><strong>Phone Number: </strong>`+this.phoneNumber+`</p>` +
      `<p>Seeking ` +this.category+' insurance assistance' +
      `<p><strong>Homeowner: </strong>`+ this.isHomeOwner+`</p>`,


      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Saved clicked');
            this.submitEmail();
            this.navCtrl.push(this.locations)
          }
        }
      ]
    });
    prompt.present();
  }




}
