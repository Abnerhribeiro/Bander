import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import * as firebase from 'firebase';
import {App, NavController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {ActionSheetController} from 'ionic-angular'
import {Camera, CameraOptions} from "@ionic-native/camera";
import {
  MediaCapture, MediaFile, CaptureError, CaptureImageOptions,
  CaptureAudioOptions
} from '@ionic-native/media-capture';
import {Crop} from '@ionic-native/crop';
import {PerfilEditPage} from "../perfiledit/perfiledit";


@Component({
  templateUrl: 'menuperfil.html',
  selector: 'page-menuperfil'
})
export class MenuPerfilPage {

  constructor(public crop: Crop, public mediaCapture: MediaCapture, public camera: Camera, public storage: Storage, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
    this.navCtrl = navCtrl;

  }

  perfiledit() {
    this.navCtrl.push(PerfilEditPage);
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


  presentActionSheetSair() {
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
