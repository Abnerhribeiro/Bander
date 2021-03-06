import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {MenuPage} from '../pages/menu/menu';
import {CadastrarPage} from '../pages/cadastrar/cadastrar';
import {PerfilPage} from '../pages/perfil/perfil';
import {ContatosPage} from '../pages/contatos/contatos';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ChatPage} from '../pages/chat/chat';
import {MenuPerfilPage} from "../pages/menuperfil/menuperfil";
import {AngularFireModule} from "angularfire2";
import {FiltroPage} from '../pages/filtro/filtro';
import {UploadPage} from '../pages/upload/upload';
import {PhotoLibrary} from "@ionic-native/photo-library";
import {Camera} from "@ionic-native/camera";

import {FileChooser} from "@ionic-native/file-chooser";
import { Media, MediaObject } from '@ionic-native/media';
import {FilePath} from "@ionic-native/file-path";
import {Keyboard} from "@ionic-native/keyboard";
import {Crop} from "@ionic-native/crop";
import {PerfilEditPage} from "../pages/perfiledit/perfiledit";
import {ChatBubble} from "../pages/Components/chatbubble/ChatBubble";
import {PicBubble} from "../pages/Components/picbubble/PicBubble";
import { File } from '@ionic-native/file';
import { LoadingController } from 'ionic-angular';
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";

var config = {

  apiKey: "AIzaSyAewx9FpQ2YVQgCmUjrVmioLG--sbOZhEY",
  authDomain: "bander-c876f.firebaseapp.com",
  databaseURL: "https://bander-c876f.firebaseio.com",
  projectId: "bander-c876f",
  storageBucket: "bander-c876f.appspot.com",
  messagingSenderId: "1071542792886"
};

@NgModule({

  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MenuPage,
    ContatosPage,
    ChatPage,
    PerfilPage,
    FiltroPage,
    UploadPage,
    CadastrarPage,
    PerfilEditPage,
    MenuPerfilPage,
    ChatBubble,
    PicBubble
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MenuPage,
    ContatosPage,
    ChatPage,
    PerfilPage,
    FiltroPage,
    CadastrarPage,
    PerfilEditPage,
    MenuPerfilPage,
    UploadPage,
    ChatBubble,
    PicBubble
  ],
  providers: [
    File,
    Crop,
    FileTransfer,
    Keyboard,
    FilePath,
    File,
    LoadingController,
    Media,
    FileChooser,
    PhotoLibrary,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
