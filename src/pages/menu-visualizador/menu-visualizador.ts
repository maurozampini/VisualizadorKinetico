import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotosPage } from '../fotos/fotos';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login';

@IonicPage()
@Component({
  selector: 'page-menu-visualizador',
  templateUrl: 'menu-visualizador.html',
})
export class MenuVisualizadorPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authAf: AngularFireAuth,
              public alertCtrl: AlertController) 
              {
                
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

  confirmarCerrarSesion() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Desea cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clickeado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmar clickeado');
            this.authAf.auth.signOut();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

}
