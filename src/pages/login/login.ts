import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {firebase}  from 'firebase/database';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { MenuVisualizadorPage } from '../menu-visualizador/menu-visualizador';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Vibration } from '@ionic-native/vibration';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuarioTest: string; // Default is 0
  passwordTest: string;

  selectedUser: string;


  myForm: FormGroup;
  user: Observable<firebase.User>;
  public loading:Loading;

  splash = true;
  //tabBarElement: any;

  ionViewDidLoad() {
    //this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      //this.tabBarElement.style.display = 'flex';
    }, 4000);
  }

  
  
  //user = {} as User;
  constructor(private authAf: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private vibration: Vibration,
    public afAuth: AngularFireAuth,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) 
  {
      //this.tabBarElement = document.querySelector('.tabbar');
      this.myForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        //passwordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
      });
      this.user = afAuth.authState;
  }



SeleccionarUsuario(){
  switch(this.selectedUser){
    case "admin":{
      this.usuarioTest="admin@admin.com";
      this.passwordTest="222222";
      break;
    }
    case "usuario":{
      this.usuarioTest="usuario@usuario.com";
      this.passwordTest="111111";
      break;
    }
    case "invitado":{
      this.usuarioTest="invitado@invitado.com";
      this.passwordTest="333333";
      break;
    }                
    case "jugador1":{
      this.usuarioTest="j1@jugador.com";
      this.passwordTest="444444";
      break;
    }
    case "jugador2" :{
      this.usuarioTest="j2@jugador.com";
      this.passwordTest="555555";
      break;
    }        
  }
}


 async loginUser(){
    try {
      const result = await this.authAf.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password);
      console.log(result);
      if (result != undefined) {
        this.navCtrl.setRoot(MenuVisualizadorPage);
        this.loading = this.loadingCtrl.create({
          //dismissOnPageChange: true,
          duration: 500,
        });
        this.loading.present();
      }
    } catch (error) {
      console.error(error);
      if (error.code == "auth/argument-error") {
        this.camposIncompletosError();
        this.vibration.vibrate(500);
      }
      if (error.code == "auth/invalid-email") {
        this.usuarioInvalidoError();
        this.vibration.vibrate(500);
      }
      if (error.code == "auth/wrong-password") {
        this.contraseñaIncorrectaError();
        this.vibration.vibrate(500);
      }  
      if (error.code == "auth/user-not-found") {
        this.usuarioInexistenteError();
        this.vibration.vibrate(500);
      }    
    }
  }

  register(){
    this.navCtrl.push('RegisterPage');

    this.loading = this.loadingCtrl.create({
      //spinner: 'hide',
      content: '<ion-spinner name="bubbles">Cargando...</ion-spinner>',
      //duration: 3000,
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  // test() {
  //   this.usuarioTest = "testusuario@test.com";
  //   this.passwordTest = "123456";
  // }


  camposIncompletosError() {
    let alert = this.alertCtrl.create({
      title: 'Campos incompletos',
      subTitle: 'Por favor, complete todos los campos',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  usuarioInvalidoError() {
    //let alert = this.alertCtrl.create({
    let toast = this.toastCtrl.create({
      message: 'Por favor, ingrese un usuario válido',
      duration: 2000,
      position: 'middle',
      cssClass: "ToastWarning",
      showCloseButton: true,
      closeButtonText: "Cerrar",
      dismissOnPageChange: true
      //title: 'Usuario inválido',
      //subTitle: 'Por favor, ingrese un usuario válido',
      //buttons: ['Cerrar']
    });
    toast.present();
    //alert.present();
  }

  contraseñaIncorrectaError() {
    let toast = this.toastCtrl.create({
    //let alert = this.alertCtrl.create({
      message: 'Contraseña incorrecta, reingrese',
      duration: 3000,
      position: 'bottom',
      cssClass: "ToastWarning",
      showCloseButton: true,
      closeButtonText: "Cerrar",
      dismissOnPageChange: true
      //title: 'Contraseña incorrecta',
      //subTitle: 'Por favor, reingrese contraseña',
      //buttons: ['Cerrar']
    });
    toast.present();
    //alert.present();
  }

    usuarioInexistenteError() {
      let toast = this.toastCtrl.create({
      //let alert = this.alertCtrl.create({
        message: 'El usuario no existe',
        duration: 1500,
        position: 'top',
        cssClass: "ToastWarning",
        showCloseButton: true,
        closeButtonText: "Cerrar",
        dismissOnPageChange: true  
      //title: 'Usuario inexistente',
        //subTitle: 'El usuario no existe',
        //buttons: ['Cerrar']
      });
      toast.present();
      //alert.present();
    }

}