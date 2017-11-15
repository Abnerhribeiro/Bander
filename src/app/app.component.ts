import { Component } from '@angular/core';
import {App, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {MenuPage} from "../pages/menu/menu";
import {HomePage} from "../pages/home/home";
import {CadastrarPage} from "../pages/cadastrar/cadastrar";
import {Keyboard} from "@ionic-native/keyboard";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  constructor(keyboard: Keyboard, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        keyboard.disableScroll(true);

      if(window.statusbar) {
  statusBar.styleDefault();
  splashScreen.hide();
}
    });
  }
}
