import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HomePage} from "./home";
import {P5canvasComponent} from "../../components/p5canvas/p5canvas";

@NgModule({
  declarations: [
    HomePage,
    P5canvasComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class P5CanvasPageModule {}
