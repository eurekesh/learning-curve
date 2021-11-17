import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaygroundComponent} from './playground.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    PlaygroundComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    PlaygroundComponent
  ]
})
export class PlaygroundModule { }
