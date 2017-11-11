import {Component} from '@angular/core';

import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {ChatPage} from '../chat/chat';
import * as firebase from "firebase";
import {Storage} from "@ionic/storage";
import Query = firebase.firestore.Query;
import {HomePage} from "../home/home";

@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html'
})
export class ContatosPage {
  icons = Array();
  items = Array<{ title: string, note: string, icon: string, id: string, img: string }>();
  notes = Array();
  titles = Array();
  ids = Array();
  imgs = Array();
  items2 = Array<{ title: string, note: string, icon: string, id: string, img: string }>();
  busca: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public actionSheetCtrl: ActionSheetController) {
    this.items = [];
    this.fazoutraparte()

  }

  existe(conversa, x, id): any {
    return new Promise((resolve, reject) => {
      ////alert("ué");
      conversa.on("value", function (snapshot) {
        if (snapshot.exists()) {
          ////alert("1 "+conversa);
          resolve(conversa);
          ////alert("1 "+conversa);
        }
        else {
          conversa = firebase.database().ref("/chat/" + id + x);
          ////alert("2 "+conversa);
          ////alert("2 "+conversa);
          resolve(conversa);
        }
      })
    })

  }

  fazoutraparte() {
    var self = this;
    this.storage.get('uid').then((id) => {
      var contatos = firebase.database().ref("/people/" + id);
      contatos.child("/Matches").on("child_added", function (snapshota) {
        contatos.once("value", function (hy) {


          var x = snapshota.key;
          var nome = firebase.database().ref("/people/" + x);
          nome.once("value", function (snap) {
            var name = snap.child("Nome").val();
            var img = snap.child("Foto").val();

            //////alert("erro2");


            var conversaa = firebase.database().ref("/chat/" + x + id);
            self.existe(conversaa, x, id).then(function (conversa) {
              ////alert("ok");
              ////alert(conversa);

              conversa.limitToLast(1).on("child_added", function (snapshot) {
                if (snapshot.child("content").val() != null) {
                  self.notes = [snapshot.child("content").val().toString()];
                  if (self.notes[0].length > 7) {
                    self.notes[0] = self.notes[0].substring(0, 7) + "...";
                  }
                  else
                    self.notes[0] = self.notes[0].substring(0, 7);
                }
                // ////alert("erro3");


                self.icons.push("chatbubbles");
                //////alert(snapshot.child("mensagem").val());


                //////alert(id + x);
                //if(self.items.find(id)){
                //////alert(" OLHA OLHA OLHA OLHA OLHA OLHA OLHA A AGUA MINERAL");
                //////alert(" OLHA OLHA OLHA OLHA OLHA OLHA OLHA A AGUA MINERAL");
                // //////alert(self.items.find(id));
                // }


                var teste = 0;
                var indice = 0;
                //////alert("NAME = "+name);
                self.imgs.push(img);
                self.titles.push(name);
                self.ids.push(x);
                // ////alert("nome foi empurrado");
                // ////alert ("OLHA O NOME AQUI ANTES DA COMPARAÇÂO: "+name);
                var g = hy.child("/Matches").numChildren();
                for (var i = 0; i < g; i++) {
                  if (self.items[i] != null) {
                    if (self.items[i].title == name) {
                      teste = 1;
                      indice = i;
                    }
                  }
                }
                if (teste == 1) {
                  //  ////alert("CAIU AQUI, CAGOU");
                  self.items[indice].note = self.notes[0];
                }

                else {
                  self.items.push({

                    img: self.imgs.pop(),
                    title: self.titles.pop(),
                    note: self.notes.pop(),
                    icon: self.icons.pop(),
                    id: self.ids.pop()
                  });
                  //    ////alert("nome foi puxado");
                }

                self.items2 = self.items;
                teste = 0;
                /* ////alert("ATENCAO, SEUS VALORES AGORA");
                 //////alert("ATENCAO, SEUS VALORES AGORA");
                 if (self.items[0] != null) {
                   ////alert("ATENCAO, TITULO 0");
                   ////alert(self.items[0].title);
                   ////alert("ATENCAO, ICONE 0");
                   ////alert(self.items[0].icon);
                   ////alert("ATENCAO, NOTE 0");
                   ////alert(self.items[0].note);
                 }

                 ////alert("ATENCAO, FIM DOS VALORES 0");
                 ////alert("ATENCAO, FIM DOS VALORES 0");
                 if (self.items[1] != null) {
                   ////alert("ATENCAO, TITULO 1");
                   ////alert(self.items[1].title);
                   ////alert("ATENCAO, ICONE 1");
                   ////alert(self.items[1].icon);
                   ////alert("ATENCAO, NOTE 1");
                   ////alert(self.items[1].note);
                 }*/

                //////alert("teste = " + teste);

                //////alert("ATENCAO, FIM DOS VALORES 1");
                //////alert("ATENCAO, FIM DOS VALORES 1");
              })
            }, function (error) {
              ////alert("bunda");
            })
          })
        })
      })
    })
  }

  itemTapped(event, item) {
    this.storage.get('uid').then((id) => {
      this.storage.get('img').then((img) => {
        this.navCtrl.push(ChatPage, {'title': item.id, 'id': id, 'dad': this, 'guyimg': item.img, 'img':img, 'guyname': item.title});
      })
    })
  }

  setItems() {
    this.items = this.items2;
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.items = this.items.filter(function (item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  presentActionSheetSair() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Sair',

          handler: () => {
            alert("q");
            this.navCtrl.setRoot(HomePage);
            alert("oi?");
          }
        }
      ]
    });

    actionSheet.present();
  }

  ionViewWillLeave() {

    this.items = this.items2;
    this.busca = "";
  }

  /*itemTapped(event, item) {
    this.navCtrl.push(ChatPage,params {        futuramente*
      item: item
    });
  }*/
}
