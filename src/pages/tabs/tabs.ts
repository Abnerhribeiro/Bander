import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ContatosPage } from '../contatos/contatos';
import { MenuPage } from '../menu/menu';
import {App, NavController} from "ionic-angular";
import { PerfilPage } from '../perfil/perfil';
import {UploadPage} from "../upload/upload";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = MenuPage;
  tab2Root: any = ContatosPage;
  tab3Root: any = PerfilPage;
  tab4Root: any = UploadPage;
  //tab4Root: any = BandaPage;


  constructor() {

  }




}
