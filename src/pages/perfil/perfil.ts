import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import * as firebase from 'firebase';
import {App, NavController, NavParams, Platform} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {ActionSheetController} from 'ionic-angular'
import {Camera, CameraOptions} from "@ionic-native/camera";
import {
  MediaCapture, MediaFile, CaptureError, CaptureImageOptions,
  CaptureAudioOptions
} from '@ionic-native/media-capture';
import {Crop} from '@ionic-native/crop';
import {PerfilEditPage} from "../perfiledit/perfiledit";
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Media, MediaObject } from '@ionic-native/media';


@Component({
  templateUrl: 'perfil.html',
  selector: 'page-perfil'
})
export class PerfilPage {

  fileR: MediaObject
  currentAudioName: any

  constructor(public crop: Crop, public mediaCapture: MediaCapture, public camera: Camera, public storage: Storage, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private file: File, private media: Media, public params: NavParams, public filePath: FilePath, public platform: Platform) {
    this.navCtrl = navCtrl;

  }

  perfiledit() {
    this.navCtrl.push(PerfilEditPage);
  }

  clickaudio() {


    this.currentAudioName = this.createAudioName();

    this.file.createFile(this.file.dataDirectory, this.currentAudioName , true ).then(() => {

      if( !this.platform.is('android') ){
        this.fileR = this.media.create( this.file.tempDirectory.replace(/^file:\/\//, '') + this.currentAudioName );
      }else{
        this.fileR = this.media.create( this.file.dataDirectory + this.currentAudioName );
      }

      this.fileR.startRecord();

    });




    // this.file.createFile(this.file.tempDirectory, 'my_file.m4a', true).then(() => {
    //   let file = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + 'my_file.m4a');
    //   file.startRecord();
    //   window.setTimeout(() => file.stopRecord(), 10000);
    // });
    //
    // let options: CaptureAudioOptions = {
    //   limit: 3,
    // };
    // this.mediaCapture.captureAudio(options)
    //   .then(
    //     (data: MediaFile[]) => {
    //       console.log(data)
    //       var message = 'This is my message.';
    //       var storageRef = firebase.storage().ref();
    //       storageRef.putString(message).then(function(snapshot) {
    //         console.log('Uploaded a raw string!');
    //       });
    //     },
    //     (err: CaptureError) => console.error(err)
    //   );
  }
  createAudioName() {
    if( !this.platform.is('android') ){
      return this.createName('.wav')
    }else{
      return this.createName('.amr')
    }
  }

  createName(extension){
    let d = new Date(),
      n = d.getTime(),
      newFileName =  n + extension;
    return newFileName;
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
