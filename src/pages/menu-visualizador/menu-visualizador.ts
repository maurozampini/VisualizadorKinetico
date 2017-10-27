import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotosPage } from '../fotos/fotos';


@IonicPage()
@Component({
  selector: 'page-menu-visualizador',
  templateUrl: 'menu-visualizador.html',
})
export class MenuVisualizadorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuVisualizadorPage');
  }

  fotosVacaciones()
  {
    this.navCtrl.push(FotosPage,{tipo:"Vacaciones"});
  }

  fotosAutos()
  {
    this.navCtrl.push(FotosPage,{tipo:"Autos"});
  }

  fotosMascotas()
  {
    this.navCtrl.push(FotosPage,{tipo:"Mascotas"});
  }

 

}
