import {Component} from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import * as firebase from 'firebase';
import {FiltroPage} from '../filtro/filtro';
import {Storage} from '@ionic/storage';
import {isPromise} from "rxjs/util/isPromise";
import {MenuPerfilPage} from "../menuperfil/menuperfil";
<<<<<<< HEAD
import {HomePage} from "../home/home";
=======
import { LoadingController } from 'ionic-angular';
>>>>>>> ae3f89ba497fc71d619c423b2581bb2293f16206

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

<<<<<<< HEAD
  constructor(public storage: Storage, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
=======
  constructor(public storage: Storage, public loadingCtrl: LoadingController, public navCtrl: NavController) {
>>>>>>> ae3f89ba497fc71d619c423b2581bb2293f16206
    this.navCtrl = navCtrl;
    this.navCtrl
    //alert("iniciando showppl");
    storage.get('atual').then((atual) => {
      this.showppl(atual);
      this.refresh();
    })
  }

  refresh() {
    var millisecondsToWait = 10000;
    var self = this;
    setInterval(function () {
      if (self.rodando == 0) {
        self.storage.get('atual').then((atual) => {
          self.storage.get('candidato' + atual).then((candidato) => {
            if (candidato == "marcado" || candidato == null) {
              var ref = firebase.database().ref("people/");
              ref.once("value", function (snapshot) {
                var newmax = snapshot.numChildren();
                if (newmax != self.max) {
                  self.getData();
                }

              });
            }
          });
        });
      }
    }, millisecondsToWait);

  }


  rodando = 0;

  max = -1;

  public teste(){
    this.navCtrl.push(MenuPerfilPage);
  }

  public getData() {
    //MOSTRAR CARREGANDO
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    if (this.rodando == 0) {
      this.rodando = 1;
      var self = this;
      var millisecondsToWait = 500;
      //alert("iniciou data");
      var candidatos = [];
      var done = 0;
      var pontos = 0;
      var empty = 0;
      var menor = 999;
      var posmenor = 0;
      var ninguem = 1;
      var fimAnt = 0;

      var storage = this.storage;





      //alert("data Storage");
      (<HTMLImageElement>document.getElementById("profile")).src = '../../assets/img/adam.jpg';
      document.getElementById("nome").innerHTML = 'procurando...';
      document.getElementById("instrumento").innerHTML = 'procurando...';
      document.getElementById("estilo").innerHTML = 'procurando...';


      storage.get('uid').then((ID) => { // MEU ID
        //alert(" ID = " + ID);


        this.storage.get('festilo').then((festilo) => { // MEUS FILTROS
          this.storage.get('finstrumento').then((finstrumento) => { // MEUS FILTROS
            this.storage.get('fsexo').then((fsexo) => { // MEUS FILTROS

              var ref = firebase.database().ref("people/");

              ref.once("value", function (snapshot) { // CAMINHO PEOPLE
                //alert("data caminho ppl");
                self.max = snapshot.numChildren();
                //alert("data caminho ppl2");

                //alert("data inserindo pessoas");
                ref.on("child_added", snap => { // LOOP PESSOAS
                  if (fimAnt==3) {
                    return;
                  }
                  done = done + 1;
                  //alert("done= "+done);

                  var pid = snap.key;                                       // DADOS PESSOA
                  var pestilo = snap.child("Estilo").val();           // DADOS PESSOA
                  var pinstrumento = snap.child("Instrumento").val(); // DADOS PESSOA
                  var psexo = snap.child("Sexo").val();               // DADOS PESSOA

                  var you = firebase.database().ref("people/" + ID + "/Marcados"); // MINHA LISTA DE MARCADOS
                  you.once("value", function (snapshot2) {
                    //alert("verificando " + pid);
                    if (!snapshot2.child(pid).exists() && pid != ID) { // VERIFICA SE JÁ NÃO FOI MARCADO OU É O DONO DA ACC
                      //alert(pid + " n marcado ");
                      if (pestilo == festilo || festilo == "any") {
                        pontos = pontos + 20 + Math.random() * 10;

                      }
                      if (pinstrumento == finstrumento || finstrumento == "any") {
                        pontos = pontos + 70 + Math.random() * 10;

                      }
                      if (psexo == fsexo || fsexo == "any") {
                        pontos = pontos + 30 + Math.random() * 10;

                      } // CALCULO DA PONTUAÇÃO
                      //alert(pid + "  pontuação: " + pontos);
                      //alert(pid +" tirou "+pontos);
                      if (pontos > 70) {
                        ninguem = 0;
                        if(pontos>90){
                          //alert("ueba, fim = "+fimAnt);
                          fimAnt++;
                        }
                        if (empty < 3) {
                          //alert(pid + " foi inserido");
                          candidatos[empty * 2] = pid;
                          candidatos[empty * 2 + 1] = pontos;
                          //alert(pid + " inserido na casa " + (empty*2) + " e pontos (" + pontos + ") na casa" + (empty*2+1));
                          empty++;
                        }
                        else {
                          for (var i = 1; i <= 6; i = i + 2) {
                            //alert("INICIO ACHA MENOR");
                            for (var x = 1; x <= 6; x = x + 2) {
                              //alert(" candidatos[x] = "+  candidatos[x]+ ";  menor =" + menor);
                              //alert(pid +" "+pontos+" VS "+menor);
                              if (menor >= candidatos[x]) {
                                menor = candidatos[x];
                                posmenor = x;
                                //alert("substitui menor por "+menor);
                              }
                            } //alert("COMPARA ATUAL ("+pontos+") COM MENOR ("+menor+")");
                            if (pontos > menor || candidatos[posmenor - 1] == "marcado") {
                              //alert(pid +" foi inserido");
                              candidatos[posmenor - 1] = pid;
                              candidatos[posmenor] = pontos;

                              //alert(pid + " inserido na casa " + (posmenor-1) + " e pontos (" + candidatos[posmenor] + ") na casa" + posmenor);
                              break;
                            } // VERIFICA PONTUAÇÃO PARA INSERIR NA LISTA DE CANDIDATOS
                          }
                        }
                      }
                      menor = 999;
                      pontos = 0;


                    }

                  })// LOOP INDIVIDUAL


                })// LOOP GRUPO


              })
            })
          })
        })
      })
      var bool = false;
      var x = setInterval(function () {
        //alert("ainda não");
        //alert("max = " + max + "; done = " + done + "; ninguem = " + ninguem);

        storage.set('candidato0', null).then((ca10) => {
          storage.set('candidato1', null).then((ca10) => {
            storage.set('candidato2', null).then((ca10) => {
              if (done == self.max && ninguem == 0 || fimAnt==3) {
                loader.dismiss();
                for (var i = 0; i < 3; i++) {
                  //alert("max = " + max + "; done = " + done + "; ninguem = " + ninguem);
                  //alert("for i = " + i + "; candidatos[i] = " + candidatos[i * 2]);
                  self.SetCandidatos(i, candidatos, storage).then((fim) => {
                    if (fim == true) {
                      //alert("fim = "+fim);
                      //alert("bool = true, showppl");
                      self.rodando = 0;
                      self.showppl(0);
                      clearInterval(x);
                    }
                  })
                }
              }


              else if (done == self.max && ninguem == 1 || fimAnt==3) {
                 loader.dismiss();
                //alert("max = " + max + "; done = " + done + "; ninguem = " + ninguem);
                self.rodando = 0;
                (<HTMLImageElement>document.getElementById("profile")).src = '../../assets/img/sad.png';
<<<<<<< HEAD
                document.getElementById("nome").innerHTML = 'Sem perfis';
                document.getElementById("instrumento").innerHTML = 'remova';
                document.getElementById("estilo").innerHTML = 'alguns filtros';
=======
                document.getElementById("nome").innerHTML = 'Nenhum perfil encontrado..';
                document.getElementById("instrumento").innerHTML = '';
                document.getElementById("estilo").innerHTML = '';
>>>>>>> ae3f89ba497fc71d619c423b2581bb2293f16206
                clearInterval(x);
              }
              //alert("return");

            })
          })
        })
      }, millisecondsToWait);

    }
  }


  SetCandidatos(i, candidatos, storage) {
    //alert("candidato "+i+" = "+candidatos[i*2]+"; pontuação = "+candidatos[i*2 +1]);
    return storage.set('candidato' + i, candidatos[i * 2]).then((x) => {
      if (i == 2) {
        //alert("retornou true");
        return true;
      }
      //alert("retornou false");
      return false;
    })
  }

  public showppl(i) {
    //alert("iniciou showppl");
    var self = this;
    var storage = this.storage;


    storage.get('candidato' + i).then((candidato) => {
      if (candidato != null) {
        //alert("candidato da vez:  " + candidato);
        if (candidato != "marcado") {
          //alert("candidato não é marcado");
          var ref = firebase.database().ref("people/" + candidato);


          ref.once("value", function (snapshot) { // CAMINHO PESSOA CANDIDATA

            (<HTMLImageElement>document.getElementById("profile")).src = snapshot.child("Foto").val();
            document.getElementById("nome").innerHTML = snapshot.child("Nome").val();
            document.getElementById("instrumento").innerHTML = snapshot.child("Instrumento").val();
            document.getElementById("estilo").innerHTML = snapshot.child("Estilo").val();
            //alert("printou");
            //alert("view = " + view);
            storage.set('atual', (i));
          })
        }
        else {
          //alert("tava marcado");
          self.getData();
        }
      } else {
        //alert("sem storage");
        self.getData();
      }
    })


  }


  atualizasim() {
    if (this.rodando==1)
      return;
    var self = this;
    var config = {
      apiKey: "AIzaSyAewx9FpQ2YVQgCmUjrVmioLG--sbOZhEY",
      authDomain: "bander-c876f.firebaseapp.com",
      databaseURL: "https://bander-c876f.firebaseio.com",
      storageBucket: "bander-c876f.appspot.com"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    var storage = this.storage;
    storage.get('uid').then((ID) => {
      //alert("iniciou atualiza sim");
      storage.get('atual').then((atual) => {
        //alert("a");
        storage.get('candidato' + atual).then((candidato) => {
          //alert("b");

          var marked = firebase.database().ref("people/" + ID + "/Marcados");
          marked.once("value", function (snapshot) {

            //alert("c");

            marked.update({
              [candidato]: true
            });
          })
          var liked = firebase.database().ref("people/" + ID + "/Likes");
          liked.once("value", function (snapshot) {

            //alert("c");

            liked.update({
              [candidato]: true
            });
          })

          //alert("d");
          storage.set('candidato' + atual, "marcado").then(() => {
            self.showppl(atual + 1);
          })
          storage.set('atual', atual + 1);


          var matched = firebase.database().ref();
          matched.once("value", function (snapshot) {
            if (snapshot.child("people/").child("/" + candidato).child("/Likes").child("/" + ID).exists()) {
              matched.child("people/").child("/" + candidato).child("/Matches").update({
                [ID]: true
              })
              matched.child("people/").child("/" + ID).child("/Matches").update({
                [candidato]: true
              })
              matched.child("chat/").child( ID+candidato).child("/-A").set({
                "nome":"BANDER: ",
                "mensagem":"Vocês deram match!!"

              })
             //alert("VCS SÃO UM MATCH, SEUS DOIS PUTOS AEEEEEEEE UHUL");
            }
          })
        })
      })
    })
  }


  atualizanao() {
    if (this.rodando==1)
      return;
    var self = this;
    var config = {
      apiKey: "AIzaSyAewx9FpQ2YVQgCmUjrVmioLG--sbOZhEY",
      authDomain: "bander-c876f.firebaseapp.com",
      databaseURL: "https://bander-c876f.firebaseio.com",
      storageBucket: "bander-c876f.appspot.com"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    var storage = this.storage;
    storage.get('uid').then((ID) => {
      //alert("iniciou atualiza sim");
      storage.get('atual').then((atual) => {
        //alert("a");
        storage.get('candidato' + atual).then((candidato) => {
          //alert("b");

          var marked = firebase.database().ref("people/" + ID + "/Marcados");
          marked.once("value", function (snapshot) {

            //alert("c");

            marked.update({
              [candidato]: true
            });
          })
          //alert("d");
          storage.set('candidato' + atual, "marcado").then(() => {
            self.showppl(atual + 1);
          })
          storage.set('atual', atual + 1);
        })
      })
    })

  }

  openFiltroPage() {
    this.navCtrl.push(FiltroPage, {"menupage": this});
  }


  presentActionSheetSair() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Sair',

          handler: () => {
            this.storage.clear();
            this.navCtrl.setRoot(HomePage);

          }
        }
      ]
    });

    actionSheet.present();
  }


}
