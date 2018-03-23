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

  vehicles: any = [""];
  parsedVehicles: string = '';



  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, public alertCtrl: AlertController) {
    this.masks = {
      phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
      orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
    };
    console.log(this.navParams.get('category'));
    this.category = navParams.get('category');


  }
  trackByFn(index, vehicles) {
    return index;
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
        isHomeOwner: this.isHomeOwner,
        vehicles: this.parsedVehicles
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
    console.log(this.vehicles);
    this.parsedVehicles = this.parseVehicles(this.vehicles);
    let prompt = this.alertCtrl.create({
      title: 'Almost Done!',
      subTitle: 'Please confirm the information below',
      message: `<strong>Name: </strong>` + this.firstName + ' ' +this.lastName
      + `<p><strong>Email: </strong>`+this.email+`</p>` +
      `<p><strong>Phone Number: </strong>`+this.phoneNumber+`</p>` +
      `<p>Seeking ` +this.category+' insurance assistance' +
      `<p><strong>Homeowner: </strong>`+ this.isHomeOwner+`</p>` +
      `<p><strong>Vehicles Owned: </strong>` + this.parsedVehicles + `</p>`,


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
            //this.submitEmail();
            this.navCtrl.push(this.locations, {
              category: this.category
            });
          }
        }
      ]
    });
    prompt.present();
  }

  public parseVehicles(arr:string[]):string{
    let str: string = '';
    for(var i = 0; i < arr.length; i++){
      if(arr[i]!='') {
        str += arr[i];
        if(i != arr.length-1&&arr[i+1]!=''){
          str += ', '
        }
      }
    }
    if(str==''){
      str = 'none';
    }
    return str;
  }




}
