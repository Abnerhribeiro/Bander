import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MenuPage} from '../menu/menu';
import {ActionSheetController} from 'ionic-angular'
import {Storage} from '@ionic/storage';
import * as firebase from 'firebase';
import {HomePage} from "../home/home";


@Component({
  selector: 'page-home',
  templateUrl: 'filtro.html'
})
export class FiltroPage {

  constructor(public storage: Storage, public nav: NavController, public actionSheetCtrl: ActionSheetController, public navparams: NavParams) {
    this.nav = nav;
    var config = {
      apiKey: "AIzaSyAewx9FpQ2YVQgCmUjrVmioLG--sbOZhEY",
      authDomain: "bander-c876f.firebaseapp.com",
      databaseURL: "https://bander-c876f.firebaseio.com",
      storageBucket: "bander-c876f.appspot.com"
    };
  }

  presentActionSheet() {
    var storage = this.storage;
    var ID = storage.get('uid').then((ID) => {

      //alert(ID);
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha seu estilo',
      enableBackdropDismiss: true,

      buttons: [
        {
          text: 'Jazz',
          handler: () => {
            var storage = this.storage;
            storage.set('festilo', 'Jazz');

          }
        },
        {
          text: 'Blues',
          handler: () => {
            var storage = this.storage;
            storage.set('festilo', 'Blues');
          }
        },
        {
          text: 'Rock',
          handler: () => {
            var storage = this.storage;
            storage.set('festilo', 'Rock');
          }
        },
        {
          text: 'R&B',
          handler: () => {
            var storage = this.storage;
            storage.set('festilo', 'R&B');
          }
        },
        {
          text: 'Folk',
          handler: () => {
            var storage = this.storage;
            storage.set('festilo', 'Folk');
          }
        },
        {
          text: 'Clássico',
          handler: () => {
            var storage = this.storage;
            storage.set('festilo', 'Classico');
          }
        },
        {
          text: 'Pop',
          handler: () => {
            var storage = this.storage;
            storage.set('festilo', 'Pop');
          }
        },
        {
          text: 'Nenhum',
          handler: () => {
            var storage = this.storage;
            storage.set('festilo', 'any');
          }
        }
      ]

    });
    actionSheet.present();
  }

  presentActionSheet2() {
    var storage = this.storage;
    var ID = storage.get('uid').then((ID) => {
      //alert(ID);
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha seu instrumento',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Guitarra',
          handler: () => {
            storage.set('finstrumento', 'Guitarra');
          }
        },
        {
          text: 'Violão',
          handler: () => {
            storage.set('finstrumento', 'Violao');
          }
        },
        {
          text: 'Bateria',
          handler: () => {
            storage.set('finstrumento', 'Bateria');
          }
        },
        {
          text: 'Baixo',
          handler: () => {
            storage.set('finstrumento', 'Baixo');
          }
        },
        {
          text: 'Teclado',
          handler: () => {
            storage.set('finstrumento', 'Teclado');
          }
        },
        {
          text: 'Nenhum',
          handler: () => {
            var storage = this.storage;
            storage.set('finstrumento', 'any');
          }
        }
      ]
    });

    actionSheet.present();
  }

  presentActionSheet3() {
    var storage = this.storage;
    var ID = storage.get('uid').then((ID) => {
      //alert(ID);
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha a distância',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '5km',
          handler: () => {
            storage.set('fdistancia', 5);
          }
        },
        {
          text: '20km',
          handler: () => {
            storage.set('fdistancia', 20);
          }
        },
        {
          text: '100km',
          handler: () => {
            storage.set('fdistancia', 100);
          }
        },
        {
          text: 'Nenhum',
          handler: () => {
            var storage = this.storage;
            storage.set('fdistancia', 'any');
          }
        }
      ]
    });

    actionSheet.present();
  }

  presentActionSheet4() {
    var storage = this.storage;
    var ID = storage.get('uid').then((ID) => {
      //alert(ID);
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha sua idade',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '18-24',
          handler: () => {
            storage.set('fidade', '18-24');
          }
        },
        {
          text: '25-35',
          handler: () => {
            storage.set('fidade', '25-35');
          }
        },
        {
          text: '36-50',
          handler: () => {
            storage.set('fidade', '36-50');
          }
        },
        {
          text: '+50',
          handler: () => {
            storage.set('fidade', '+50');
          }
        },
        {
          text: 'Nenhum',
          handler: () => {
            var storage = this.storage;
            storage.set('fidade', 'any');
          }
        }
      ],

    });

    actionSheet.present();
  }

  presentActionSheet5() {
    var storage = this.storage;
    var ID = storage.get('uid').then((ID) => {
      //alert(ID);
    });
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha seu sexo',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Feminino	',
          handler: () => {
            storage.set('fsexo', 'Feminino');
          }
        },
        {
          text: 'Masculino',
          handler: () => {
            storage.set('fsexo', 'Masculino');
          }
        }
      ],

    });

    actionSheet.present();
  }

  GravarFiltro() {
    var storage = this.storage;

    var festilo1 = storage.get('festilo').then((festilo1) => {
      if (festilo1 == null) {
        festilo1 = "any"
      }

      var finstrumento1 = storage.get('finstrumento').then((finstrumento1) => {
        if (finstrumento1 == null) {
          finstrumento1 = "any"
        }

        var fdistancia1 = storage.get('fdistancia').then((fdistancia1) => {
          if (fdistancia1 == null) {
            fdistancia1 = "any"
          }
          var fidade1 = storage.get('fidade').then((fidade1) => {
            if (fidade1 == null) {
              fidade1 = "any"
            }
            var fsexo1 = storage.get('fsexo').then((fsexo1) => {

              if (fsexo1 == null) {
                fsexo1 = "any"
              }
              var ID = storage.get('uid').then((ID) => {

                var postsRef = firebase.database().ref("people/" + ID + "/Filtros");
                postsRef.set({
                  festilo: festilo1,
                  finstrumento: finstrumento1,
                  fdistancia: fdistancia1,
                  fidade: fidade1,
                  fsexo: fsexo1
                });


              });

            });
          });
        });
      });

    });

    storage.set('candidato0', "marcado").then(() => {
      storage.set('candidato1', "marcado").then(() => {
        storage.set('candidato2', "marcado").then(() => {
          this.navparams.get("menupage").showppl();
        });
      });
    });
  }


}
