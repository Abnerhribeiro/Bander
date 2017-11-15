import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import * as firebase from 'firebase'
import {App, NavController, NavParams, Platform} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {File, FileReader, IFile} from '@ionic-native/file';
import {ActionSheetController} from 'ionic-angular'
import {Camera, CameraOptions} from "@ionic-native/camera";


import {Crop} from '@ionic-native/crop';
import {Media, MediaObject} from "@ionic-native/media";
import {toBase64String} from "@angular/compiler/src/output/source_map";
import {FilePath} from "@ionic-native/file-path";


@Component({
  templateUrl: 'perfiledit.html',
  selector: 'page-perfiledit'
})
export class PerfilEditPage {


  mediaobject: MediaObject
  filereader: FileReader
  nome: any
  instrumento: any
  estilo: any
  descricao: any
  foto: any
  filename: any
  filepath: any
  file : File
  filepathf : FilePath
  filecontent : any


  constructor(public filef: File, public platform: Platform, public crop: Crop
    , public camera: Camera,
              public storage: Storage, public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController, public media: Media,
               public navparams: NavParams, filepathf : FilePath) {
    this.file = filef;
    this.filepathf = filepathf;
    this.navCtrl = navCtrl;
    this.filename = 'audioperfil'+'.mp3';
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
            "Descricao": self.descricao,
            "Audio": self.filecontent,
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

      if (this.platform.is('ios')) {
        this.filename = 'audioperfil.m4a';
      }
      else if (this.platform.is('android')) {

        this.filepath = this.file.externalDataDirectory;//.replace(/file:\/\//g, '');


         //this.mediaobject = this.media.create(this.filepath + this.filename);
      }
    });



  }

  start() {
    try{
    this.filepath = this.file.externalDataDirectory;//.replace(/file:\/\//g, '');
    this.mediaobject = this.media.create(this.filepath + this.filename );
    this.mediaobject.startRecord();
    console.log("não removeu");
    }catch(err){
    this.file.removeFile('', this.filename).then(() => {
      console.log("removeu");
      this.filepath = this.file.externalDataDirectory;//.replace(/file:\/\//g, '');
      this.mediaobject = this.media.create(this.filepath + this.filename);
      this.mediaobject.startRecord();
    });
    }
    console.log("gravando em : "+this.filepath);
    console.log("nome de arquivo :"+this.filename);
  }
  stop() {

    this.mediaobject.stopRecord();
console.log("parou de gravar");
    this.mediaobject.release();
    console.log("deu release");
  }

  //coloca esses 3 blocos ai e testa lá
  play() {
    this.filepathf.resolveNativePath(this.filepath + this.filename).then((pathname)=>{
 console.log("success : "+pathname);
 try {
   this.filecontent = this.filef.readAsDataURL(this.filepath, this.filename);
   console.log(this.filecontent);
 }catch(err){
   console.log("erro!!! err.code : ");
   console.log(err.code);
   console.log("erro!!! err : ");
   console.log(err);
   console.log("erro!!! filepath+filename : ");
   console.log(this.filepath+this.filename);

 }


    }).catch((err)=>{
      console.log("erro2!!! err.code : ");
      console.log(err.code);
      console.log("erro2!!! err : ");
      console.log(err);
      console.log("erro2!!! filepath+filename : ");
      console.log(this.filepath+this.filename);
    })
    try {
      this.mediaobject.play();
    } catch (err) {
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
