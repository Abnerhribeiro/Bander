import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import * as firebase from 'firebase';
import {App, NavController, NavParams, Platform} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {ActionSheetController} from 'ionic-angular'
import {Camera, CameraOptions} from "@ionic-native/camera";

import {Crop} from '@ionic-native/crop';
import {PerfilEditPage} from "../perfiledit/perfiledit";
<<<<<<< HEAD
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Media, MediaObject } from '@ionic-native/media';
import {HomePage} from "../home/home";
=======
>>>>>>> ae3f89ba497fc71d619c423b2581bb2293f16206


@Component({
  templateUrl: 'perfil.html',
  selector: 'page-perfil'
})
export class PerfilPage {

  constructor(public crop: Crop, public camera: Camera, public storage: Storage, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

    this.navCtrl = navCtrl;

  }

  perfiledit() {
    this.navCtrl.push(PerfilEditPage);
  }
<<<<<<< HEAD


=======
>>>>>>> ae3f89ba497fc71d619c423b2581bb2293f16206
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

          handler: () => {
            this.storage.clear();
            this.navCtrl.setRoot(HomePage);

          }
        }
      ]
    });

    actionSheet.present();
  }
}
