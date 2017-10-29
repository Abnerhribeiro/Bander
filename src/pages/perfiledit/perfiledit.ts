import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import * as firebase from 'firebase';
import {App, NavController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular'
import {Camera, CameraOptions} from "@ionic-native/camera";
import {
  MediaCapture, MediaFile, CaptureError, CaptureImageOptions,
  CaptureAudioOptions
} from '@ionic-native/media-capture';
import { Crop } from '@ionic-native/crop';






@Component({
  templateUrl: 'perfiledit.html',
  selector: 'page-perfiledit'
})
export class PerfilEditPage {



  nome:any
  instrumento:any
  estilo:any
  descricao:any
  foto:any


  constructor(public crop: Crop, public mediaCapture : MediaCapture, public camera: Camera, public storage: Storage, public navCtrl: NavController,public actionSheetCtrl: ActionSheetController) {
    this.navCtrl = navCtrl;
    var self = this;
    storage.get('uid').then((ID) => {

        storage.get('img').then((img) => {
          storage.get('nome').then((nome) => {
            storage.get('instrumento').then((instrumento) => {
              storage.get('estilo').then((estilo) => {
                storage.get('descricao').then((descricao) => {

                  document.getElementById("batataum").style.backgroundImage = "url("+"'"+img+"'"+")";

                  if (self.descricao==null)
                    self.descricao = "Descrição ainda não funciona :(";
                  (<HTMLImageElement>document.getElementById("profile_pessoab")).src = img;
                  self.nome = nome;
                  self.instrumento = instrumento;
                  self.estilo = estilo;
                  self.descricao = descricao;

                });

              })
            })
          })
        })
      });

  }
  salvar(){
    var self = this;
    if (self.nome == null) {}
    else{
      if (self.nome.trim() === '') {
      }
      else {
        this.storage.get('uid').then((ID) => {
          var you = firebase.database().ref("people/" + ID);
          you.update({
            "Nome": self.nome,
            "Instrumento": self.instrumento,
            "Estilo": self.estilo,
            "Foto": self.foto,
            "Descricao": self.descricao
          })
          this.storage.set('nome', self.nome);
          this.storage.set('estilo', self.estilo);
          this.storage.set('instrumento', self.instrumento);
          this.storage.set('img', self.foto);
          this.storage.set('descricao', self.descricao);

        });
      }
    }
    }


  clickaudio(){
    let options: CaptureAudioOptions = { limit: 3 };
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => console.log(data),
        (err: CaptureError) => console.error(err)
      );
  }

  clickcamera() {
    var self = this;
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
        (<HTMLImageElement>document.getElementById("profile_pessoab")).src = base64Image;
        self.foto = base64Image;

      }, (err) => {
        // Handle error
      });
    })
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
