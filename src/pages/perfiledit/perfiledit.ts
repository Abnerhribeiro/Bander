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
import {FirebaseApp} from "angularfire2";


@Component({
  templateUrl: 'perfiledit.html',
  selector: 'page-perfiledit'
})
export class PerfilEditPage {


  mediaobject: MediaObject
  mediaobject2: MediaObject
  mediaobject3: MediaObject
  mediaobject4: MediaObject
  filereader: FileReader
  nome: any
  instrumento: any
  estilo: any
  descricao: any
  foto: any
  filename: any
  filepath: any
  file: File
  filepathf: FilePath
  filecontent: any
  referencia;
  ID: any;

  constructor(public filef: File, public platform: Platform, public crop: Crop
    , public camera: Camera, public fb : FirebaseApp,
              public storage: Storage, public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController, public media: Media,
              public navparams: NavParams, filepathf: FilePath) {
    this.file = filef;
    this.referencia = fb.storage().ref();
    this.filepathf = filepathf;
    this.navCtrl = navCtrl;
    this.filename = 'audioperfil' + '.3gp';
    console.log("filename = " + this.filename);
    var self = this;
    storage.get('uid').then((ID) => {
      this.ID = ID;

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

   dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
  }
  arquivo;

  salvar() {
    var self = this;
    try {
      var caminho = this.referencia.child('dir/' + this.ID+'.3gp');
    }catch(err){
      console.log("caminho err");
      console.log(err);
      console.log(err.code);
      console.log(caminho);
    }
    console.log("ok");
    try {
      this.arquivo

      this.file.resolveDirectoryUrl(self.file.externalDataDirectory).then((url)=>{

        console.log("url done");
        console.log(url);
        this.file.readAsDataURL(self.file.externalDataDirectory,'audioperfil.3gp').then((x)=>{

        console.log("file done");
        console.log(this.dataURItoBlob(x));
        try {
          caminho.put(this.dataURItoBlob(x));
        }catch(err){
          console.log("put err again");
          console.log(err);
          console.log(err.code);
        }
      })
      })
    }catch(err){
      console.log("tarefa err");
        console.log(err);
        console.log(err.code);
      }
    console.log("até aqui foi");


    this.filepathf.resolveNativePath(this.filepath + this.filename).then((pathname) => {
      console.log("success, filepath+filename : " + pathname);
      try {

        this.file.readAsDataURL(this.filepath, this.filename).then((filecontent) => {


                console.log("URL (filepath+filename) : " + filecontent);
                self.filecontent = filecontent;
                console.log(filecontent);

                //alert("salvar");
                //alert("filecontent : " + this.filecontent);
                if (self.nome == null) {
                }
                else {
                  if (self.nome.trim() === '') {
                  }
                  else {
                    this.storage.get('uid').then((ID) => {
                      var you = firebase.database().ref("people/" + ID);
                      alert("update");
                      try {
                        you.update({
                          "Nome": self.nome,
                          "Instrumento": self.instrumento,
                          "Estilo": self.estilo,
                          //"Foto": self.foto,
                          "Descricao": self.descricao,
                          "Audio": filecontent,
                        })
                      } catch (err) {
                        alert("n funcionou");
                        alert(err);
                        alert(err.code);
                      }
                      alert("funcionou");
                      this.storage.set('nome', self.nome);
                      this.storage.set('estilo', self.estilo);
                      this.storage.set('instrumento', self.instrumento);
                      this.storage.set('img', self.foto);
                      this.storage.set('descricao', self.descricao);

                    });
                  }
                }
              })
      } catch (err) {
        alert("deu pau");
      }
    })
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
      console.log("filepath : " + this.filepath)
    });


  }

  start() {
    try {
      this.filepath = this.file.externalDataDirectory;//.replace(/file:\/\//g, '');
      this.mediaobject = this.media.create(this.filepath + this.filename);
      this.mediaobject.startRecord();
      console.log("this.media.create = " + this.filepath + this.filename);
      console.log("não removeu");
    } catch (err) {
      this.file.removeFile('', this.filename).then(() => {
        console.log("removeu");
        console.log("this.media.create = " + this.filepath + this.filename);
        this.filepath = this.file.externalDataDirectory;//.replace(/file:\/\//g, '');
        this.mediaobject = this.media.create(this.filepath + this.filename);
        this.mediaobject.startRecord();
      });
    }
    console.log("gravando em : " + this.filepath);
    console.log("nome de arquivo :" + this.filename);
  }

  stop() {

    this.mediaobject.stopRecord();
    console.log("parou de gravar");
    this.mediaobject.release();
    console.log("deu release");


  }
  //coloca esses 3 blocos ai e testa lá
  play() {
    try {

      this.mediaobject.play();
    } catch (err) {
      alert("saporra é null, criando dnv");
      this.mediaobject = this.media.create(this.filepath+this.filename);
      this.mediaobject.play();

    }
  }
  play2() {

    this.file.writeExistingFile(this.filepath,this.filename,this.filecontent).then(()=>{
    this.mediaobject2 = this.media.create(this.filepath+this.filename);
    try {
      this.mediaobject2.play();
    } catch (err) {
      alert("saporra é null, criando dnv");
      this.mediaobject2 = this.media.create(this.filepath+this.filename);
      this.mediaobject2.play();

    }
    })
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
