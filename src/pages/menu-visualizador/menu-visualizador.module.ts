import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuVisualizadorPage } from './menu-visualizador';

@NgModule({
  declarations: [
    MenuVisualizadorPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuVisualizadorPage),
  ],
})
export class MenuVisualizadorPageModule {}
