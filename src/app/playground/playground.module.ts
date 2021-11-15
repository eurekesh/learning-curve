import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    PlaygroundComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule
  ],
  exports: [
    PlaygroundComponent
  ]
})
export class PlaygroundModule { }
