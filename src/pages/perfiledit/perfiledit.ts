import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import * as firebase from 'firebase'
import {FilePath} from "@ionic-native/file-path";
import {App, NavController, NavParams, Platform} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {File} from '@ionic-native/file';
import {ActionSheetController} from 'ionic-angular'
import {Camera, CameraOptions} from "@ionic-native/camera";


import {Crop} from '@ionic-native/crop';
import {Media, MediaObject} from "@ionic-native/media";


@Component({
  templateUrl: 'perfiledit.html',
  selector: 'page-perfiledit'
})
export class PerfilEditPage {


  mediaobject: MediaObject
  nome: any
  instrumento: any
  estilo: any
  descricao: any
  foto: any
  filename: any


  constructor(public file: File, public platform: Platform, public crop: Crop
    , public camera: Camera,
              public storage: Storage, public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController, public media: Media,
              public filepath: FilePath, public navparams: NavParams) {


    this.filepath = filepath;
    this.navCtrl = navCtrl;
    var self = this;
    storage.get('uid').then((ID) => {

      storage.get('img').then((img) => {
        storage.get('nome').then((nome) => {
          storage.get('instrumento').then((instrumento) => {
            storage.get('estilo').then((estilo) => {
              storage.get('descricao').then((descricao) => {
                this.oi();

                if (self.descricao == null)
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

  salvar() {
    var self = this;
    if (self.nome == null) {
    }
    else {
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

  oi() {
    this.platform.ready().then(() => {

      let name = new Date().getTime();

      if (this.platform.is('ios')) {
        this.filename = 'audioperfil.m4a';
      }
      else if (this.platform.is('android')) {
        // this.file.listDir(this.file.externalRootDirectory, 'Downloads').then((x)=>{
        //   alert("x = "+x);
        // }).catch((err)=>{
        //   alert(err);
        // })
        // this.file.listDir(this.file.applicationDirectory, 'Downloads').then((x)=>{
        //   alert("y = "+x);
        // }).catch((err)=>{
        //   alert(err);
        // })
        // this.file.listDir(this.file.dataDirectory, 'Downloads').then((x)=>{
        //   alert("z = "+x);
        // }).catch((err)=>{
        //   alert(err);
        // })
        // this.file.listDir(this.file.externalRootDirectory, '').then((x)=>{
        //   alert("x2 = "+x);
        // }).catch((err)=>{
        //   alert(err);
        // })
        // this.file.listDir(this.file.applicationDirectory, '').then((x)=>{
        //   alert("y2 = "+x);
        // }).catch((err)=>{
        //   alert(err);
        // })
        // this.file.listDir(this.file.dataDirectory, '').then((x)=>{
        //   alert("z2 = "+x);
        // }).catch((err)=>{
        //   alert(err);
        // })

        //   alert(this.file.externalDataDirectory);
        //   alert("1: "+this.file.applicationDirectory);
        //   alert("2: "+this.file.cacheDirectory);
        //   alert("3: "+this.file.externalRootDirectory);
        //   alert("4: "+this.file.externalCacheDirectory);
        //   alert("5: "+this.file.dataDirectory);
        //   alert("6: "+this.file.externalApplicationStorageDirectory);
        //   alert("7: "+this.file.documentsDirectory);
        //   alert("8: "+this.file.syncedDataDirectory);
        //   alert("9: "+this.file.sharedDirectory);
        //   this.filepath.resolveNativePath("a").then((x)=>{
        //     alert("10: "+x);
        //
        // }).catch((err)=>{
        //     alert(err);
        //   });
        //   this.filename = this.file.externalDataDirectory/*.replace(/file:\/\//g, '') */+ name + '.3gp';
        //   if (Media.installed()) {
        //     this.media.create(this.filename);
        //     this.media.create(name+'a.3gp');
        //   }
        //   else{
        //     alert("WHAT THE FUCK BRO THIS IS NOT WORKING");
        //   }
        //
        // this.filename = this.file.externalDataDirectory.replace(/file:\/\//g, '') + name + '.3gp';
        //this.mediaobject = this.media.create(this.filename+"H");
        //
        // this.filename = this.file.applicationDirectory/*.replace(/file:\/\//g, '') */+ name + '.3gp';
        // this.media.create(this.filename+"I");
        //
        //this.filename = this.file.applicationDirectory.replace(/file:\/\//g, '') + name + '.3gp';
        //  this.media.create(this.filename+"G");
        //
        this.filename = this.file.externalDataDirectory.replace(/file:\/\//g, '') + 'audioperfil' + '.3gp';

        // this.mediaobject = this.media.create(this.filename);
      }
    });

    //this.startListening();


  }

  start() {
    this.file.removeFile('', this.filename).then(() => {
      this.mediaobject = this.media.create(this.filename);
      this.mediaobject.startRecord();
    }).catch((err) => {
      this.mediaobject = this.media.create(this.filename);
      this.mediaobject.startRecord();
    })
  }

  stop() {

    this.mediaobject.stopRecord();

    this.mediaobject.release();

    alert('duracao: ' + this.mediaobject.getDuration());
    alert('done recording' + this.filename);

  }

  //coloca esses 3 blocos ai e testa lá
  play() {
    try {
      this.mediaobject.play();
    }catch(err){
      alert("saporra é null, criando dnv");
      this.mediaobject = this.media.create(this.filename);
      this.mediaobject.play();

    }
  }


  clickcamera() {
    var self = this;
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
