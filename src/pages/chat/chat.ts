import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import * as firebase from "firebase";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  @ViewChild('content') content: any;
  public time: any
  public title: any
  public img: any
  public id: any
  public mensagem: any
  public position: any
  public nome: any
  public items: Array<any> = [];
  public itemRef: any
  public messages: Array<any> = [];
  public messagesend: Array<any> = [];
  public myimg: any
  public guyimg: any
  public oi: any
  public guyname: any

  // INICIALIZA VARIAVEIS NO CONSTRUTOR
  constructor(public storage: Storage, public navCtrl: NavController, public navparams: NavParams) {
    // this.you = this.storage.get('uid');
    this.id = navparams.get('id');

    this.guyimg = navparams.get('guyimg');
    this.img = navparams.get('img');
    this.title = navparams.get('title')
    this.itemRef = firebase.database().ref('/chat/' + this.id + this.title);
    this.guyname = navparams.get('guyname');


  }
  // ================================ //

  // VERIFICA SE AQUELE CHAT EXISTE NO BANCO, SE NAO EXISTE, CORRIGE CAMINHO
  existe(conversa, x, id): any {
    return new Promise((resolve, reject) => {
      //alert("ué");
      conversa.on("value", function (snapshot) {
        if (snapshot.exists()) {
          //alert("1 "+conversa);
          resolve(conversa);
          //alert("1 "+conversa);
        }
        else {
          conversa = firebase.database().ref("/chat/" + x + id);
          //alert("2 "+conversa);
          //alert("2 "+conversa);
          resolve(conversa);
        }
      })
    })

  }

 // =============================== //

  // ENVIA A MENSAGEM COM CONTEUDO, HORARIO, ID DA PESSOA QUE ENVIOU, DIA
  enviar() {
    var milli = 200;
    var x = new Date().toLocaleTimeString();
    var y = new Date().toLocaleDateString() + x;
    x = x.substring(0, x.length - 3);
    this.messagesend.push({ // INSERE DADOS DA MENSAGEM NO ARRAY "MESSAGESEND"
      content: this.mensagem,
      time: x,
      id: this.id,
      day: y
    });
    if (this.mensagem == null) {
    }
    else {
      if (this.mensagem.trim() === '') {
      }
      else {
        var self = this;
        this.storage.get('nome').then((nome) => {
          this.storage.get('instrumento').then((instrumento) => {
            self.existe(self.itemRef, self.title, self.id).then(function (conversa) { // EMPURRA "MESSAGESEND" PARA O SERVIDOR
              self.itemRef = conversa
              self.itemRef.push(self.messagesend.pop());
              self.mensagem = "";
            })
          });
        });
      }
    }
    setTimeout(() => { // TIMEOUT PARA DESCER A TELA
      this.content.scrollToBottom(300);//300ms animation speed
    }, milli);
  }

  ionViewDidLoad() { // CARREGA MENSAGENS DO BANCO QUANDO CARREGA A TELA DE CHAT

    document.getElementById("titulo").innerHTML = this.guyname;
    var milli = 1000;
    var self = this;
    this.storage.get('img').then((foto) => {
      this.storage.get(self.title).then((outrofoto) => {
        this.existe(this.itemRef, this.title, this.id).then(function (conversa) {
          self.itemRef = conversa;
          self.itemRef.limitToLast(20).on('value', itemSnapShot => { // CARREGA APENAS AS ULTIMAS 20 MENSAGENS E QUALQUER NOVA MENSAGEM (.on tem essa função)
            self.messages = [];
            itemSnapShot.forEach(itemSnap => {
              if (itemSnap.child("/nome").val() != "BANDER: ") {
                if (itemSnap.child("/id").val() == self.id) { // VERIFICA SE O ID NA MENSAGEM EH SEU
                  self.messages.push({ // INSERE MENSAGENS NO ARRAY "MESSAGES" COMO SE FOSSEM SUAS
                    content: itemSnap.child("/content").val(),
                    img: foto,
                    time: itemSnap.child("/time").val(),
                    position: 'right'
                  });
                }
                else {
                  alert(self.title);
                  alert(outrofoto);
                  self.messages.push({ // INSERE MENSAGENS NO ARRAY "MESSAGES" COMO SE FOSSEM DE OUTRA PESSOA
                    content: itemSnap.child("/content").val(),
                    img: outrofoto,
                    time: itemSnap.child("/time").val(),
                    position: 'left'
                  });
                }
                return false;
              }
            })
          });
        });
      });
    });
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed           DESCE A TELA SE UMA NOVA MENSAGEM CHEGAR
    }, milli);
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(300);//300ms animation speed   DESCE A TELA LOGO AO ENTRAR NO CHAT

  }

}
