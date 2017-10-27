import { Component ,Provider} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { MenuVisualizadorPage } from '../menu-visualizador/menu-visualizador';
import { ToastController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { IonicAudioModule } from 'ionic-audio';
import { AudioProvider } from 'ionic-audio';
import { NativeAudio } from '@ionic-native/native-audio';



@IonicPage()
@Component({
  selector: 'page-fotos',
  templateUrl: 'fotos.html',
})
export class FotosPage {

  x=0;
	y=0;
  z=0;
  tipo:string;
  contador: number;
  public myPhotoURL: any;
  data: any;
  subscription: any;
  toast:any;
  constructor(public navCtrl: NavController,
              private vibration: Vibration,
              public nativeAudio: NativeAudio,
              public toastCtrl: ToastController,
              private deviceMotion: DeviceMotion,
              public navParams: NavParams) 
  {

    this.tipo=navParams.get("tipo");
    this.contador=0;
    this.iniciar();
    this.goWaves();
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Inicio del album',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  
  iniciar()
  {
    switch (this.tipo) {
      case "Vacaciones":
      this.myPhotoURL = "assets/11.jpg";
      break;
      case "Autos":
      this.myPhotoURL = "assets/6.jpg";
      break;
      case "Mascotas":
      this.myPhotoURL = "assets/1.jpg";
      break;
  
    default:
      break;
      }
  }

  goWaves(){
    var options = { frequency: 1000 };
		let subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration) => {
    
			this.x = acceleration.x;
			this.y = acceleration.y;
      this.z = acceleration.z;
      
      if(this.x > 6)
      {
        switch (this.tipo) {
            case "Vacaciones":
            this.MostarVacaciones();
            break;
            case "Autos":
            this.MostarAutos();
            break;
            case "Mascotas":
            this.MostarMascotas();
            break;
        
          default:
            break;
        }
        
      }
		});
  }

  MostarVacaciones()
  {
    switch (this.contador)
    {
      case 0:
      this.nativeAudio.play('uniqueId1');
      this.presentToast();
      this.vibration.vibrate([1000]);
      this.myPhotoURL = "assets/11.jpg";
      this.contador=1;
      break;
      case 1:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/12.jpg";
      this.contador=2;
      break;
      case 2:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/13.jpg";
      this.contador=3;
      break;
      case 3:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/14.jpg";
      this.contador=4;
      break;
      case 4:
      this.nativeAudio.play('uniqueId1');
      this.vibration.vibrate([1000]);
      this.myPhotoURL = "assets/15.jpg";     
      this.contador=0;
      break;

      default:
        break;
    }
  }

  MostarAutos()
  {
    switch (this.contador)
    {
      case 0:
      this.nativeAudio.play('uniqueId1');
      this.presentToast();
      this.vibration.vibrate([1000]);
      this.myPhotoURL = "assets/6.jpg";
      this.contador= 1;
      break;
      case 1:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/7.jpg";
      this.contador=2;
      break;
      case 2:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/8.jpg";
      this.contador=3;
      break;
      case 3:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/9.jpg";
      this.contador=4;
      break;
      case 4:
      this.nativeAudio.play('uniqueId1');
      this.vibration.vibrate([1000]);
      this.myPhotoURL = "assets/10.jpg";     
      this.contador=0;
      break;

      default:
        break;
    }
  }

  MostarMascotas()
  {
    switch (this.contador)
    {
      case 0:
      this.nativeAudio.play('uniqueId1');
      this.presentToast();
      this.vibration.vibrate([1000]);
      this.myPhotoURL = "assets/1.jpg";
      this.contador=1;
    
      break;
      case 1:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/2.jpg";
      this.contador=2;
      
      break;
      case 2:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/3.jpg";
      this.contador=3;
     
      break;
      case 3:
      this.nativeAudio.play('uniqueId1');
      this.myPhotoURL = "assets/4.jpg";
      this.contador=4;
  
      break;
      case 4:
      this.nativeAudio.play('uniqueId1');
      this.vibration.vibrate([1000]);
      this.myPhotoURL = "assets/5.jpg";     
      this.contador=0;
     
      break;

      default:
        break;
    }
  }

  Cancelar()
  {
    this.navCtrl.push(MenuVisualizadorPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FotosPage');
   this.nativeAudio.preloadComplex('uniqueId1', 'assets/sonido.mp3', 6, 6, 0).then(()=>{});
  }

}
