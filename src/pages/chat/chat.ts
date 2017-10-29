import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import * as firebase from "firebase";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  @ViewChild('content') content:any;
  public time : any
  public title : any
  public img : any
  public id : any
  public mensagem: any
  public position: any
  public nome: any
  public items: Array<any> = [];
  public itemRef: any
  public messages: Array<any> = [];
  public messagesend: Array<any> = [];
  public myimg: any
  public guyimg: any
  public oi : any
  public guyname: any


  constructor(public storage: Storage, public navCtrl: NavController, public navparams: NavParams) {
   // this.you = this.storage.get('uid');
    this.id = navparams.get('id');

    this.guyimg = navparams.get('guyimg');
    this.img = navparams.get('img');
    this.title = navparams.get('title')
    this.itemRef = firebase.database().ref('/chat/'+this.id+this.title);
    this.guyname = navparams.get('guyname');



  }

  existe(conversa, x, id):any{
    return new Promise((resolve, reject) =>{
     //alert("ué");
      conversa.on("value", function(snapshot){
        if (snapshot.exists()) {
         //alert("1 "+conversa);
          resolve(conversa);
         //alert("1 "+conversa);
        }
        else{
          conversa = firebase.database().ref("/chat/" + x + id);
         //alert("2 "+conversa);
         //alert("2 "+conversa);
          resolve(conversa);
        }
      })
    })

  }


  enviar() {
    var milli = 200;
    var x = new Date().toLocaleTimeString();
    var y = new Date().toLocaleDateString() + x;
    x = x.substring(0, x.length-3);
    this.messagesend.push({
      img: this.img,
      content: this.mensagem,
      time: x,
      id: this.id,
      day : y
    });
    if (this.mensagem==null){}
    else {
    if (this.mensagem.trim() === ''){}
    else {
      var self = this;
      this.storage.get('nome').then((nome) => {
        this.storage.get('instrumento').then((instrumento) => {
          self.existe(self.itemRef, self.title, self.id).then(function (conversa) {
            self.itemRef = conversa
            self.itemRef.push(self.messagesend.pop());
            self.mensagem="";
          })
        });
      });
    }
    }
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    },milli);
  }

  ionViewDidLoad() {

    document.getElementById("titulo").innerHTML = this.guyname;
    var milli = 1000;
    var self = this;
    this.existe(this.itemRef, this.title, this.id).then(function(conversa) {
      self.itemRef = conversa;
      self.itemRef.orderByChild("day").limitToLast(5).on('value', itemSnapShot => {
        self.messages = [];
        itemSnapShot.forEach(itemSnap => {
          if(itemSnap.child("/id").val()==self.id) {
            self.messages.push({
              content : itemSnap.child("/content").val(),
              img : itemSnap.child("/img").val(),
              time : itemSnap.child("/time").val(),
              position : 'right'
            });
          }
          else {
            self.messages.push({
              content : itemSnap.child("/content").val(),
              img : itemSnap.child("/img").val(),
              time : itemSnap.child("/time").val(),
              position : 'left'
            });
          return false;
          }
        })
      });
    });
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    },milli);
  }
  ionViewDidEnter(){
    this.content.scrollToBottom(300);//300ms animation speed

  }

}
