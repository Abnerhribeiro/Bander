import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseApp} from "angularfire2";
import {File} from "@ionic-native/file";
import {Media, MediaObject} from "@ionic-native/media";
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  mediaobject: MediaObject
  referencia;
  arquivo;
  file;
  transfer;
  fileTransfer : FileTransferObject;
  constructor(public fb : FirebaseApp, public filef: File, public navCtrl: NavController,
              public media: Media,
              public navparams: NavParams, transfer : FileTransfer){
    this.transfer = transfer;
    this.file = filef;
    this.referencia = fb.storage().ref();
  }



  baixarArquivo(nome: string){
    this.fileTransfer = this.transfer.create();
    var self = this;
    let caminho = this.referencia.child('dir/'+'audioperfil[1]'+'.3gp');
try {
  console.log("data = " + caminho.getData());
}catch(err){}
    caminho.getDownloadURL().then(url => {
      console.log("url = "+url);
      this.fileTransfer.download(url,self.file.externalDataDirectory + 'abner.3gp').then(()=>{
        console.log("caminho = "+self.file.externalDataDirectory);
      console.log("download efetuado");
        this.file.readAsDataURL(self.file.externalDataDirectory,'abner' + '.3gp').then((x)=>{
      console.log("file = "+x);
        })
      })
    });
  }

  ouvirArquivo(){
var self = this;
console.log("caminho = "+ self.file.externalDataDirectory);
    self.mediaobject = self.media.create(self.file.externalDataDirectory+'audioperfil.3gp');
    self.mediaobject.play();

  }

  atualizaArquivo(event){
    this.arquivo = event.srcElement.files[0];
  }
  enviarArquivo(){
    let caminho = this.referencia.child('dir/'+this.arquivo.name);
    let tarefa = caminho.put(this.arquivo);
    tarefa.on('state_changed', (snapshot)=>{
      // Acompanha os estados do upload (progresso, pausado,...)
    }, error => {
      // Tratar possíveis erros
    }, () => {
      // Função de retorno quando o upload estiver completo
      console.log(tarefa.snapshot.downloadURL);
    });
  }


}
