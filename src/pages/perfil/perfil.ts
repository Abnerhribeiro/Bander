import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import * as firebase from 'firebase';
import {App, NavController} from "ionic-angular";
<<<<<<< HEAD
import {Storage} from '@ionic/storage';
import {ActionSheetController} from 'ionic-angular'
=======
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular'
>>>>>>> f209fe051c06c284e13a134be3ab916b189a39d6
import {Camera, CameraOptions} from "@ionic-native/camera";
import {
  MediaCapture, MediaFile, CaptureError, CaptureImageOptions,
  CaptureAudioOptions
} from '@ionic-native/media-capture';
<<<<<<< HEAD
import {Crop} from '@ionic-native/crop';
import {PerfilEditPage} from "../perfiledit/perfiledit";
=======
import { Crop } from '@ionic-native/crop';




>>>>>>> f209fe051c06c284e13a134be3ab916b189a39d6


@Component({
  templateUrl: 'perfil.html',
  selector: 'page-perfil'
})
export class PerfilPage {

<<<<<<< HEAD
  constructor(public crop: Crop, public mediaCapture: MediaCapture, public camera: Camera, public storage: Storage, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
=======
  constructor(public crop: Crop, public mediaCapture : MediaCapture, public camera: Camera, public storage: Storage, public navCtrl: NavController,public actionSheetCtrl: ActionSheetController) {
>>>>>>> f209fe051c06c284e13a134be3ab916b189a39d6
    this.navCtrl = navCtrl;
    alert("oi");

  }

  perfiledit() {
    this.navCtrl.push(PerfilEditPage);
  }

<<<<<<< HEAD
  clickaudio() {
    let options: CaptureAudioOptions = {limit: 3};
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => console.log(data),
        (err: CaptureError) => console.error(err)
      );
  }

  clickcamera() {
    var storage = this.storage;
    const options: CameraOptions = {
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: 0
    }
    storage.get('uid').then((ID) => {
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        (<HTMLImageElement>document.getElementById("profile_pessoa")).src = base64Image;
        var marked = firebase.database().ref("people/" + ID);
        marked.once("value", function (snapshot) {
=======
          var you = firebase.database().ref("people/" + ID);
          you.once("value", function (snap) {
            (<HTMLImageElement>document.getElementById("profile_pessoa")).src = snap.child("Foto").val();
            document.getElementById("nome_pessoa").innerHTML = snap.child("Nome").val();
>>>>>>> f209fe051c06c284e13a134be3ab916b189a39d6

          //     alert("c");

          marked.update({
            Foto: base64Image
          });
        })

      }, (err) => {
        // Handle error
      });
    })
  }
  ionViewWillEnter(){
    var storage = this.storage;
    storage.get('uid').then((ID) => {
      storage.get('img').then((img) => {
        storage.get('nome').then((nome) => {
          storage.get('instrumento').then((instrumento) => {
            storage.get('estilo').then((estilo) => {
              storage.get('descricao').then((descricao) => {


                (<HTMLImageElement>document.getElementById("profile_pessoa")).src = img;
                document.getElementById("nome_pessoa").innerHTML = nome;

                document.getElementById("instrumento_pessoa").innerHTML = instrumento;

                document.getElementById("estilo_pessoa").innerHTML = estilo;

                document.getElementById("descricao").innerHTML = descricao;

              });

            })
          })
        })
      })
    });
  }


<<<<<<< HEAD
  presentActionSheetSair() {
=======
  clickaudio(){
    let options: CaptureAudioOptions = { limit: 3 };
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => console.log(data),
        (err: CaptureError) => console.error(err)
      );
  }

  clickcamera() {
    var storage = this.storage;
    const options: CameraOptions = {
      allowEdit : true,
      targetWidth:300,
      targetHeight:300,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: 0
    }
    storage.get('uid').then((ID)=>{
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      (<HTMLImageElement>document.getElementById("profile_pessoa")).src = base64Image;
      var marked = firebase.database().ref("people/" + ID);
      marked.once("value", function (snapshot) {

        //     alert("c");

        marked.update({
          Foto: base64Image
        });
      })

    }, (err) => {
      // Handle error
    });
    })
  }


presentActionSheetSair() {
>>>>>>> f209fe051c06c284e13a134be3ab916b189a39d6
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Sair',
          role: 'cancel',

          handler: () => {

          }
        }
      ]
    });

    actionSheet.present();
  }
}
