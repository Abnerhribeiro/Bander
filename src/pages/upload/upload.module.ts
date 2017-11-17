import {Inject, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPage } from './upload';
import { FirebaseApp} from "angularfire2";

@NgModule({
  declarations: [
    UploadPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadPage),
  ],
})
export class UploadPageModule {
  referencia;
  arquivo;
  constructor(@Inject(FirebaseApp) fb:any){
    this.referencia = fb.storage().ref;
  }


  baixarArquivo(nome: string){
    let caminho = this.referencia.child('pasta/'+nome);
    caminho.getDownloadURL().then(url => {
      console.log(url);
    });
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



