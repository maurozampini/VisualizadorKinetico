import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Firebase }  from 'firebase/database';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AlertController, LoadingController ,Loading} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { User } from '../../models/user';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username:string;
  password:string;
  Mensaje:string;
  passwordconfirm:string;
  
  user = {} as User;
  passRepetida: string;
  public loading: Loading;

  constructor(private authAf: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private vibration: Vibration,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
 }

async register(user: User){
 try {
   if(user.password == "" || user.email == "" || this.passRepetida == ""){
    this.vibration.vibrate(500);
    let toast = this.toastCtrl.create({
      message: 'Complete todos los campos',
      duration: 1500,
      showCloseButton: true,
      closeButtonText: 'Cerrar',
      position: 'bottom',
      cssClass: "ToastWarning",
      dismissOnPageChange: true,
    });
    toast.present();
   }
   if(this.passRepetida != user.password){
    this.vibration.vibrate(500);
    let toast = this.toastCtrl.create({
      message: 'Las contraseñas no coinciden',
      duration: 1500,
      showCloseButton: true,
      closeButtonText: 'Cerrar',
      position: 'top',
      cssClass: "ToastWarning",
      dismissOnPageChange: true,
    });
    toast.present();
   }
   else{
       const result = await this.authAf.auth.createUserWithEmailAndPassword(user.email, user.password);
       if (result != null) {
         this.registroExitoso();
         this.loading = this.loadingCtrl.create({
           //spinner: 'hide',
           content: '<ion-spinner name="bubbles">Cargando...</ion-spinner>',
           duration: 3000,
           dismissOnPageChange: true,
         });
         this.loading.present();
         this.navCtrl.setRoot(LoginPage);
       }
     }
 } catch (error) {
   console.error(error);
   if (error.code == "auth/argument-error") {
     this.camposIncompletosError();
     this.vibration.vibrate(500);
   }
   if (error.code == "auth/invalid-email") {
     this.usuarioInvalidoError();
   }
   if (error.code == "auth/weak-password") {
     this.contraseñaInvalidaError();
     this.vibration.vibrate(500);
   }
   if (error.code == "auth/email-already-in-use") {
     this.usuarioRepetidoError();
     this.vibration.vibrate(500);
   }
 }
}


camposIncompletosError() {
 this.vibration.vibrate(500);
 let toast = this.toastCtrl.create({
   message: 'Por favor, complete todos los campos',
   duration: 1500,
   showCloseButton: true,
   closeButtonText: 'Cerrar',
   position: 'bottom',
   cssClass: "ToastWarning",
   dismissOnPageChange: true,

 });
 toast.present();
}

usuarioInvalidoError() {
  this.vibration.vibrate(500);
    let toast = this.toastCtrl.create({
      message: 'Usuario inválido. Por favor, ingrese un usuario válido',
      duration: 1500,
      cssClass: "ToastWarning",
      showCloseButton: true,
      closeButtonText: "Cerrar",
      dismissOnPageChange: true,
      position: 'middle'
  });
  toast.present();
 }

contraseñaInvalidaError() {
 this.vibration.vibrate(500);
   let toast = this.toastCtrl.create({
     message: 'La contraseña debe tener al menos 6 caracteres',
     duration: 1500,
     cssClass: "ToastWarning",
     showCloseButton: true,
     closeButtonText: "Cerrar",
     dismissOnPageChange: true,
     position: 'middle'
 });
 toast.present();
}

usuarioRepetidoError() {
 this.vibration.vibrate(500);
   let toast = this.toastCtrl.create({
   message: 'El usuario que desea ingresar ya existe',
   duration: 1500,
   cssClass: "ToastWarning",
   showCloseButton: true,
   closeButtonText: "Cerrar",
   dismissOnPageChange: true,
   position: 'top'    
 });
 toast.present();
}

registroExitoso() {
 let toast = this.toastCtrl.create({
   message: 'Su cuenta ha sido creada exitosamente',
   duration: 1500,
   position: 'top',
   cssClass: "ToastAssert",
   showCloseButton: true,
   closeButtonText: "Cerrar",
   //dismissOnPageChange: true
 });

 toast.onDidDismiss(() => {
   console.log('Dismissed toast');
 });

 toast.present();
}


}